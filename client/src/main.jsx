import React from 'react'
import ReactDOM from 'react-dom/client'
import NotFoundPage from './pages/NotFoundPage.jsx'
import HomePage from './pages/HomePage.jsx'
import ProgramsPage from './pages/ProgramsPage.jsx'
import StudentsPage from './pages/StudentsPage.jsx'
import StudentPage from './pages/StudentPage.jsx'
import ProgramPage from './pages/ProgramPage.jsx'
import AddStudents from './components/Students/AddStudents.jsx'
import AddTeacher from './components/Teachers/AddTeacher.jsx'
import TeachersPage from './pages/TeachersPage.jsx'
import TeacherPage from './pages/TeacherPage.jsx'
import CoursesPage from './pages/CoursesPage.jsx'
import CoursePage from './pages/CoursePage.jsx'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

import { MantineProvider } from '@mantine/core';

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
                element: <ProgramsPage/>,
              },
              { path: '/programs/:id', 
                element: <ProgramPage />,
              },
              { path: '/programs/addStudentsToProgram/:id', 
                element: <AddStudents/>,
              },
              { path: '/students',
                element: <StudentsPage/>
              },
              { path: '/students/:id', 
                element: <StudentPage />,
              },
              { path: '/courses', 
                element: <CoursesPage/>,
              },             
              { path: '/courses/:id', 
                element: <CoursePage/>,
              },
              { path: '/teachers',
                element: <TeachersPage/>
              },
              { path: '/teachers/:id', 
                element: <TeacherPage />,
              },
              { path: '/programs/addTeacherToCourse/:id', 
              element: <AddTeacher/>,
              },

            ]
  }


]);

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <MantineProvider  defaultColorScheme="dark">
      <RouterProvider router={BrowserRouter}/>
    </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
)

