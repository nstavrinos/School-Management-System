import React from 'react'
import ReactDOM from 'react-dom/client'
import NotFoundPage from './pages/NotFoundPage.jsx'
import HomePage from './pages/HomePage.jsx'
import ProgramsPage from './pages/ProgramsPage.jsx'
import StudentsPage from './pages/StudentsPage.jsx'
import CreateProgam from './components/CreateProgram.jsx'
import CreateStudent from './components/CreateStudent.jsx'
import EditProgram from './components/EditProgram.jsx'
import EditStudent from './components/EditStudent.jsx'
import EditCourse from './components/EditCourse.jsx'
import AddStudents from './components/AddStudents.jsx'
import CreateTeacher from './components/CreateTeacher.jsx'
import EditTeacher from './components/EditTeacher.jsx'
import TeachersPage from './pages/TeachersPage.jsx'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CreateCourse from './components/CreateCourse.jsx'
import AddTeacher from './components/AddTeacher.jsx'

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
                element: <EditProgram />,
              },
              { path: '/programs/create', 
              element: <CreateProgam/>,
              },
              { path: '/programs/addStudentToProgram/:id', 
                element: <CreateStudent/>,
              },
              { path: '/programs/addStudentsToProgram/:id', 
                element: <AddStudents/>,
              },
              { path: '/programs/addCourseToProgram/:id', 
                element: <CreateCourse/>,
              },
              { path: '/students',
                element: <StudentsPage/>
              },
              { path: '/students/:id', 
                element: <EditStudent />,
              },
              { path: '/students/create', 
                element: <CreateStudent/>,
              },
              { path: '/courses/:id', 
                element: <EditCourse/>,
              },
              { path: '/teachers',
                element: <TeachersPage/>
              },
              { path: '/teachers/:id', 
                element: <EditTeacher />,
              },
              { path: '/teachers/create', 
                element: <CreateTeacher/>,
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
      <RouterProvider router={BrowserRouter}/>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
)

