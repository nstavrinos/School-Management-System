import {useGetById, useUpdate, } from '../api/sharedAPI';
import { useNavigate} from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import CourseForm from "./CourseForm";

export default function EditCourse() {
    const navigateTo = useNavigate();

    const getCourse= useGetById("courses");
    const updateCourse = useUpdate("courses");

    const onSubmit = async (data) => {
        updateCourse.mutate(data);
        navigateTo(-1);
    };

    if(getCourse.isError || updateCourse.isError){
    return <NotFoundPage/>
    }

    if(getCourse.isLoading){
        return <p>Loading...</p>
    }

    return (
        <>
            <h3 className="text-lg font-semibold p-4">"EDIT Course"</h3>
            {getCourse?.data && <CourseForm course={getCourse.data} submitText="Edit" submitAction={onSubmit} />}    
        </>

    );
}