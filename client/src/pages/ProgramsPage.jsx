import React from 'react';
import {createPortal } from 'react-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import  Modal  from '../modals/Modal';
import EditPage from './EditPage';
import { Link } from 'react-router-dom';

// const fetchPrograms = async () => {
//     // Fetch programms data from your API
//     const response = await fetch('http://localhost:5000/programs');
//     const data = await response.json();
//     console.log(data);
//     return data;
// };

// const deleteProgram = async (programId) => {
//     // Send delete request to your API
//     const response = await fetch(`http://localhost:5000/programs/${programId}`, {
//         method: 'DELETE',
//     });
//     const data = await response.json();
//     console.log(data.message);
//     return data;
// };

function ProgramsPage () {

    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const [program , setProgram] = useState({});

    const { data, isLoading, error } = useQuery({
         queryKey: ["programs"],
         queryFn: async () => {
            // Fetch programms data from your API
            const response = await fetch('http://localhost:5000/programs');
            const data = await response.json();
            return data;
        }   
    });

    const {mutateAsync, isPending} = useMutation({
        mutationFn: async (programId) => {
           
        const response = await fetch(`http://localhost:5000/programs/${programId}`, {
            method: 'DELETE',
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        return await response.json();
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["programs"]);
        },
        onError: (error) => {
            console.error(error);
        }
    });
    
    const handleDelete = async (programId) => {
       
        try {
           const response = await mutateAsync(programId);
           console.log(response.message);
        } catch (error) {   
            console.error(error);
        }
    };

    if (isLoading || isPending) {    
        return <div>Loading...</div>;
    }

    if (error ) {
        return <div>An error has occurred: {error.message}</div>;
    }

    return (
        <>
        {isOpen && createPortal(<Modal setIsOpen={setIsOpen}><EditPage  setIsOpen={setIsOpen} program={program}/></Modal>, document.body)}  

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {data.map((program) => (
                    <div key={program._id} className="p-4 mt-4 ml-4 bg-white shadow" >
                        <Link to={`/programs/${program._id}`} className="text-xl font-bold text-indigo-900">{program.program_name}</Link>
                        <p className="text-gray-700 mt-2">"Started on :" {program.begin.slice(0,10)}</p>
                        <p className="text-gray-700 mt-2">"Ended on   :" {program.end.slice(0,10)}</p>

                        <div className="flex justify-between mt-4">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => {
                                    setProgram(program);
                                    setIsOpen(true)}}>
                                Edit
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => handleDelete(program._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default ProgramsPage;