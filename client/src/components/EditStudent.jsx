import {useGetById, useUpdate, } from '../api/sharedAPI';
import { useNavigate} from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import StudentForm from "./StudentForm";

export default function EditStudent() {
    const navigateTo = useNavigate();

    const getStudent= useGetById("students");
    const updateStudent = useUpdate("students");

    const onSubmit = async (data) => {
        updateStudent.mutate(data);
        navigateTo(-1);
    };

    if(getStudent.isError || updateStudent.isError){
    return <NotFoundPage/>
    }

    if(getStudent.isLoading){
        return <p>Loading...</p>
    }

    return (
        <>
            <h3 className="text-lg font-semibold p-4">"EDIT Program"</h3>
            {getStudent?.data && <StudentForm student={getStudent.data} submitText="Edit" submitAction={onSubmit} />}    
        </>

    );
}