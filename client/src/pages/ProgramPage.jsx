import React from 'react';
import {createPortal} from 'react-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import  Modal  from '../modals/Modal';
import EditPage from './EditPage';

const ProgramPage = (program) => {
    
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
        <div className="flex flex-col items-center">
            {/* Display program information here */}
            <h1 className="text-2xl font-bold mb-4">Program Page</h1>
            <>
        {isOpen && createPortal(<Modal setIsOpen={setIsOpen}><EditPage  setIsOpen={setIsOpen} program={program}/></Modal>, document.body)} </>
            <div key={program._id} className="p-4 bg-white shadow">
                        <h2 className="text-xl font-bold text-indigo-900">{program.program_name}</h2>
                        <p className="text-gray-700 mt-2">"Started on :" {program.begin.slice(0,10)}</p>
                        <p className="text-gray-700 mt-2">"Ended on   :" {program.end.slice(0,10)}</p>

                        <div className="flex justify-between mt-4">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                onClick={() => {
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
        </div>
    );
};

export default ProgramPage;