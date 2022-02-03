import Link from 'next/link';
import React from 'react';
import { useUser } from '../context/UserContext';
import {useRouter} from 'next/router'
import classNames from 'classnames';

function Header() {
  const {user} = useUser();
  const router = useRouter();

  return(
    <header>
      <nav>
        <div className="navbar px-4 mb-2 shadow-lg bg-neutral text-neutral-content rounded-sm">
          <div className="navbar-start">
            <Link passHref href='/'>
          <span className={classNames("cursor-pointer",{'link-primary': router.pathname === '/' })} >HoodXis</span>
          </Link>
          </div>
          <div className="navbar-center"></div>
          <div className="navbar-end space-x-2">
          {user? <Link passHref href={`/reserve`}><p className={classNames("cursor-pointer",{ 'link-primary': router.pathname === '/reserve' })}>Reserve</p></Link>: null}
          {user? <Link passHref href={`/logout`}><p className={classNames("cursor-pointer",{'link-primary': router.pathname === '/logout' })}>Logout</p></Link>:<Link passHref href={'/login'}><p className={classNames("cursor-pointer",{'link-primary': router.pathname === '/login' })}>Sign In</p></Link>}
          {user? <Link passHref href={'/profile'}><p className={classNames("cursor-pointer",{'link-primary': router.pathname === '/profile' })}>{user?.name ?? user?.email}</p></Link>: null}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
