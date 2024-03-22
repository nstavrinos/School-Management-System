import {useGetById, useUpdate, } from '../api/sharedAPI';
import NotFoundPage from './NotFoundPage';
import ProgramsList from "../components/Programs/ProgramsList";
import GradesList from '../components/Grades/GradesList';
import {Grid} from '@mantine/core';
import EditStudent from '../components/Students/EditStudent';

export default function StudentPage() {

    const getStudent= useGetById("students");
    const updateStudent = useUpdate("students");

    const studentRemoveFun = async  (studentId) => {
        console.log("Student ID: ", studentId);
    }

    if(getStudent.isError || updateStudent.isError){
        return <NotFoundPage/>
    }

    if(getStudent.isLoading || getStudent.data === undefined){
        return <p>Loading...</p>
    }

    return (
            <Grid  spacing="lg">
                <Grid.Col span={12} >
                   <EditStudent student={getStudent.data}/>   
                </Grid.Col>
                <Grid.Col span={12} >
                     <ProgramsList programs={getStudent?.data?.programs} headerInfo="Student Programs" buttonLink={''} deleteFun={studentRemoveFun}/>
                </Grid.Col>
                <Grid.Col span={12} >
                    <GradesList grades={getStudent?.data?.grades} mode="student" />
                </Grid.Col>
            </Grid>
    );
}