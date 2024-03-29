import React from 'react';
import ProgramsList from '../components/Programs/ProgramsList';
import { useGetAll, useDelete } from '../api/sharedAPI';
import NotFoundPage from './NotFoundPage';
import { Loader } from '@mantine/core';

function ProgramsPage () {

    const { data: programs, isLoading, error } = useGetAll("programs");
    const {mutate: deleteFun, isPending} = useDelete("programs");

    if (error) {
        return <NotFoundPage />
    }

    if (isLoading || isPending || programs === undefined) {
        return (<div className="flex justify-center items-center h-screen">
                    <Loader size={50} />
                </div>);
    }

    return (
        <ProgramsList programs={programs} headerInfo="Programs" tableMaxHeight="630" enableAddCourse={true} buttonInfo="Delete" deleteFun={deleteFun} />
    );
};

export default ProgramsPage;