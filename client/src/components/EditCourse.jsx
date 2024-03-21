import {useGetById, useUpdate, useRemovoTeacherFromCourse} from '../api/sharedAPI';
import { useNavigate, Link} from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import CourseForm from "./CourseForm2";
import GradesList from './GradesList2';
import TeachersList from './TeachersList2';
import {Grid} from '@mantine/core';

export default function EditCourse() {
    const navigateTo = useNavigate();

    const getCourse= useGetById("courses");
    const updateCourse = useUpdate("courses");
    const removeTeacher = useRemovoTeacherFromCourse();

    const onSubmit = async (data) => {
        updateCourse.mutate(data);
        navigateTo(-1);
    };

    const teacherRemoveFun = async () => {
        removeTeacher.mutate();
    }

    if(getCourse.isError || updateCourse.isError){
    return <NotFoundPage/>
    }

    if(getCourse.isLoading){
        return <p>Loading...</p>
    }

    return (
          <Grid  spacing="lg">
            <Grid.Col span={12} >
              {getCourse?.data && <CourseForm course={getCourse.data} submitText="Edit" submitAction={onSubmit} />}  
            </Grid.Col>
            <Grid.Col span={12} >
              <TeachersList teachers={getCourse.data.teacher} headerInfo="Course Teacher" buttonLink={`/programs/addTeacherToCourse/${getCourse?.data?._id}`} deleteFun={teacherRemoveFun} />
            </Grid.Col>
            <Grid.Col span={12} >
              <GradesList grades={getCourse?.data?.grades} mode="course" />
            </Grid.Col>
          </Grid>
    );
}