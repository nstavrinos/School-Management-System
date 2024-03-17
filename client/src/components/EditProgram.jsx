import ProgramForm from "./ProgramForm";
import { useGetById,useUpdate,useRemoveStudentFromProgram,useDelete} from '../api/sharedAPI';
import { useNavigate } from 'react-router-dom';
import StudentsList from './StudentsList';
import NotFoundPage from '../pages/NotFoundPage';
import CoursesList from "./CoursesList";

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
        <>
            <h3 className="text-lg font-semibold p-4">"EDIT Program"</h3>
            {getProgram?.data && <ProgramForm program={getProgram?.data} submitText="Edit" submitAction={onSubmit} />}    
            <StudentsList students={getProgram?.data?.students} headerInfo="List of Students that are part of this program" buttonLink={`/programs/addStudentsToProgram/${getProgram?.data?._id}`} deleteFun={studentRemoveFun}/>
            <CoursesList courses={getProgram?.data?.courses} headerInfo="List of Courses" buttonLink={`/programs/addCourseToProgram/${getProgram?.data?._id}`} buttonInfo='Delete' deleteFun={courseDelFun}/>
        </>

    );
}