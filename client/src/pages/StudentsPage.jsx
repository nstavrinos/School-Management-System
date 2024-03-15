import React from 'react';
import { useGetAll, useDelete } from '../api/sharedAPI';
import StudentsList from '../components/StudentsList';


export default function StudentsPage() {

    const {data: students, isLoading, error} = useGetAll("students");
    const {mutate: deleteFun, isPending} = useDelete("students");

    if (isLoading || isPending || students === undefined) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>An error has occurred: {error.message}</div>;
    }
    return (
        <div className='px-5'>
        <StudentsList students={students} headerInfo="Students" buttonLink={"/students/create"} deleteFun={deleteFun} />
        </div>
    );
    }