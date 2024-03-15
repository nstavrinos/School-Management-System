import ProgramForm from "./ProgramForm";
import { useGetById,useUpdate,useRemoveStudentFromProgram} from '../api/sharedAPI';
import { useNavigate } from 'react-router-dom';
import StudentsList from './StudentsList';
import NotFoundPage from '../pages/NotFoundPage';

export default function EditProgram() {

    const navigateTo = useNavigate();

    const getProgram= useGetById("programs");
    const updateProgram = useUpdate("programs");
    const removeStudent = useRemoveStudentFromProgram();

    const removeFun = async  (studentId) => {
        removeStudent.mutate(studentId);
    }


    const onSubmit = async (data) => {
        updateProgram.mutate(data);
        navigateTo('/programs');
    };

    if(getProgram.isError || removeStudent.isError || updateProgram.isError){
    return <NotFoundPage/>
    }

    return (
        <>
            <h3 className="text-lg font-semibold p-4">"EDIT Program"</h3>
            {getProgram?.data && <ProgramForm program={getProgram?.data} submitText="Edit" submitAction={onSubmit} />}    
            <StudentsList students={getProgram?.data?.students} headerInfo="List of Students that are part of this program" buttonLink={`/programs/addStudentToProgram/${getProgram?.data?._id}`} deleteFun={removeFun}/>
        </>

    );
}