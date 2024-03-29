import React from 'react';
import { useGetAll, useDelete } from '../api/sharedAPI';
import CoursesList from '../components/Courses/CoursesList';


export default function StudentsPage() {

    const {data: courses, isLoading, error} = useGetAll("courses");
    const {mutate: deleteFun, isPending} = useDelete("courses");

    if (isLoading || isPending || courses === undefined) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>An error has occurred: {error.message}</div>;
    }
    
    return (
        <CoursesList courses={courses} headerInfo="Courses" enableAddCourse={false} tableMaxHeight="630" buttonInfo='Delete' deleteFun={deleteFun}/>
    );
    }