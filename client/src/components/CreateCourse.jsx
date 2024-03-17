import { useAddCourseToProgram} from '../api/sharedAPI';
import { useNavigate} from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import  CourseForm from "./CourseForm";

export default function CreateCourse  () {
    const navigateTo = useNavigate();

    const createCourse = useAddCourseToProgram() ;

    const onSubmit = async (data) => {
        const newCourse = await createCourse.mutateAsync(data);
        navigateTo(`/courses/${newCourse.courses.at(-1)._id}`);
   };

    if(createCourse.isError){
        return <NotFoundPage/>
    }

    return (
        <>
            <h3 className="text-lg font-semibold p-4">"Create Course"</h3>
            <CourseForm submitText="Create" submitAction={onSubmit} />    
        </>

    );
   
};
 