import { useParams} from "react-router-dom";
import { useMutation, useQueryClient} from '@tanstack/react-query';
import { toast } from 'react-toastify';
import apiClient from './connectAxios';

export function useAddTeacherToCourse() {

    const {id} = useParams();
    const queryClient = useQueryClient();

    const addTeacherToCourse = async(data) => {
        try {

            const response = await toast.promise( apiClient.patch(`courses/addTeacherToCourse/${id}`, data), {
                pending: 'Adding Teacher...',
                success: 'Successfully added teacher',
            });
            return response.data;
        } catch (error) {
            console.error(error);

            // Check if the error is a response error and if it has a message property and throw it as an error
            if (error.response.data.error !== undefined) {
                throw new Error(error.response.data.error);
            } else {
                throw new Error(error);
            }
        }
    }

    return useMutation({
        mutationFn: addTeacherToCourse,
        onSuccess: (data) => {
            // setting the teacher data in the query cache for every course the teacher is teaching
            data.teacher.courses.forEach(course => {
                queryClient.setQueryData(["courses", course], (oldData) => ({...oldData, teacher: data.teacher}));
            });
            // invalidating the teacher data in the query cache
            queryClient.invalidateQueries({queryKey: ["teachers",data.teacher._id],exact: true});
            // setting the teachers data in the query cache with the updated teacher data
            queryClient.setQueryData(["teachers"], (oldData) => {
                return oldData.map(teacher => {
                    if (teacher._id === data.teacher._id){
                        return data.teacher;
                    }
                    return teacher;
                });
            });       
        },
        onError: (error) => {
            console.error(error);
            toast.error(`Addition failed because: ${error.message}`);
        },
    });
}

export function useRemoveTeacherFromCourse() {
        
    const {id} = useParams();
    const queryClient = useQueryClient();

    const removeTeacherFromCourse = async() => {
        try {

            const response = await toast.promise( apiClient.patch(`courses/removeTeacherFromCourse/${id}`), {
                pending: 'Removing Teacher...',
                success: 'Successfully removed teacher',
            });
            return response.data;
        } catch (error) {
            console.error(error);

            // Check if the error is a response error and if it has a message property and throw it as an error
            if (error.response.data.error !== undefined) {
                throw new Error(error.response.data.error);
            } else {
                throw new Error(error);
            }
        }
    }

    return useMutation({
        mutationFn: removeTeacherFromCourse,
        onSuccess: () => {
            // setting the teacher data in the query cache for every course the teacher is teaching
            queryClient.setQueryData(["courses", id], (oldData) => {
                if (oldData.teacher){
                    queryClient.invalidateQueries({queryKey: ["teachers",oldData.teacher._id],exact: true});
                    oldData.teacher.courses.forEach(course => {
                        if(course !== id){
                            console.log(course._id);
                            queryClient.invalidateQueries({queryKey: ["courses",course],exact: true});
                        }
                       
                    });
                    return {...oldData, teacher: undefined};
                }
            });
            // invalidating the teacher data in the query cache
            queryClient.invalidateQueries({queryKey: ["teachers"],exact: true});
            
        },
        onError: (error) => {
            console.error(error);
            toast.error(`Removal failed because: ${error.message}`);
        },
    });
}