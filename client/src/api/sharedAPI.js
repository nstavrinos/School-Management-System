import { useParams} from "react-router-dom";
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axios from 'axios';

const baseUrl = 'http://localhost:5000/';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api/',
});

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

// This function is used to update the grade of a student
export function useUpdateGrade() {

        const {course_id} = useParams()
        const queryClient = useQueryClient();

        const update = async(data) => {
            try {
                const response = await toast.promise( apiClient.patch(`grades/${data.grade_id}`, data.new_score), {
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
            onError: (error) => {
                console.error(error);
                toast.error(`Edit failed because: ${error.message}`);
            },
            onSettled: () => {
                queryClient.invalidateQueries({queryKey: ["courses",course_id],exact: true});
            }
        });
    }



export function useAddStudentToProgram() {

    const {id} = useParams();
    const queryClient = useQueryClient();

    const addStudentToProgram = async(data) => {
        try {
            const response = await toast.promise( apiClient.patch(`programs/addStudentToProgram/${id}`, data), {
                pending: 'Adding Student...',
                success: 'Successfully added student',
            });
            return response.data;
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
            // setting the program data in the query cache 
            queryClient.setQueryData(["programs", id], (oldData) => ({...oldData, ...data}));
            // setting the course data in the query cache with the last course in the array which is the newly added course
            queryClient.setQueryData(["courses", data.courses.at(-1)._id], data.courses.at(-1));
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
                const response = await toast.promise( apiClient.patch(`programs/removeStudentFromProgram/${id}`, data), {
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
            onSuccess: (data) => {
                queryClient.setQueryData(["programs", id], (oldData) => ({...oldData, ...data}));
            },
            onError: (error) => {
                console.error(error);
                toast.error(`Removal failed because: ${error.message}`);
            }
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
            onSuccess: (data) => {
                data.teacher && queryClient.invalidateQueries({queryKey: ["teachers",data.teacher._id],exact: true});
                data.program && queryClient.invalidateQueries({queryKey: ["programs",data.program._id],exact: true});

                queryClient.setQueryData([endpoint], (oldData) => oldData.filter((olddata) => olddata._id !== data._id));
                queryClient.invalidateQueries({queryKey: [endpoint],exact: true});
            },
            onError: (error) => {
                console.error(error);
                toast.error(`Deletion failed because: ${error.message}`);
            }
        });
}

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


