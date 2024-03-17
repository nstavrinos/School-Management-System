import React ,{useMemo, useState}from 'react';
import Teacher from './Teacher';
import { Link } from 'react-router-dom';

export default function TeachersList({teachers, headerInfo, buttonLink, deleteFun}) {

    const [query, setQuery] = useState('');
    
    const filterTeachers = useMemo(() => {
        return teachers?.filter((teacher) => {
            return teacher.first_name.toLowerCase().includes(query.toLowerCase()) 
                || teacher.last_name.toLowerCase().includes(query.toLowerCase()) 
                || teacher.phone.toLowerCase().includes(query.toLowerCase());
        });
        }, [query, teachers]);
    
     // This method will map out the records on the table
        function teachersList() {
    
            if (filterTeachers?.length === 0) {
                return <tr><td colSpan="4">No teachers found</td></tr>;
    
            }

        return filterTeachers?.map((teacher) => {
            return (
                <Teacher
                teacher={teacher}
                deleteFun={deleteFun}
                key={teacher._id}
                />
            );
        }
        );
    }

    // This following section will display the table with the records of individuals.
    return (
        <div className="px-5 ">
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
                Add a New Teacher
            </Link>
            </button>
        </div>
        <div className="border rounded-lg max-h-full overflow-y-auto">
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
                    Number of Courses
                  </th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="[&amp;_tr:last-child]:border-0">
                {teachersList()}
              </tbody>
            </table>
          </div>
        </div>
        </div>
    );
}