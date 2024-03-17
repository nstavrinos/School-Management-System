//copy client/src/components/AddStudent.jsx and modify it to create AddTeacher.jsx
//modify the code to use the correct variables and functions
//modify the table to display the teacher data
//modify the checkbox to display the teacher data
//modify the button to add a new teacher
 
// Path: client/src/components/AddTeacher.jsx
import { useState,useMemo  } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGetAll,useAddTeacherToCourse } from '../api/sharedAPI';
import NotFoundPage from '../pages/NotFoundPage';

export default function AddTeacher() {
    const [query, setQuery] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const navigateTo = useNavigate();

    const { data: teachers, isLoading, error } = useGetAll("teachers");
    const addTeacherToCourse = useAddTeacherToCourse();

    const onCheckboxChange = (e) => {
        
        if (e.target.checked) {
            setSelectedTeacher(e.target.value);
        } else {
            setSelectedTeacher('');
        }
        
    };

    const onClickAdd = async () => {
        addTeacherToCourse.mutate({"teacherId": selectedTeacher});
        navigateTo(-1);
    };

    const filteredTeachers = useMemo( () => {
        return teachers?.filter(teacher => {
                return (teacher.first_name.toLowerCase().includes(query.toLowerCase())
                    || teacher.last_name.toLowerCase().includes(query.toLowerCase())
                    || teacher.phone.toLowerCase().includes(query.toLowerCase()))
        });
    }, [query, teachers]);

    if (isLoading || teachers === undefined) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <NotFoundPage />
    }

    return (
        <div className="px-5">
            <div className="py-2 mx-auto flex items-center justify-between flex-wrap p-6">
                <h3 className="text-lg font-semibold p-4">Selected teacher <strong>{selectedTeacher}</strong> for the course</h3>

                <div>
                    <input
                        type="text"
                        value={query}
                        placeholder="Search..."
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-700"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
                <div>
                    <button
                        onClick={onClickAdd}
                        disabled={selectedTeacher === ''}
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Add Selected Teacher
                    </button>
                </div>
                <div>
                    <button  
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded justify-end">
                        <Link
                            to={"/teachers/create"}
                            className= "hover:text-pink-500"
                        >
                            Add a New Teacher
                        </Link>
                    </button>
                </div>
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
                  {filteredTeachers?.length === 0 ? <tr><td colSpan="4">No Teachers found</td></tr>
                  : filteredTeachers?.map((teacher) => {
                        return (
                            <tr key={teacher._id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                    {teacher.first_name}
                                </td>
                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                    {teacher.last_name}
                                </td>
                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                   <input type="checkbox" onChange={onCheckboxChange} value={teacher._id} checked={selectedTeacher === teacher._id}/>
                                </td>
                            </tr>
                        );})
                    }
                </tbody>
              </table>
            </div>
          </div>
        </div>
    );
}