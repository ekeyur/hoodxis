import React, { useContext, useEffect, useState } from 'react'
import {QueryClient, useMutation, useQuery} from 'react-query';
import { useToasts } from 'react-toast-notifications';
import { UserContext } from '../context/UserContext';
import {supabase} from '../utils/supabase';
import isPast from 'date-fns/isPast'
import Link from 'next/link';
import { format } from 'date-fns';


function Profile() {

 const user = useContext(UserContext);

const {data: myReservationsResponse} = useQuery('myReservations', async () => await supabase.from('reservations').select('*').eq('user_id', user.id))

const upComingReservations =  myReservationsResponse?.data?.filter(res => {
  return !isPast(new Date(res.end));
})

  return (
    <>
      <div className="max-w-7xl mx-auto">
      <h3 className="mb-4 text-right px-5"><Link href="/profile/update">Update Profile</Link></h3>
      <div>
        <h2 className="text-center mb-2">Upcoming Reservations</h2>
      <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Date</th> 
            <th>Start</th> 
            <th>End</th> 
            <th>Description</th>
          </tr>
        </thead>
            {upComingReservations?.map(row => <tr>
              <td>{format(new Date(row.start),'MMM, dd')}</td>
              <td>{format(new Date(row.start),'hh:mm aaa')}</td>
              <td>{format(new Date(row.end),'hh:mm aaa')}</td>
              <td>{row.description}</td>
            </tr>)}
        <tbody>
        </tbody>
      </table>
      </div>
      </div>
    </div>
    </>
  )
}


export default Profile;

