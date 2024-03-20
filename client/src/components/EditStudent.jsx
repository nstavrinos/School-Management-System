import {useGetById, useUpdate, } from '../api/sharedAPI';
import { useNavigate} from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import StudentForm from "./StudentForm2";
import ProgramsList from "./ProgramsList2";
import GradesList from './GradesList';

export default function EditStudent() {
    const navigateTo = useNavigate();

    const getStudent= useGetById("students");
    const updateStudent = useUpdate("students");

    const studentRemoveFun = async  (studentId) => {
        console.log("Student ID: ", studentId);
    }

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
           
            {getStudent?.data && <StudentForm student={getStudent.data} submitText="Edit" submitAction={onSubmit} />}    
            <ProgramsList programs={getStudent?.data?.programs} headerInfo="Student Programs" buttonLink={''} deleteFun={studentRemoveFun}/>
            <GradesList grades={getStudent?.data?.grades} mode="student" />
        </>

    );
}