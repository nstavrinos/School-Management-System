import TeacherForm from "./TeacherForm2";
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
            <TeacherForm submitText="Create" submitAction={onSubmit} />    
        );
}