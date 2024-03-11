import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAll, remove } from '../api/programsAPI';
import StudentsList from '../components/StudentsList';


export default function StudentsPage() {

    const queryClient = useQueryClient();

    const { data: students, isLoading, error } = useQuery({
        queryKey: ["students"],
        queryFn: () =>  getAll("students")
    });

    const {mutateAsync, isPending} = useMutation({
        mutationFn: (studentId) =>  remove("students", studentId),
        onSuccess: () => {
            queryClient.invalidateQueries(["students"]);
        },
        onError: (error) => {
            console.error(error);
        }
    });

    async function deleteStudent(studentId) {
        try {
            const response = await mutateAsync(studentId);
            console.log(response.message);
        } catch (error) {
            console.error(error);
        }
    }


    if (isLoading || isPending || students === undefined) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>An error has occurred: {error.message}</div>;
    }

    return(

        <StudentsList students={students} headerInfo="Students"  buttonLink={"/students/create"} deleteFun={deleteStudent}/>
    )
}