import React, { useMemo, useState } from 'react';
import Student from './Student';
import { Link } from 'react-router-dom';


export  default  function  StudentsList ({students, headerInfo , buttonLink, deleteFun}) {

  const [query, setQuery] = useState('');
  

  const filteredStudents = useMemo( () => {
    return students?.filter(student => {
      return student.first_name.toLowerCase().includes(query.toLowerCase()) 
             || student.last_name.toLowerCase().includes(query.toLowerCase()) 
             || student.phone.toLowerCase().includes(query.toLowerCase())
    })
  }, [query, students])

    function studentsList() {

        if (filteredStudents?.length === 0) {
            return <tr><td colSpan="4">No students found</td></tr>;

        }

        return filteredStudents?.map((student) => {
            return (
                <Student
                    key={student._id}
                    student={student}
                    deleteFun={deleteFun}
                    
                />
            );
        });
    }

    return (
        <>
        <div className="py-2 mx-auto flex items-center justify-between flex-wrap p-6">
          <h3 className="text-lg font-semibold p-4">{headerInfo}</h3>

          <div>
            <input
                type="text"
                value={query}
                placeholder="Search..."
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-700"
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>

          <button  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded justify-end">
          <Link
                to={buttonLink}
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
                      Check
                    </th>
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