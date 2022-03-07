import React from 'react';
import {format } from 'date-fns';
import { useState } from 'react';

export default function Modal({setShowModal, details}: {details: any, setShowModal: any}) {
  const formatDateString = `hh:mm aaa`;
  const [desc, setDesc] = useState('');
  return (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid rounded-t">
                  <h3 className="text-2xl font-semibold">
                   Court Reservation
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
                    Reserve {details?.court?.name} from {format(details?.start,formatDateString)} to {format(details?.end,formatDateString)} on {format(details.start,'EEE, MMM dd')}
                  </p>
                  
                  {/* description */}
                  <div className="w-full md:w-full mb-6 md:mb-0">
                  <label className="mt-2 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                    Description
                  </label>
                  <textarea value={desc} onChange={(e) => setDesc(e.currentTarget.value)} className="appearance-none block w-full  text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="name" placeholder="doubles match" />
                </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="border-solid bg-sky-100 border-2 border-gray-500 hover:bg-gray-300 p-2 rounded-md"
                    type="button"
                    onClick={() => {
                      details?.createEvent({court_id: details.court?.id, start: details?.start, end: details?.end, description: desc, user_id: details.user_id})
                      setShowModal(false);
                    }}
                   >
                    Confirm
                  </button>
                  <button
                    className="border-solid bg-sky-100 border-2 border-gray-500 hover:bg-gray-300 p-2 rounded-md ml-2"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>

  );
}