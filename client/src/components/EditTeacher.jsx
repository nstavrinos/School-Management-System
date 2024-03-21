import TeacherForm from "./TeacherForm2";
import { useGetById,useUpdate,useRemoveCourseFromTeacher} from '../api/sharedAPI';
import { useNavigate } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import CoursesList from "./CoursesList2";
import {Grid} from '@mantine/core';

export default function EditTeacher() {

    const navigateTo = useNavigate();
    const getTeacher= useGetById("teachers");
    const updateTeacher = useUpdate("teachers");
    const removeCourse = useRemoveCourseFromTeacher();

    const removeCourseFun = async  (courseId) => {
        removeCourse.mutate(courseId);
    }

    const onSubmit = async (data) => {
        updateTeacher.mutate(data);
        navigateTo(-1);
    };

    if(getTeacher.isError || removeCourse.isError || updateTeacher.isError){
    return <NotFoundPage/>
    }

    return (
            <Grid  spacing="lg">
                <Grid.Col span={12} >
                    {getTeacher?.data && <TeacherForm teacher={getTeacher?.data} submitText="Edit" submitAction={onSubmit} />} 
                </Grid.Col>
                <Grid.Col span={12} >
                    <CoursesList courses={getTeacher?.data?.courses} headerInfo="List of Courses" buttonLink={''} buttonInfo='Remove'deleteFun={removeCourseFun} />
                </Grid.Col>
            </Grid>

    );
}