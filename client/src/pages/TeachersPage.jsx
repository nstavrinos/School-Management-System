import React from 'react';
import TeachersList from '../components/Teachers/TeachersList';
import { useGetAll, useDelete } from '../api/sharedAPI';

export default function TeachersPage () {

    const { data: teachers, isLoading, error } = useGetAll("teachers");
    const {mutate: deleteFun, isPending} = useDelete("teachers");

    if (isLoading || isPending || teachers === undefined) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>An error has occurred: {error.message}</div>;
    }

    return (
        <TeachersList teachers={teachers} headerInfo="Teachers" modalInfo="Create Teacher"  tableMaxHeight="630" deleteFun={deleteFun} />
    );
};

