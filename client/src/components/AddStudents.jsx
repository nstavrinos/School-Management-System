import React, { useMemo, useState } from 'react';
import { useGetAll,useGetById,useAddStudentsToProgram } from '../api/sharedAPI';
import { useNavigate,  Link } from 'react-router-dom';

export  default  function  AddStudents () {

    const [query, setQuery] = useState('');
    const [selectedStudents, setSelectedStudents] = useState([]);
    const navigateTo = useNavigate();

    const {data: students, isLoading, error} = useGetAll("students");
    const {data: program} = useGetById("programs");

    const addStudentsToProgram = useAddStudentsToProgram();

    const onCheckboxChange = (e) => {
        if (e.target.checked) {
            setSelectedStudents((prev)=>[...prev, e.target.value]);
        } else {
            setSelectedStudents((prev)=>prev.filter((id) => id !== e.target.value));
        }
    };

    const onClickAdd = async() => {
        addStudentsToProgram.mutate(selectedStudents);
        navigateTo(-1);
    };

  const studentsInProgram = useMemo(() =>{ return program?.students.map(student => student._id)}, [program]);

  // filter students based on search query and students already in the program
  const filteredStudents = useMemo( () => {
    return students?.filter(student => {
      return (student.first_name.toLowerCase().includes(query.toLowerCase()) 
             || student.last_name.toLowerCase().includes(query.toLowerCase()) 
             || student.phone.toLowerCase().includes(query.toLowerCase()))
             && !studentsInProgram.includes(student._id)
    });
  }, [query, students, studentsInProgram])


    if (isLoading ||  students === undefined) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>An error has occurred: {error.message}</div>;
    }

    return (
        <div className="px-5">
        <div className="py-2 mx-auto flex items-center justify-between flex-wrap p-6">
        <h3 className="text-lg font-semibold p-4">Selected students to add to the program: <strong>{selectedStudents.length}</strong></h3>

          <div>
            <input
                type="text"
                value={query}
                placeholder="Search..."
                className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-700"
                onChange={(e) => setQuery(e.target.value)}
            />
        </div>
          <button  
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded justify-end"
                    onClick={onClickAdd}
                    disabled={selectedStudents.length === 0}
            >
                Add Selected Students
         </button>
         <button  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded justify-end">
          <Link
                to={"/students/create"}
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
                      Add
                    </th>
                  </tr>
                </thead>
                <tbody className="[&amp;_tr:last-child]:border-0">
                  {filteredStudents?.length === 0 ? <tr><td colSpan="4">No students found</td></tr>
                  : filteredStudents?.map((student) => {
                        return (
                            <tr key={student._id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                    {student.first_name}
                                </td>
                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                    {student.last_name}
                                </td>
                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                   <input type="checkbox" onChange={onCheckboxChange} value={student._id} checked={selectedStudents.includes(student._id)}/>
                                </td>
                            </tr>
                        );})
                    }
                </tbody>
              </table>
            </div>
          </div>
        </div >
      );



}