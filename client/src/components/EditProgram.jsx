import ProgramForm from "./ProgramForm";
import { useGetById,useUpdate,useDelete} from '../api/sharedAPI';
import { useNavigate } from 'react-router-dom';
import StudentsList from './StudentsList';
import NotFoundPage from '../pages/NotFoundPage';

export default function EditProgram() {

    const navigateTo = useNavigate();

    const getProgram= useGetById("programs");
    const updateProgram = useUpdate("programs");
    const deleteStudent = useDelete("students");

    const deleteFun = async (studentId) => {
        deleteStudent.mutate(studentId);
    }


    const onSubmit = async (data) => {
        updateProgram.mutate(data);
        navigateTo('/programs');
    };

    if(getProgram.isError || deleteStudent.isError || updateProgram.isError){
    return <NotFoundPage/>
    }

    return (
        <>
            <h3 className="text-lg font-semibold p-4">"EDIT Program"</h3>
            {getProgram?.data && <ProgramForm program={getProgram?.data} submitText="Edit" submitAction={onSubmit} />}    
            <StudentsList students={getProgram?.data?.students} headerInfo="List of Students that are part of this program" buttonLink={`/programs/addStudentToProgram/${getProgram?.data?._id}`} deleteFun={deleteFun}/>
        </>

    );
}