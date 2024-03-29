import { useMutation, useQueryClient} from '@tanstack/react-query';
import { toast } from 'react-toastify';
import apiClient from './connectAxios';

// This function is used to update the grade of a student
export function useUpdateGrade() {

    const queryClient = useQueryClient();

    const update = async(data) => {
        try {
            const response = await toast.promise( apiClient.patch(`grades/${data.grade_id}`, {new_grade:data.new_score}), {
                pending: 'Updating...',
                success: 'Successfully edited grade',
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
        mutationFn: update,
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ["courses",data.course],exact: true});
            queryClient.invalidateQueries({queryKey: ["students",data.student],exact: true});
        },
        onError: (error) => {
            console.error(error);
            toast.error(`Edit failed because: ${error.message}`);
        }
    });
}
