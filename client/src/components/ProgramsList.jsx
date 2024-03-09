import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Program from './Program';
import { getAll, remove } from '../api/programsAPI';
import { Link } from 'react-router-dom';

export default function ProgramsList() {
  
    const queryClient = useQueryClient();

// This method fetches the programs from the database and stores them in the programs variable.
    const { data: programs, isLoading, error } = useQuery({
         queryKey: ["programs"],
         queryFn: () =>  getAll("programs")
    });
  
    // This method will delete a program from the database and will trigger an update  for the programs list.

    const {mutateAsync, isPending} = useMutation({
        mutationFn: (programId) =>  remove("programs", programId),
        onSuccess: () => {
            queryClient.invalidateQueries(["programs"]);
        },
        onError: (error) => {
            console.error(error);
        }
    });

    async function deleteProgram(programId) {
        try {
            const response = await mutateAsync(programId);
            console.log(response.message);
         } catch (error) {   
             console.error(error);
         }
      }
  
   // This method will map out the records on the table
    function programsList() {

        if (programs.length === 0) {
            return <tr><td colSpan="4">No programs found</td></tr>;

        }


      return programs.map((program) => {
        return (
          <Program
            program={program}
            deleteProgram={deleteProgram}
            key={program._id}
          />
        );
      });
    }

    if (isLoading || isPending || programs === undefined) {    
        return <div>Loading...</div>;
    }

    if (error ) {
        return <div>An error has occurred: {error.message}</div>;
    }
  
    // This following section will display the table with the records of individuals.
    return (
      <>
      <div className="py-2 mx-auto flex items-center justify-between flex-wrap p-6">
        <h3 className="text-lg font-semibold p-4">School Programs</h3>
        <button  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded justify-end">
        <Link
              to="/programs/create"
              className= "hover:text-pink-500"
            >
              Create
        </Link>
            </button>
</div>
        <div className="border rounded-lg overflow-hidden">
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&amp;_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                    Name of the program
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                    Start Date
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                    End Date
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="[&amp;_tr:last-child]:border-0">
                {programsList()}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }