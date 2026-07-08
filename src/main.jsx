// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import ProducctsList from './ProductsList/ProductsList.jsx';
import Directory from './directory/Directory.jsx';
import Home from './home/Home.jsx';
import './index.css';

// 1. Define your routes in an array
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Acts as the layout/root
    children: [
      {
        index:true, // Default route (index)
        element: <Home />,
      },{
        path: "home", // Default route (index)
        element: <Home />,
      },
      {
        path: "productsList", // Default route (index)
        element: <ProducctsList />,
      },
      {
        path:"directory",
        element:<Directory/>
      }
      
    ],
  },
]);

// 2. Pass the router to the RouterProvider
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);