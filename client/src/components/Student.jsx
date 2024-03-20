import {useGetById} from '../api/sharedAPI';

export default function Student() {

    const getStudent= useGetById("students");



  return (
    <div className="px-8 py-4 max-w-screen-lg">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">Student Information</h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Personal details and application.</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{getStudent.data?.first_name + " " + getStudent.data?.last_name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Phone</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"> {getStudent.data?.phone} </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Email address</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0"> {getStudent.data?.email}  </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Age </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{getStudent.data?.age} </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Programs</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                
              {getStudent.data?.programs.map((program) => {
                return( 
                    <li key={program._id} className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                        <div className="flex w-0 flex-1 items-center">
                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                            <span className="truncate font-medium">{program.program_name}</span>
                            <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                            </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Download
                            </a>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            DELETE
                            </a>
                        </div>
                    </li>
                )})}
              </ul>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Grades</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200 max-h-56 overflow-y-auto ">
                
              {getStudent.data?.grades.map((grade) => {
                return( 
                    <li key={grade._id} className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                        <div className="flex w-0 flex-1 items-center">
                            <div className="ml-4 flex min-w-0 flex-1 gap-2">
                            <span className="truncate font-medium">{grade.course?.course_name}</span>
                            <span className="flex-shrink-0 text-gray-400">{grade.grade}</span>
                            </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Download
                            </a>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                            DELETE
                            </a>
                        </div>
                    </li>
                )})}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}