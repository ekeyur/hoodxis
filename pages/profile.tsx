import React, { useEffect, useState } from 'react'
import {QueryClient, useMutation, useQuery} from 'react-query';
import { useToasts } from 'react-toast-notifications';
import { useUser } from '../context/UserContext';
import {supabase} from '../utils/supabase';
import isPast from 'date-fns/isPast'
import Link from 'next/link';
import { format } from 'date-fns';


function Profile() {

const {data: myReservationsResponse} = useQuery('myReservations', async () => await supabase.from('reservations').select('*').eq('user_id', user.id))

const upComingReservations =  myReservationsResponse?.data?.filter(res => {
  return !isPast(new Date(res.end));
});

 const {user} = useUser();

 const [name, setName] = useState<string>(user?.id);
 const [hoodId, setHoodId] = useState<string>(user?.hood_id);

 const {addToast} = useToasts();
 const queryClient = new QueryClient();

 useEffect(() => {
   setName(user?.name);
   setHoodId(user?.hood_id);
 },[user])

const updateUser = async ({name, hoodId}: {name: string, hoodId: string}) => {
  console.log(name, hoodId, user.id);
  const {data, error} = await supabase.from('users')
    .update({name, hood_id: hoodId})
    .match({id: user.id});
  if(error) throw error;
  return data;
}


const { data: hoodResponse } = useQuery('hoods', async () => await supabase.from('hoods').select('*'));
const hoods = hoodResponse?.data;


const {mutate: mutateUser, isLoading: userUpdating, isError: mutateUserError, isSuccess: mutateUserSuccess} = useMutation('updateUser', updateUser, {
  onSuccess: () => {
    addToast('User update successful', {appearance: 'success'});
  },
  onError: () => {
    addToast('Error updating profile', {appearance: 'error'});
  }
})

 const handleSubmit:React.FormEventHandler = (e) => {
  e.preventDefault()
  if(!hoodId) {
    addToast('You have to select a facility in order to start reserving', {appearance: 'error'})
  }
  if(!name) {
    addToast('Please enter your name', {appearance: 'error'})
  }
  if(hoodId && name) {
    mutateUser({name, hoodId})
  }
}
  return (
    <>
      <div className="">
      {upComingReservations?.length ? <div className="mb-4">
          <h2 className="text-start text-lg mb-2">Your Upcoming Reservations</h2>
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
              {upComingReservations?.map(row => <tr key={row.id}>
                <td>{format(new Date(row.start),'MMM, dd')}</td>
                <td>{format(new Date(row.start),'hh:mm aaa')}</td>
                <td>{format(new Date(row.end),'hh:mm aaa')}</td>
                <td>{row.description}</td>
              </tr>)}
          <tbody>
          </tbody>
        </table>
        </div>
        </div>: null}
          <div>
            <h2 className="pt-5 text-xl mb-4">
              Profile
            </h2>
          <form onSubmit={handleSubmit}>
          <div className="w-full mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input type="text" value={name} onChange={(e) => setName(e.currentTarget.value)} className="appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="name" />
          </div>
          <div className="w-full  mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input type="text" value={user?.email} disabled className="appearance-none block w-full bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="name" />
          </div>
          <div className="w-full  mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="hood">
              Facility
            </label>
            <div className="relative">
              <select disabled={user?.hood_id} onChange={e => setHoodId(e.currentTarget.value)} value={hoodId} className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                <option value=""/>
                {hoods?.map((h: any)=><option key={h.id} value={h.id}>{h.name}</option>)}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          <button type="submit" onClick={handleSubmit} className="btn btn-primary mt-4">
            {userUpdating ? 'Updating...' : 'Update'}
          </button>

          {mutateUserError ? <p>Something went wrong updating the user</p> : null}
          {mutateUserSuccess ? <p>User updated successfully</p> : null}
          </form>
        </div>
        <div>
       
        
        
        </div>
    </div>
    </>
  )
}


export default Profile;

