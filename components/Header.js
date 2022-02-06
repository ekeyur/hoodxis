import Link from 'next/link';
import React from 'react';
import Head from 'next/head'
import { useUser } from '../context/UserContext';
import {useRouter} from 'next/router'

function Header() {
  const {user} = useUser();
  const router = useRouter();

  return(
    <>
    <Head>
        <title>HoodTennis.com</title>
        <meta name="description" content="Hood tennis reservation system" />
    </Head>
      <nav>
        <div className="navbar px-4 shadow-lg rounded-sm flex bg-sky-300 justify-between py-2">
          <div>
            <Link passHref href='/'>
              <span >HoodXis</span>
            </Link>
          </div>
          <div className="flex space-x-2">
            {user ? <Link passHref href={`/reserve`}><p className="cursor-pointer">Reserve</p></Link>: null}
            {user ? <Link passHref href={`/logout`}><p className="cursor-pointer">Logout</p></Link> : <Link passHref href={'/login'}><p className="cursor-pointer">Sign In</p></Link>}
            {user ? <Link passHref href={'/profile'}><p className="cursor-pointer">{user?.name ?? user?.email}</p></Link>: null}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
