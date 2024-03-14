import ProgramForm from "./ProgramForm";
import {useDelete, useCreate} from '../api/sharedAPI';
//import { useNavigate } from 'react-router-dom';
import StudentsList from './StudentsList';
import NotFoundPage from '../pages/NotFoundPage';

export default function CreateProgram() {

   // const navigateTo = useNavigate();

    const createProgram = useCreate("programs");
    const deleteStudent = useDelete("students");

    const deleteFun = async (studentId) => {
        deleteStudent.mutate(studentId);
    }

    const onSubmit = async (data) => {
        createProgram.mutate(data);
       // navigateTo('/programs');
    };

    if( deleteStudent.isError || createProgram.isError){
    return <NotFoundPage/>
    }

    return (
        <>
            <h3 className="text-lg font-semibold p-4">"Create Program"</h3>
            <ProgramForm submitText="Create" submitAction={onSubmit} />    
           {createProgram.data && <StudentsList students={createProgram?.data?.students} headerInfo="List of Students that are part of this program" buttonLink={`/programs/addStudentToProgram/${createProgram?.data?._id}`} deleteFun={deleteFun}/>}
        </>

    );
}