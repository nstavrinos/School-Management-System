import {useCreate, useAddStudentToProgram} from '../api/sharedAPI';
import { useNavigate, useParams } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import StudentForm from "./StudentForm2";

export default function CreateStudent() {
    const navigateTo = useNavigate();
    const {id} = useParams();

   const createStudent = id ? useAddStudentToProgram() : useCreate("students");
   
   const onSubmit = async (data) => {
        createStudent.mutate(data);
        navigateTo(-1);
   };

   if(createStudent.isError){
        return <NotFoundPage/>
   }

   return (
        <StudentForm submitText="Create" submitAction={onSubmit} />    
   );
}