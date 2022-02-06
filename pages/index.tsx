import type { NextPage } from 'next'

import Link from 'next/link';
import { useUser } from '../context/UserContext'

const Home: NextPage = () => {
  const {user} = useUser();
  return (
    <div>
      <div className="flex justify-between items-center py-10 lg:py-0">
        <div className="px-5 space-y-5 my-20">
          <h1 className='text-2xl md:text-4xl font-serif'>
            <span className="underline decoration-black decoration-4">HoodXis</span>, a court reservation app for neighbourhoods
          </h1>
          <h2>
            Simple, no bs reservation system.
          </h2>
        </div>
        </div>
        <div>
          <p className='text-right text-lg'>{user && !user?.hood_id ? <>Please click <Link passHref href="/profile"><span className='cursor-pointer underline decoration-4 decoration-primary'>here</span></Link> and update your profile to continue reserving </>:null}</p>
      </div>
    </div>
  )  
}



export default Home
