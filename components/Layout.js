import React from 'react';
import Footer from './Footer';
import Header from './Header';

export const Layout = ({children}) =>  {
    return (
      <div className='flex flex-col h-screen max-w-7xl mx-auto'>
        <Header/>
        <div className='flex-grow'>
        {children}
        </div>
        <Footer/>
      </div>
    );
}