import TeacherForm from "./TeacherForm";
import {useCreate} from '../api/sharedAPI';
import { useNavigate } from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';

export default function CreateTeacher() {
    
        const navigateTo = useNavigate();
    
        const createTeacher= useCreate("teachers");
    
        const onSubmit = async (data) => {
            createTeacher.mutate(data);
            navigateTo(-1);
        };
    
        if( createTeacher.isError){
        return <NotFoundPage/>
        }
    
        return (
            <>
                <h3 className="text-lg font-semibold p-4">"Create Teacher"</h3>
                <TeacherForm submitText="Create" submitAction={onSubmit} />    
            </>
    
        );
}