import React from 'react';
import {format } from 'date-fns';

export default function Modal({setShowModal, event}: {event: any, setShowModal: any}) {
  const formatDateString = `hh:mm aaa`;
  return (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative my-6 mx-auto max-w-3xl px-10">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t">
                  <h3 className="text-2xl font-semibold">
                  Details
                  </h3>
                  <button onClick={() => setShowModal(false)} className="btn btn-outline btn-circle btn-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current">   
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>                       
                  </svg>
                </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                <p className="my-4 text-blue gray-500 text-lg leading-relaxed">
                    Date :  {format(new Date(event?.end), 'MMM dd yyyy')}
                  </p> 
                  <p className="my-4 text-blue gray-500 text-lg leading-relaxed">
                    Time : {format(new Date(event?.start),formatDateString)} to {format(new Date(event?.end), formatDateString)}
                  </p> 
                  <p className="my-4 text-blue gray-500 text-lg leading-relaxed">
                    Owner : {event.title}
                  </p> 
                  <p className="my-4 text-blue gray-500 text-lg leading-relaxed">
                    Description : {event.description}
                  </p> 
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="border-solid bg-sky-100 border-2 border-gray-500 hover:bg-gray-300 p-2 rounded-md"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  {event?.isUsersEvent ?<button
                     className="border-solid bg-sky-100 border-2 border-gray-500 hover:bg-gray-300 p-2 rounded-md ml-2"
                    type="button"
                    onClick={async () => {
                      await event.deleteEvent(event.id);
                      setShowModal(false);
                    }}
                   >
                    Delete
                  </button>: null}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>

  );
}