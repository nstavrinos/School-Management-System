import ProgramForm from "./ProgramForm2";
import { useGetById,useUpdate,useRemoveStudentFromProgram,useDelete} from '../api/sharedAPI';
import { useNavigate } from 'react-router-dom';
import StudentsList from './StudentsList2';
import NotFoundPage from '../pages/NotFoundPage';
import CoursesList from "./CoursesList2";
import {Grid} from '@mantine/core';

export default function EditProgram() {

    const navigateTo = useNavigate();
    const getProgram= useGetById("programs");
    const updateProgram = useUpdate("programs");
    const removeStudent = useRemoveStudentFromProgram();
    const deleteCourse = useDelete("courses");

    const studentRemoveFun = async  (studentId) => {
        removeStudent.mutate(studentId);
    }

    const courseDelFun = async  (courseId) => {
        deleteCourse.mutate(courseId);
    }

    const onSubmit = async (data) => {
        updateProgram.mutate(data);
        navigateTo('/programs');
    };

    if(getProgram.isError || removeStudent.isError || updateProgram.isError){
    return <NotFoundPage/>
    }

    return (
        <Grid  spacing="lg">
            <Grid.Col span={12} >
                {getProgram?.data && <ProgramForm program={getProgram?.data} submitText="Edit" submitAction={onSubmit} />}  
            </Grid.Col>
            <Grid.Col span={12} >
            <StudentsList students={getProgram?.data?.students} headerInfo="List of Students that are part of this program" buttonLink={`/programs/addStudentsToProgram/${getProgram?.data?._id}`} deleteFun={studentRemoveFun}/>
            </Grid.Col>
            <Grid.Col span={12} >
                <CoursesList courses={getProgram?.data?.courses} headerInfo="List of Courses" buttonLink={`/programs/addCourseToProgram/${getProgram?.data?._id}`} buttonInfo='Delete' deleteFun={courseDelFun}/>
            </Grid.Col>
        </Grid>
    );
}