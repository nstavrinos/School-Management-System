import {useGetById, useUpdate, useRemovoTeacherFromCourse} from '../api/sharedAPI';
import { useNavigate, Link} from 'react-router-dom';
import NotFoundPage from '../pages/NotFoundPage';
import CourseForm from "./CourseForm";
import GradesList from './GradesList';

export default function EditCourse() {
    const navigateTo = useNavigate();

    const getCourse= useGetById("courses");
    const updateCourse = useUpdate("courses");
    const removeTeacher = useRemovoTeacherFromCourse();

    const onSubmit = async (data) => {
        updateCourse.mutate(data);
        navigateTo(-1);
    };

    const teacherRemoveFun = async () => {
        removeTeacher.mutate();
    }

    if(getCourse.isError || updateCourse.isError){
    return <NotFoundPage/>
    }

    if(getCourse.isLoading){
        return <p>Loading...</p>
    }

    return (
        <>
            <h3 className="text-lg font-semibold p-4">"EDIT Course"</h3>
            {getCourse?.data && <CourseForm course={getCourse.data} submitText="Edit" submitAction={onSubmit} />}   
            <div className="px-5 ">
        <div className="py-2 mx-auto flex items-center justify-between flex-wrap p-6">
            <h3 className="text-lg font-semibold p-4">The Teacher of the course</h3>
            { !(getCourse?.data?.teacher)  && 
            <button  className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded justify-end">
            <Link
                to={`/programs/addTeacherToCourse/${getCourse?.data?._id}`}
                className= "hover:text-pink-500"
            >
                Add Teacher
            </Link>
            </button>}
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="[&amp;_tr:last-child]:border-0">
              {getCourse?.data?.teacher ?
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
        {getCourse?.data?.teacher.first_name}
      </td>
      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
        {getCourse?.data?.teacher.last_name}
      </td>
      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
        {getCourse?.data?.teacher.phone}
      </td>
      <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
        <div className="flex gap-2">
          <Link
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
            to={`/teachers/${getCourse?.data?.teacher._id}`}
          >
            Edit
          </Link>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
            color="red"
            type="button"
            onClick={teacherRemoveFun}
          >
            Remove
          </button>
        </div>
      </td>
    </tr> : <tr><td colSpan="4">No Teacher found</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
        </div>
        <GradesList grades={getCourse?.data?.grades} headerInfo={"The Grades of the Students"}/>

        </>

    );
}