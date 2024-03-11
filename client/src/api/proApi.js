import { useParams} from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

const baseUrl = 'http://localhost:5000/';


export function useGetAll(endpoint) {

     const getAll= async() =>{
        // Fetch programms data from your API
        try {
            const response = await fetch(`${baseUrl}${endpoint}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }

    return useQuery({
        queryKey: [endpoint],
        queryFn: getAll
    });
}


export function useGetById(endpoint) {

    const {id} = useParams();

    const getById = async() => {
        try {
            const response = await fetch(`${baseUrl}${endpoint}/${id}`);

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error);
            }

            const data = await response.json();

            return data;
        } catch (error) {
            console.error(error);
        }
    }   

    return useQuery({
        queryKey: [endpoint, id],
        enabled: !!id,
        queryFn: getById,
    });
}

export function useCreate(endpoint) {

    const queryClient = useQueryClient();

    const create = async(data) => {
        try {
            const response = await fetch(`${baseUrl}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const responseData = await response.json();

            return responseData;
        } catch (error) {
            console.error(error);
        }
    }

    return useMutation({
        mutationFn: create,
        onSuccess: (data) => {
            queryClient.setQueryData([endpoint,data._id], data);
            queryClient.invalidateQueries([endpoint],{exact: true});
        },
        onError: (error) => {
            console.error(error);
        }
    });
}

export function useUpdate(endpoint) {

        const {id} = useParams();
        const queryClient = useQueryClient();

        const update = async(data) => {
            try {
                console.log("URL:",`${baseUrl}${endpoint}/${id}`,"\nDATA:",data);
                const response = await fetch(`${baseUrl}${endpoint}/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                const responseData = await response.json();
                return responseData;
            } catch (error) {
                console.error(error);
            }
        }
    
        return useMutation({
            mutationFn: update,
            onSuccess: () => {
                queryClient.invalidateQueries([endpoint, id]);
            },
            onError: (error) => {
                console.error(error);
            }
        });
    }

export function useCreateStudentUpdateProgram(endpoint) {}


export function useDelete(endpoint) {
    
        const {id} = useParams();
        const queryClient = useQueryClient();
    
        const remove = async() => {
            try {
                const response = await fetch(`${baseUrl}${endpoint}/${id}`, {
                    method: 'DELETE',
                });
                const responseData = await response.json();
                return responseData;
            } catch (error) {
                console.error(error);
            }
        }
    
        return useMutation({
            mutationFn: remove,
            onSuccess: () => {
                queryClient.invalidateQueries([endpoint]);
            },
            onError: (error) => {
                console.error(error);
            }
        });
    }
