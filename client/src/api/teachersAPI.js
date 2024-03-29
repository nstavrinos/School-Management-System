import { useParams} from "react-router-dom";
import { useMutation, useQueryClient} from '@tanstack/react-query';
import { toast } from 'react-toastify';
import apiClient from './connectAxios';

export function useRemoveCourseFromTeacher() {
        
    const {id} = useParams();
    const queryClient = useQueryClient();

    const removeCourseFromTeacher = async(data) => {
        try {

            const response = await toast.promise( apiClient.patch(`teachers/removeCourseFromTeacher/${id}`, data), {
                pending: 'Removing Course...',
                success: 'Successfully removed course',
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
        mutationFn: removeCourseFromTeacher,
        onMutate: (data) => {
            queryClient.invalidateQueries({queryKey:["courses", data.courseId], exact: true});
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["teachers", id], (oldData) => ({...oldData, ...data}));
        },
        onError: (error) => {
            console.error(error);
            toast.error(`Removal failed because: ${error.message}`);
        }
    });

}