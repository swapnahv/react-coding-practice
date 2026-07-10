import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './App.css';

export default function App() {
  return (
    <div>
      <div className='fixed-header-content'>
        <header className='header'>
        <h1>Hello Learner!</h1>
      </header>
     <nav style={{backgroundColor:"lightcyan"}}>
      <Link className='p-10' to="/home"><span>Home</span></Link>
      <Link className='p-10' to="/productsList"><span>Products List</span></Link>
      <Link className='p-10' to="/directory"><span>Directory</span></Link>
      <Link className='p-10' to="/pagination"><span>Pagination</span></Link>
     </nav>
      </div>

     <main className='outletContainer'>
      <Outlet></Outlet>
     </main>
    </div>
  );
}
