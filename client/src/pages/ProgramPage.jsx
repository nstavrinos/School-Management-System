import { useGetById,useDelete} from '../api/sharedAPI';
import {useRemoveStudentFromProgram} from '../api/programsAPI';
import StudentsList from '../components/Students/StudentsList';
import NotFoundPage from '../pages/NotFoundPage';
import CoursesList from '../components/Courses/CoursesList';
import EditProgram from '../components/Programs/EditProgram';
import {Grid, Loader} from '@mantine/core';

export default function ProgramPage() {

    const getProgram= useGetById("programs");
    const removeStudent = useRemoveStudentFromProgram();
    const deleteCourse = useDelete("courses");

    const studentRemoveFun = async  (studentId) => {
        removeStudent.mutate(studentId);
    }

    const courseDelFun = async  (courseId) => {
        deleteCourse.mutate(courseId);
    }

    if(getProgram.isError || removeStudent.isError ){
        return <NotFoundPage/>
    }

    if(getProgram.isLoading || removeStudent.isLoading || deleteCourse.isLoading || getProgram.data === undefined){
        return  (<div className="flex justify-center items-center h-screen">
                    <Loader size={50} />
                </div>);
    }

    return (
        <Grid  spacing="lg">
            <Grid.Col span={12} >
               <EditProgram program={getProgram.data}/>
            </Grid.Col>
            <Grid.Col span={12} >
                <StudentsList students={getProgram?.data?.students} headerInfo="List of Students that are part of this program" tableMaxHeight="200" deleteFun={studentRemoveFun}/>
            </Grid.Col>
            <Grid.Col span={12} >
                <CoursesList courses={getProgram?.data?.courses} headerInfo="List of Courses" tableMaxHeight="630" enableAddCourse={true} buttonInfo='Delete' deleteFun={courseDelFun}/>
            </Grid.Col>
        </Grid>
    );
}



