import React from 'react'
import ReactDOM from 'react-dom/client'
import NotFoundPage from './pages/NotFoundPage.jsx'
import HomePage from './pages/HomePage.jsx'
//import ProgramsPage from './pages/ProgramsPage.jsx'
import ProgramsList from './components/ProgramsList.jsx'
import StudentsList from './components/StudentsList.jsx'

import StudentsPage from './pages/StudentsPage.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import CreateProgam2 from './components/CreateProgram2.jsx'
import CreateStudent2 from './components/CreateStudent2.jsx'
import EditProgram from './components/EditProgram.jsx'
import EditStudent from './components/EditStudent.jsx'



const BrowserRouter = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
              { path: '/', 
                element: <HomePage />,
              },
              { path: '/programs', 
                element: <ProgramsList/>,
              },
              { path: '/programs/:id', 
                element: <EditProgram />,
              },
              { path: '/programs/create', 
              element: <CreateProgam2 />,
              },
              { path: '/programs/addStudentToProgram/:id', 
                element: <CreateStudent2 />,
              },
              { path: '/students',
              element: <StudentsPage/>
            },
              { path: '/students/:id', 
              element: <EditStudent />,
            },
              { path: '/students/create', 
              element: <CreateStudent2 />,
            },

            ]
  }


]);


// const BrowserRouter = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     errorElement: <NotFoundPage />,
//     children: [
//       {
//         path: "/",
//         element: <HomePage />,
//       },
//     ],
//   },
//   {
//     path: "/programs",
//     element: <App />,
//     children: [
//       {
//         path: "/programs",
//         element: <ProgramsList />,
//       },
//     ],
//   },
//   {
//     path: "/programs/:id",
//     element: <App />,
//     children: [
//       {
//         path: "/programs/:id",
//         element: <CreateProgam />,
//       },
//     ],
//   },

// ]);


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={BrowserRouter}/>
    </QueryClientProvider>
  </React.StrictMode>,
)

