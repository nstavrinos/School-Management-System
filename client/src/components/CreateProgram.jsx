import ProgramForm from "./ProgramForm";
import {useRemoveStudentFromProgram, useCreate} from '../api/sharedAPI';
import { useNavigate } from 'react-router-dom';
import StudentsList from './StudentsList';
import NotFoundPage from '../pages/NotFoundPage';

export default function CreateProgram() {

    const navigateTo = useNavigate();

    const createProgram = useCreate("programs");
    const removeStudent = useRemoveStudentFromProgram();

    const removeFun = async  (studentId) => {
        removeStudent.mutate(studentId);
    }

    const onSubmit = async (data) => {
        const newStudent = await createProgram.mutateAsync(data);
        navigateTo(`/programs/${newStudent._id}`);
    };

    if( removeStudent.isError || createProgram.isError){
    return <NotFoundPage/>
    }

    return (
        <>
            <h3 className="text-lg font-semibold p-4">"Create Program"</h3>
            <ProgramForm submitText="Create" submitAction={onSubmit} />    
           {createProgram.data && <StudentsList students={createProgram?.data?.students} headerInfo="List of Students that are part of this program" buttonLink={`/programs/addStudentToProgram/${createProgram?.data?._id}`} deleteFun={removeFun}/>}
        </>

    );
}