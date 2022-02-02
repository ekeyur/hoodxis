import Link from 'next/link';
import React from 'react';
import { useUser } from '../context/UserContext';

function Header() {
  const {user} = useUser();
  return(<header>
    <nav>
      <div className="navbar px-4 mb-2 shadow-lg bg-neutral text-neutral-content rounded-sm">
        <div className="navbar-start">
          <Link href='/'>
        <span>HoodTennis</span>
        </Link>
        </div>
        <div className="navbar-center"></div>
        <div className="navbar-end space-x-2">
        {user? <Link href={`/reserve`}><p className="cursor-pointer">Reserve</p></Link>: null}
      {user? <Link href={'/profile'}><p className="cursor-pointer">Hi, {user?.name ?? user?.email}</p></Link>: null}
      {user? <Link href={`/logout`}><p className="cursor-pointer">Logout</p></Link>:<Link href={'/login'}><p className="cursor-pointer">Sign In</p></Link>}
        </div>
      </div>
    </nav>
  </header>);
}

export default Header;
