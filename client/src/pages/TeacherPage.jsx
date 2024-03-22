import { useGetById,useRemoveCourseFromTeacher} from '../api/sharedAPI';
import NotFoundPage from './NotFoundPage';
import CoursesList from "../components/Courses/CoursesList";
import EditTeacher from "../components/Teachers/EditTeacher";
import {Grid,Loader} from '@mantine/core';

export default function TeacherPage() {

    const getTeacher= useGetById("teachers");
    const removeCourse = useRemoveCourseFromTeacher();

    const removeCourseFun = async  (courseId) => {
        removeCourse.mutate(courseId);
    }

    if(getTeacher.isError || removeCourse.isError){
        return <NotFoundPage/>
    }
    if(getTeacher.isLoading ||  getTeacher.data === undefined){
        return (<div className="flex justify-center items-center h-screen">
                    <Loader size={50} />
                </div>);
    }

    return (
            <Grid  spacing="lg">
                <Grid.Col span={12} >
                    <EditTeacher teacher={getTeacher.data}/>
                </Grid.Col>
                <Grid.Col span={12} >
                    <CoursesList courses={getTeacher.data.courses} headerInfo="List of Courses" buttonLink={''} buttonInfo='Remove'deleteFun={removeCourseFun} />
                </Grid.Col>
            </Grid>

    );
}