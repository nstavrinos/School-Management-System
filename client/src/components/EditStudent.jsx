import {useGetById, useUpdate, } from '../api/sharedAPI';
import { useNavigate} from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import StudentForm from "./StudentForm";
import ProgramsList from "./ProgramsList";
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
            <h3 className="text-lg font-semibold p-4">EDIT Student</h3>
            {getStudent?.data && <StudentForm student={getStudent.data} submitText="Edit" submitAction={onSubmit} />}    
            <ProgramsList programs={getStudent?.data?.programs} headerInfo="List of programs that the student is part of" buttonLink={''} deleteFun={studentRemoveFun}/>
            <GradesList grades={getStudent?.data?.grades} mode="student" />
        </>

    );
}