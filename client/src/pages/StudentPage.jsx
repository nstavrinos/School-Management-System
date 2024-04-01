import {useGetById, useUpdate} from '../api/sharedAPI';
import {useRemoveProgramFromStudent } from '../api/studentsAPI';
import NotFoundPage from './NotFoundPage';
import ProgramsList from "../components/Programs/ProgramsList";
import GradesList from '../components/Grades/GradesList';
import {Grid} from '@mantine/core';
import EditStudent from '../components/Students/EditStudent';

export default function StudentPage() {

    const getStudent= useGetById("students");
    const updateStudent = useUpdate("students");
    const removeProgram= useRemoveProgramFromStudent();

    const programRemoveFun = async  (programId) => {
        await removeProgram.mutateAsync(programId);
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
                     <ProgramsList programs={getStudent?.data?.programs} headerInfo="Student Programs" buttonInfo='Remove' tableMaxHeight="300"deleteFun={programRemoveFun}/>
                </Grid.Col>
                <Grid.Col span={12} >
                    <GradesList grades={getStudent?.data?.grades} mode="student" tableMaxHeight="300" />
                </Grid.Col>
            </Grid>
    );
}