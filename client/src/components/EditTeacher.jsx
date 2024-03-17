import TeacherForm from "./TeacherForm";
import { useGetById,useUpdate,useRemoveCourseFromTeacher} from '../api/sharedAPI';
import { useNavigate } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import CoursesList from "./CoursesList";

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
        <>
            <h3 className="text-lg font-semibold p-4">"EDIT Teacher"</h3>
            {getTeacher?.data && <TeacherForm teacher={getTeacher?.data} submitText="Edit" submitAction={onSubmit} />}    
            <CoursesList courses={getTeacher?.data?.courses} headerInfo="List of Courses" buttonLink={''} buttonInfo='Remove'deleteFun={removeCourseFun} />
        </>

    );
}