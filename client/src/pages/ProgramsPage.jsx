import React from 'react';
import ProgramsList from '../components/ProgramsList2';
import { useGetAll, useDelete } from '../api/sharedAPI';


function ProgramsPage () {

    const { data: programs, isLoading, error } = useGetAll("programs");
    const {mutate: deleteFun, isPending} = useDelete("programs");

    if (isLoading || isPending || programs === undefined) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>An error has occurred: {error.message}</div>;
    }

    return (
        <ProgramsList programs={programs} headerInfo="Programs" buttonLink={"/programs/create"} deleteFun={deleteFun} />
    );
};

export default ProgramsPage;