import { useParams} from "react-router-dom";
import { useMutation, useQueryClient} from '@tanstack/react-query';
import { toast } from 'react-toastify';
import apiClient from './connectAxios';

export function useRemoveProgramFromStudent() {
    
    const {id} = useParams();
    const queryClient = useQueryClient();

    const removeProgramFromStudent = async(data) => {
       
        try {
            const response = await toast.promise( apiClient.patch(`students/${id}/removeProgramFromStudent/`, {programId: data}), {
                pending: 'Removing Program...',
                success: 'Successfully removed program',
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
        mutationFn: removeProgramFromStudent,
        onMutate: (data) => {
            queryClient.invalidateQueries({queryKey:["programs", data], exact: true});
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["students", id], (oldData) => ({...oldData, ...data}));
            queryClient.invalidateQueries("courses");
        },
        onError: (error) => {
            console.error(error);
            toast.error(`Removal failed because: ${error.message}`);
        }
    });
}