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
        queryFn: getAll,
        select: (data) => data.sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
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

        const {id} = useParams()
        const queryClient = useQueryClient();

        const update = async(data) => {
            try {
                
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
            onSuccess: (data) => {
                queryClient.setQueryData([endpoint, id], data);
                queryClient.invalidateQueries([endpoint, id]);
                queryClient.invalidateQueries([endpoint],{exact: true});
               // queryClient.invalidateQueries([endpoint],{exact: true});
            },
            onError: (error) => {
                console.error(error);
            }
        });
    }

    export function useUpdateGrade(grade_id) {

        const {course_id} = useParams()
        const queryClient = useQueryClient();

        const update = async(data) => {
            try {
                const response = await fetch(`${baseUrl}grades/${data.grade_id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({"grade" : data.new_score}),
                });
                const responseData = await response.json();
                return responseData;
            } catch (error) {
                console.error(error);
            }
        }
    
        return useMutation({
            mutationFn: update,
            onSuccess: (data) => {
                queryClient.invalidateQueries(["courses",course_id],{exact: true});
            },
            onError: (error) => {
                console.error(error);
            }
        });
    }



export function useAddStudentToProgram() {

    const {id} = useParams();
    const queryClient = useQueryClient();

    const addStudentToProgram = async(data) => {
        try {
            const response = await fetch(`${baseUrl}programs/addStudentToProgram/${id}`, {
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
        mutationFn: addStudentToProgram,
        onSuccess: (data) => {
            queryClient.setQueryData(["programs", id], data);
           // queryClient.invalidateQueries([endpoint],{exact: true});
            queryClient.invalidateQueries(["programs", id]);
            queryClient.invalidateQueries(["students"]);
        },
        onError: (error) => {
            console.error(error);
        }
    });
}

export function useAddCourseToProgram() {

    const {id} = useParams();
    const queryClient = useQueryClient();

    const addCourseToProgram = async(data) => {
        try {
            console.log("URL:",`${baseUrl}programs/addCourseToProgram/${id}`,"\nDATA:",data);
            const response = await fetch(`${baseUrl}programs/addCourseToProgram/${id}`, {
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
        mutationFn: addCourseToProgram,
        onSuccess: (data) => {
            queryClient.setQueryData(["programs", id], data);
            // SETTING THE COURSE DATA IN THE QUERY CACHE
            queryClient.setQueryData(["courses", data.courses.at(-1)._id], data.courses.at(-1));
            // INVALIDATING THE COURSES QUERY
            queryClient.invalidateQueries(["courses", data.courses.at(-1)._id]);
          // queryClient.invalidateQueries([endpoint],{exact: true});
            queryClient.invalidateQueries(["programs", id]);
        },
        onError: (error) => {
            console.error(error);
        }
    });

}

export function useAddStudentsToProgram (){

    const {id} = useParams();
    const queryClient = useQueryClient();

    const addStudentsToProgram = async(data) => {
        try {
            const response = await fetch(`${baseUrl}programs/addStudentsToProgram/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:  JSON.stringify(data)
            });
            const responseData = await response.json();
            return responseData;
        } catch (error) {
            console.error(error);
        }
    }

    return useMutation({
        mutationFn: addStudentsToProgram,
        onSuccess: (data) => {
            queryClient.setQueryData(["programs", id], data);
           // queryClient.invalidateQueries([endpoint],{exact: true});
            queryClient.invalidateQueries(["programs", id]);
        },
        onError: (error) => {
            console.error(error);
        }
    });

}

export function useRemoveStudentFromProgram() {
    
        const {id} = useParams();
        const queryClient = useQueryClient();
    
        const removeStudentFromProgram = async(data) => {
            try {
                const response = await fetch(`${baseUrl}programs/removeStudentFromProgram/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body:  JSON.stringify({"studentId" : data})
                });
                const responseData = await response.json();
                return responseData;
            } catch (error) {
                console.error(error);
            }
        }
    
        return useMutation({
            mutationFn: removeStudentFromProgram,
            onSuccess: (data) => {
                queryClient.setQueryData(["programs", id], data);
            // queryClient.invalidateQueries([endpoint],{exact: true});
                queryClient.invalidateQueries(["programs", id]);
            },
            onError: (error) => {
                console.error(error);
            }
        });
}

export function useRemovoTeacherFromCourse() {
        
            const {id} = useParams();
            const queryClient = useQueryClient();
        
            const removeTeacherFromCourse = async() => {
                try {
                    const response = await fetch(`${baseUrl}courses/removeTeacherFromCourse/${id}`, {
                        method: 'PATCH',
                    });
                    const responseData = await response.json();
                    return responseData;
                } catch (error) {
                    console.error(error);
                }
            }
        
            return useMutation({
                mutationFn: removeTeacherFromCourse,
                onSuccess: (data) => {
                    queryClient.setQueryData(["courses", id], data);

                // queryClient.invalidateQueries([endpoint],{exact: true});
                    queryClient.invalidateQueries(["courses", id]);
                    queryClient.invalidateQueries(["teachers"]);
                },
                onError: (error) => {
                    console.error(error);
                }
            });
}

export function useRemoveCourseFromTeacher() {
        
            const {id} = useParams();
            const queryClient = useQueryClient();
        
            const removeCourseFromTeacher = async(data) => {
                try {
                    const response = await fetch(`${baseUrl}teachers/removeCourseFromTeacher/${id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body:  JSON.stringify({"courseId" : data})
                    });
                    const responseData = await response.json();
                    return responseData;
                } catch (error) {
                    console.error(error);
                }
            }
        
            return useMutation({
                mutationFn: removeCourseFromTeacher,
                onSuccess: (data) => {
                    queryClient.setQueryData(["teachers", id], data);
                // queryClient.invalidateQueries([endpoint],{exact: true});
                    queryClient.invalidateQueries(["teachers", id]);
                },
                onError: (error) => {
                    console.error(error);
                }
            });
    
}

export function useDelete(endpoint) {
    
        const queryClient = useQueryClient();
    
        const remove = async(id) => {
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

export function useAddTeacherToCourse() {

    const {id} = useParams();
    const queryClient = useQueryClient();

    const addTeacherToCourse = async(data) => {
        try {
            const response = await fetch(`${baseUrl}courses/addTeacherToCourse/${id}`, {
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
        mutationFn: addTeacherToCourse,
        onSuccess: (data) => {
            queryClient.setQueryData(["courses", id], data);
           // queryClient.invalidateQueries([endpoint],{exact: true});
            queryClient.invalidateQueries(["courses", id]);
        },
        onError: (error) => {
            console.error(error);
        }
    });
}


