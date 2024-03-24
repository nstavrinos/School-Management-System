import {useGetById,useRemoveTeacherFromCourse} from '../api/sharedAPI';
import NotFoundPage from './NotFoundPage';
import EditCourse from '../components/Courses/EditCourse';
import GradesList from '../components/Grades/GradesList';
import TeachersList from '../components/Teachers/TeachersList';
import {Grid} from '@mantine/core';

export default function CoursePage() {
 
    const getCourse= useGetById("courses");
    const removeTeacher = useRemoveTeacherFromCourse();

    const teacherRemoveFun = async () => {
        removeTeacher.mutate();
    }

    if(getCourse.isError){
    return <NotFoundPage/>
    }

    if(getCourse.isLoading || getCourse.data === undefined){
        return <p>Loading...</p>
    }

    return (
          <Grid  spacing="lg">
            <Grid.Col span={12} >
               <EditCourse course={getCourse.data}/>
            </Grid.Col>
            <Grid.Col span={12} >
              <TeachersList teachers={[getCourse.data?.teacher]} headerInfo="Course Teacher" modalInfo="Select 1 Teacher to add to the course" deleteFun={teacherRemoveFun} />
            </Grid.Col>
            <Grid.Col span={12} >
              <GradesList grades={getCourse?.data?.grades} mode="course" />
            </Grid.Col>
          </Grid>
    );
}