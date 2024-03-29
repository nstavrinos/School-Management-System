import { useParams} from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import apiClient from './connectAxios';
// This function is used to get all the data from the database
export function useGetAll(endpoint) {

    const getAll= async() =>{
        try {
            return (await apiClient.get(endpoint)).data;
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

    return useQuery({
        queryKey: [endpoint],
        queryFn: getAll,
        select: (data) => data.sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    });
}


// This function is used to get a single entry from the database
export function useGetById(endpoint) {

    const {id} = useParams();

    const getById = async() => {
        try {
            return (await apiClient.get(`${endpoint}/${id}`)).data;

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

    return useQuery({
        queryKey: [endpoint, id],
        enabled: !!id,
        queryFn: getById,
    });
}

// This function is used to create a new entry in the database
export function useCreate(endpoint) {

    const queryClient = useQueryClient();

    const create = async(data) => {
        try {
            const response = await toast.promise( apiClient.post(endpoint, data), {
                pending: 'Creating...',
                success: 'Successfully created',
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
        mutationFn: create,
        onSuccess: (data) => {
            queryClient.setQueryData([endpoint,data._id], data);
            queryClient.setQueryData([endpoint], (oldData) => [...oldData, data]);
        },
        onError: (error) => {
            console.error(error);
            toast.error(`Creation failed because: ${error.message}`);
        }
    });
}

export function useUpdate(endpoint) {

        const {id} = useParams()
        const queryClient = useQueryClient();

        const update = async(data) => {
            try {

                const response = await toast.promise( apiClient.patch(`${endpoint}/${id}`, data), {
                    pending: 'Updating...',
                    success: 'Successfully updated',
                 
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
                queryClient.setQueryData([endpoint,data._id], (oldData) => ({...oldData, ...data}));
            },
            onError: (error) => {
                console.error(error);
                toast.error(`Edit failed because: ${error.message}`);
            },
            onSettled: () => {
                queryClient.invalidateQueries({queryKey: [endpoint],exact: true});
            }

        });
}
    
export function useDelete(endpoint) {
    
        const queryClient = useQueryClient();
    
        const remove = async(id) => {
            try {
                const response = await toast.promise( apiClient.delete(`${endpoint}/${id}`), {
                    pending: 'Deleting...',
                    success: 'Successfully deleted',
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
            mutationFn: remove,
            onSuccess: () => {
                queryClient.invalidateQueries();
            },
            onError: (error) => {
                console.error(error);
                toast.error(`Deletion failed because: ${error.message}`);
            }
        });
}