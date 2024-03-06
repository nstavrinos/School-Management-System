import React from 'react'
import ReactDOM from 'react-dom/client'
import NotFoundPage from './pages/NotFoundPage.jsx'
import HomePage from './pages/HomePage.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import CreatePage from './pages/CreatePage.jsx'

const BrowserRouter = createBrowserRouter([
  { path: '/', 
    element: <HomePage />,
    errorElement: <NotFoundPage />
  },
  { path: '/create', 
  element: <CreatePage />,
  errorElement: <NotFoundPage />
},

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={BrowserRouter}/>
  </React.StrictMode>,
)
