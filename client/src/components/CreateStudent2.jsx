import {useDelete, useCreate, useAddStudentToProgram} from '../api/sharedAPI';
import { useNavigate, useParams } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import StudentForm from "./StudentForm";

export default function CreateStudent() {
    const navigateTo = useNavigate();
    const {id} = useParams();

   const createStudent = id ? useAddStudentToProgram() : useCreate("students");
   const deleteStudent = useDelete("students");

   const deleteFun = async (studentId) => {
       deleteStudent.mutate(studentId);
   }

   const onSubmit = async (data) => {
        createStudent.mutate(data);
        navigateTo(-1);
   };

   if( deleteStudent.isError || createStudent.isError){
   return <NotFoundPage/>
   }

   return (
       <>
           <h3 className="text-lg font-semibold p-4">"Create Student"</h3>
           <StudentForm submitText="Create" submitAction={onSubmit} />    
       </>

   );
}