import TeacherForm from "./TeacherForm";
import { useGetById,useUpdate,useDelete} from '../api/sharedAPI';
import { useNavigate } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import CoursesList from "./CoursesList";

export default function EditTeacher() {

    const navigateTo = useNavigate();
    const getTeacher= useGetById("teachers");
    const updateTeacher = useUpdate("teachers");
    const deleteCourse = useDelete("courses");

    const courseDelFun = async  (courseId) => {
        deleteCourse.mutate(courseId);
    }

    const onSubmit = async (data) => {
        updateTeacher.mutate(data);
        navigateTo(-1);
    };

    if(getTeacher.isError || deleteCourse.isError || updateTeacher.isError){
    return <NotFoundPage/>
    }

    return (
        <>
            <h3 className="text-lg font-semibold p-4">"EDIT Teacher"</h3>
            {getTeacher?.data && <TeacherForm teacher={getTeacher?.data} submitText="Edit" submitAction={onSubmit} />}    
            <CoursesList courses={getTeacher?.data?.courses} headerInfo="List of Courses" buttonLink={''} deleteFun={courseDelFun}/>
        </>

    );
}