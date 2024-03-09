import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Student from './Student';
import { getAll, remove } from '../api/programsAPI';
import { Link } from 'react-router-dom';


export  default  function  StudentsList () {

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

    function studentsList() {

        if (students.length === 0) {
            return <tr><td colSpan="4">No students found</td></tr>;

        }

        return students.map((student) => {
            return (
                <Student
                    student={student}
                    deleteStudent={deleteStudent}
                    key={student._id}
                />
            );
        });
    }

    if (isLoading || isPending || students === undefined) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <div className="py-2 mx-auto flex items-center justify-between flex-wrap p-6">
          <h3 className="text-lg font-semibold p-4">Students</h3>
          <button  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded justify-end">
          <Link
                to="/students/create"
                className= "hover:text-pink-500"
              >
                Add a New Student
          </Link>
              </button>
  </div>
          <div className="border rounded-lg overflow-hidden">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&amp;_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                      First Name
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                        Last Name
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                        Phone
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="[&amp;_tr:last-child]:border-0">
                  {studentsList()}
                </tbody>
              </table>
            </div>
          </div>
        </>
      );



}