import React from 'react';
import 'virtual:uno.css';

import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import '@svgstore';
import router from './config/router';
import './global.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <RouterProvider router={router}></RouterProvider>
  // </React.StrictMode>
);
