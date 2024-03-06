import React from 'react'
import ReactDOM from 'react-dom/client'
import NotFoundPage from './pages/NotFoundPage.jsx'
import HomePage from './pages/HomePage.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import CreatePage from './pages/CreatePage.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

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

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={BrowserRouter}/>
    </QueryClientProvider>
  </React.StrictMode>,
)
