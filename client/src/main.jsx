import React from 'react'
import ReactDOM from 'react-dom/client'
import NotFoundPage from './pages/NotFoundPage.jsx'
import HomePage from './pages/HomePage.jsx'
import ProgramsPage from './pages/ProgramsPage.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import NavbarWrapper from './App.jsx'


const BrowserRouter = createBrowserRouter([
  {
    path: '/',
    element: <NavbarWrapper />,
    errorElement: <NotFoundPage />,
    children: [
              { path: '/', 
                element: <HomePage />,
                errorElement: <NotFoundPage />
              },
              { path: '/programms', 
                element: <ProgramsPage />,
              },
            ]
  }


]);

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={BrowserRouter}/>
    </QueryClientProvider>
  </React.StrictMode>,
)

