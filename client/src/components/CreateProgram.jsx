import ProgramForm from "./ProgramForm2";
import {useRemoveStudentFromProgram, useCreate} from '../api/sharedAPI';
import { useNavigate } from 'react-router-dom';
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
        <ProgramForm submitText="Create" submitAction={onSubmit} />    
    );
}