import React, { useContext, useEffect, useState } from 'react';
import {supabase} from '../utils/supabase';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useToasts } from 'react-toast-notifications';
import { Calendar , dateFnsLocalizer, SlotInfo, Views } from 'react-big-calendar'
import { format, startOfWeek, getDay, parse, areIntervalsOverlapping, isPast } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import { Court, Hood, User, Event, Reservation } from '../types';
import { useUser } from '../context/UserContext';
import { useRouter } from 'next/router';

import CreateEventModal from '../components/CreateEventModal';
import EventModal from '../components/EventModal';

const locales = {
  'en-US': enUS,
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});


const Reserve = () => {
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const queryClient = useQueryClient();
  const [slotDetails, setSlotDetails] = useState({});
  const [eventDetails, setEventDetails] = useState({});
  const {addToast} = useToasts();
  const {user} = useUser();

  const router = useRouter();

  const {data: hoodres} = useQuery(["hoodReservations", user?.hood_id],() => fetchHood(user?.hood_id));

  const hood = hoodres?.data;

  const sortedCourts = hood?.courts?.sort((c1:Court,c2:Court) => {
    if(c1?.name < c2?.name) return -1;
    if(c1?.name > c2?.name) return 1;
    return 0;
  })

  const resourceMap = sortedCourts?.map((court: Court) => {
    return {
      resourceId: court.id,
      resourceTitle: court?.name
    }
  })

  const extractEvents = (fac: Hood) => {
    let events: Array<Event> = []
    fac?.courts?.forEach((court: Court) => { 
      court?.reservations?.forEach(({id, start, end, description}) => {
        events.push({
          id: id,
          start: new Date(start),
          end: new Date(end),
          title: user?.email,
          resourceId: court.id,
          description,
        })
      })
    })
    return events;
  }
  
  const { mutate:  createEvent } = useMutation(createReservation, {
    onSuccess:  () => {
      addToast('Reservation Successful', {appearance: 'success', autoDismiss: true});
      queryClient.invalidateQueries(["hoodReservations", user?.hood_id ]) 
    },
    onError: () => {
      addToast('Reservation Unsuccessful', {appearance: 'error'});
    }
  });

  const { mutate:  deleteEvent } = useMutation(deleteReservation, {
    onSuccess:  () => {
      addToast('Your reservation has been deleted', {appearance: 'success', autoDismiss: true});
      queryClient.invalidateQueries(["hoodReservations", user?.hood_id ]) 
    },
    onError: () => {
      addToast('There was a problem deleting reservation', {appearance: 'error', autoDismiss: true});
    }
  });

  const handleSlotSelect = (slotInfo: SlotInfo) => {
    var isInPast = isPast(new Date(slotInfo.start));
    if(isInPast) {
      addToast('Cannot reserve court in past', {appearance: 'error', autoDismiss: true});
      return;
    }
    const resourceEventsForDay = extractEvents(hood).filter(e => e.resourceId === (slotInfo as any).resourceId)
    const isthereAnOverlap = resourceEventsForDay.some(eve => areIntervalsOverlapping(eve, {start: new Date(slotInfo.start), end: new Date(slotInfo.end)}))
    if(isthereAnOverlap) {
      addToast('You cannot choose an already reserved time', {appearance: 'error'});
     } else {
      const court = hood.courts.find((c:Court) => c.id === (slotInfo as any).resourceId);
      setSlotDetails({start: slotInfo.start, end: slotInfo.end, court, user_id: user.id, createEvent});
      setShowCreateEventModal(true);
      }
    }

  const handleSelectEvent = (e: any) => {
    const isUsersEvent = e.title === user?.email
    setEventDetails({...e, isUsersEvent, deleteEvent});
    setShowEventModal(true);
  }

  return ( <div className="max-w-7xl mx-auto mt-2">
            {showCreateEventModal ? <CreateEventModal details={slotDetails} setShowModal={setShowCreateEventModal} /> : null}
            {showEventModal ? <EventModal event={eventDetails} setShowModal={setShowEventModal} /> : null}
            
                <Calendar
                  localizer={localizer}
                  events={extractEvents(hood)}
                  scrollToTime={new Date(new Date().setHours(6))}
                  startAccessor="start"
                  endAccessor="end"
                  popup
                  step={15}
                  timeslots={4}
                  style={{ height: 500 }}
                  selectable
                  drilldownView={Views.DAY}
                  views={[Views.WEEK, Views.DAY, Views.AGENDA]}
                  defaultView={Views.DAY}
                  onSelectSlot={handleSlotSelect}
                  onSelectEvent={handleSelectEvent}
                  resources={resourceMap}
                  resourceIdAccessor="resourceId"
                  resourceTitleAccessor="resourceTitle"
                  dayLayoutAlgorithm="no-overlap"
                />
                
          
      </div>
  )
}

async function createReservation(values: Reservation){
 return await supabase
  .from('reservations')
  .insert([
    { court_id: values.court_id, start: values.start, end: values.end, user_id: values.user_id, description: values.description },
  ])
}

async function deleteReservation(id: string){
  return await supabase.from('reservations').delete().eq('id', id);
}

async function fetchHood(hoodId: string){
 return await supabase.from('hoods').select(`*, courts(*, reservations(*))`).eq('id',hoodId).single();
}


export default Reserve;