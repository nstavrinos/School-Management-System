import React from 'react';
import { useGetAll, useDelete } from '../api/sharedAPI';
import StudentsList from '../components/Students/StudentsList';

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
        <StudentsList students={students} headerInfo="Students" tableMaxHeight="630" modalInfo="Create Student" deleteFun={deleteFun} />
    );
    }