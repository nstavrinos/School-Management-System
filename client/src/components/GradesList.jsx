import React, { useMemo, useState } from 'react';
import { useUpdateGrade } from '../api/sharedAPI';

export  default  function  GradesList ({grades, mode}) {

    const [query, setQuery] = useState('');
    const [editGrade, setEditGrade] = useState({grade_id: '', value: 0,edit: false});
    const headerInfo = (mode === "student" ) ? "List of grades for the student" : "List of grades for the course" ;
    const updateGrade = useUpdateGrade();

    const filteredGradesByStudentName = useMemo( () => {
        return grades?.filter(grade => {
            return grade.student?.first_name?.toLowerCase().includes(query.toLowerCase()) 
                || grade.student?.last_name?.toLowerCase().includes(query.toLowerCase()) 
                || grade.grade.toString().includes(query.toLowerCase())
                || grade.course?.course_name?.toLowerCase().includes(query.toLowerCase())
                || grade.course?.teacher?.first_name?.toLowerCase().includes(query.toLowerCase())
                || grade.course?.teacher?.last_name?.toLowerCase().includes(query.toLowerCase());
        })
    }, [query, grades]);

    const saveGrade = async () => {
        
        updateGrade.mutate({grade_id: editGrade.grade_id,new_score: editGrade.value});
        setEditGrade({...editGrade,edit: false});
        
    }

    return (
        <div className="px-5">
            <div className="py-2 mx-auto flex items-center justify-between flex-wrap p-6">
                <h3 className="text-lg font-semibold p-4">{headerInfo}</h3>
                <div>
                    <input
                        type="search"
                        value={query}
                        placeholder="Search..."
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-700"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>
            </div>
            <div className="border rounded-lg overflow-hidden">
                <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                    <thead className="[&amp;_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                            {mode!=="student" ?"First Name" : "Course"}
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                            {mode!=="student" ?"Last Name" : "Teacher"}
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                            Grade
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody className="[&amp;_tr:last-child]:border-0">
                    { filteredGradesByStudentName.length ===0 ? <tr><td colSpan="4">No Grades found</td></tr> : filteredGradesByStudentName.map((grade) => {
                        return (
                            <tr key={grade._id}  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                     {mode!=="student" ? grade.student.first_name : grade.course.course_name}
                                </td>
                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                    {mode!=="student" ? grade.student.last_name : grade.course.teacher.first_name + " " + grade.course.teacher.last_name}
                                </td>
                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                { (editGrade.edit && editGrade.grade_id == grade._id ) ?  
                                <input type="number" 
                                value={editGrade.value} 
                                onChange={(e) => setEditGrade({ ...editGrade , value : e.target.value}) }/> 
                                : grade.grade}
                                </td>
                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                    <div className="flex gap-2">
                        { (editGrade.edit && editGrade.grade_id == grade._id )  ?  <button
                                            onClick={saveGrade}
                                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
                                        >
                                            Save
                                        </button>
                                    :   <button
                                            onClick={() =>{console.log("ddd",editGrade), setEditGrade({grade_id: grade._id,value: grade.grade ,edit: true})}}
                                            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
                                        >
                                            Edit
                                        </button>}
                                    </div>
                                </td>
                            </tr>
                        );})}
                    </tbody>
                </table>
                </div>
            </div>
        </div >
      );

}