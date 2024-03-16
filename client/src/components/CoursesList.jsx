import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Course from './Course';


export  default  function  CoursesList ({courses, headerInfo , buttonLink, deleteFun}) {

  const [query, setQuery] = useState('');
  

  const filteredCourses = useMemo( () => {
      return courses?.filter(course => {
        return course.course_name?.toLowerCase().includes(query.toLowerCase()) 
              || course.duration?.toLowerCase().includes(query.toLowerCase()) 
      })
  }, [query, courses])

    function coursesList() {

        if (filteredCourses?.length === 0) {
            return <tr><td colSpan="4">No Courses Found</td></tr>;

        }

        return filteredCourses?.map((course) => {
            return (
                <Course
                    key={course._id}
                    course={course}
                    deleteFun={deleteFun}
                    
                />
            );
        });
    }

    return (
        <div className="px-5">
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

          {buttonLink !== '' && <button  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded justify-end">
          <Link
                to={buttonLink}
                className= "hover:text-pink-500"
              >
                Add a New Course
          </Link>
              </button>}
  </div>
          <div className="border rounded-lg overflow-hidden">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&amp;_tr]:border-b">
                  <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                      Course Name
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                        Duration
                    </th>
                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="[&amp;_tr:last-child]:border-0">
                  {coursesList()}
                </tbody>
              </table>
            </div>
          </div>
        </div >
      );



}