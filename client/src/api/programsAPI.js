import { useParams} from "react-router-dom";
import { useMutation, useQueryClient} from '@tanstack/react-query';
import { toast } from 'react-toastify';
import apiClient from './connectAxios';

export function useAddCourseToProgram() {

    const {id} = useParams();
    const queryClient = useQueryClient();

    const addCourseToProgram = async(data) => {
        try {
            const response = await toast.promise( apiClient.patch(`programs/addCourseToProgram/${id}`, data), {
                pending: 'Adding Course...',
                success: 'Successfully added course',
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
        mutationFn: addCourseToProgram,
        onSuccess: (data) => {
            console.log(data);
            // setting the program data in the query cache 
            queryClient.setQueryData(["programs", id], (oldData) => ({...oldData, ...data}));
            // invalidating the programs data in the query cache
            queryClient.invalidateQueries({queryKey: ["programs"],exact: true});
            // invalidating the new course data in the query cache
            queryClient.invalidateQueries({queryKey: ["courses", data.courses.at(-1)._id],exact: true});
            //setting the courses data in the query cache with the last course in the array which is the newly added course
            queryClient.setQueryData(["courses"], (oldData) => [...(oldData || []), data.courses.at(-1)]);
    
        },
        onError: (error) => {
            console.error(error);
            toast.error(`Addition failed because: ${error.message}`);
        }
    });

}

export function useAddStudentsToProgram (){

    const {id} = useParams();
    const queryClient = useQueryClient();

    const addStudentsToProgram = async(data) => {
        try {

            const response = await toast.promise( apiClient.patch(`programs/addStudentsToProgram/${id}`, data), {
                pending: 'Adding Student...',
                success: 'Successfully added student',
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
        mutationFn: addStudentsToProgram,
        onSuccess: (data) => {
            queryClient.setQueryData(["programs", id], (oldData) => ({...oldData, ...data}));
            queryClient.invalidateQueries({queryKey: ["programs"],exact: true});
            data.students.forEach(student => {
                queryClient.invalidateQueries({queryKey: ["students",student],exact: true});
            });
            queryClient.invalidateQueries({queryKey: ["students"],exact: true});
            data.courses.forEach(course => {
                queryClient.invalidateQueries({queryKey: ["courses",course],exact: true});
            });
            queryClient.invalidateQueries({queryKey: ["courses"],exact: true});
            
        },
        onError: (error) => {
            console.error(error);
            toast.error(`Addition failed because: ${error.message}`);
        }
    });

}

export function useRemoveStudentFromProgram() {
    
        const {id} = useParams();
        const queryClient = useQueryClient();
    
        const removeStudentFromProgram = async(data) => {
            try {
                const response = await toast.promise( apiClient.patch(`programs/removeStudentFromProgram/${id}`, {studentId: data}), {
                    pending: 'Removing Student...',
                    success: 'Successfully removed student',
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
            mutationFn: removeStudentFromProgram,
            onMutate: (data) => {
                queryClient.invalidateQueries({queryKey:["students", data], exact: true});
            },
            onSuccess: (data) => {
                queryClient.setQueryData(["programs", id], (oldData) => ({...oldData, ...data}));
                queryClient.invalidateQueries({queryKey: ["programs"],exact: true});
                data.courses.forEach(course => {
                    queryClient.invalidateQueries({queryKey: ["courses",course],exact: true});
                });
            },
            onError: (error) => {
                console.error(error);
                toast.error(`Removal failed because: ${error.message}`);
            }
        });
}