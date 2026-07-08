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
      <Link className='p-10' to="/home">Home</Link>
      <Link className='p-10' to="/productsList">Products List</Link>
      <Link className='p-10' to="/directory">Directory</Link>
      <Link className='p-10' to="">Pagination</Link>
     </nav>
      </div>

     <main className='outletContainer'>
      <Outlet></Outlet>
     </main>
    </div>
  );
}
