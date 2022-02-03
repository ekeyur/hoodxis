import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link';
import { useUser } from '../context/UserContext'

const Home: NextPage = () => {
  const {user} = useUser();
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>HoodTennis.com</title>
        <meta name="description" content="Hood tennis reservation system" />
      </Head>
    <div className="flex justify-between items-center bg-primary py-10 lg:py-0">
      <div className="px-10 space-y-5 my-20">
        <h1 className='text-6xl max-w-xl font-serif'>
          <span className="underline decoration-black decoration-4">HoodXis</span>, a court reservation app for neighbourhoods
        </h1>
        <h2>
          Simple, no bs reservation system.
        </h2>
      </div>
      <div className="hidden md:inline-flex h-32 lg:h-full px-10">
        <h1 className='text-8xl max-w-xl font-serif'>
          <span className=" decoration-black">X</span><span className="text-sm">is</span>
        </h1>
      </div>
      </div>
      <div>
        <p className='text-right text-lg'>{user && !user?.hood_id ? <>Please click <Link passHref href="/profile"><span className='cursor-pointer'>here</span></Link> and update your profile to continue reserving </>:null}</p>
      </div>
    </div>
  )  
}



export default Home
