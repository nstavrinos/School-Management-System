import { useParams, useNavigate } from "react-router-dom";
import {  useForm } from 'react-hook-form'; 
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import {  update, create, getById } from '../api/programsAPI';
import { useEffect,useState } from "react";

export default function CreateProgram() {
  // const {register,handleSubmit,setValue,setError,formState: { errors, isSubmitting },} = useForm(  {defaultValues: {
  //       program_name: "",
  //       begin:  new Date().toISOString().slice(0,10),
  //       end: new Date().toISOString().slice(0,10)
  // }});

  const params = useParams();
  const navigateTo = useNavigate();
  const queryClient = useQueryClient();
  const [program, setProgram] = useState({
      program_name: "",
      begin:  new Date().toISOString().slice(0,10),
      end: new Date().toISOString().slice(0,10)
});
const id = params.id?.toString() || undefined;

const {register,handleSubmit,setValue,setError,formState: { errors, isSubmitting },} = useForm(  {defaultValues: program});
if(id){
  const {data: programData} = useQuery({
    queryKey: ["programs",id],
    queryFn: () =>  getById("programs",id)
  });
  console.log("data",programData);

  if (!programData) {
    console.warn(`Program with id ${id} not found. Redirecting to /programs.`);
    navigateTo('/programs');
  }else{
    setValue('program_name', programData?.program_name);
    setValue('begin', programData.begin?.slice(0,10));
    setValue('end', programData.end?.slice(0,10));

  }



}


  // useEffect(() => {

    

  //   if(!id){
  //     return;
  //   }

  //     function getProgram () {
  //     try {
        

  //       // if (!programData) {
  //       //   console.warn(`Program with id ${id} not found. Redirecting to /programs.`);
  //       //   navigateTo('/programs');
  //       // }
  //       // else{
  //       //   console.log("hi",programData);
  //         //setProgram({program_name : programData.program_name, begin: programData.begin?.slice(0,10), end : programData.end?.slice(0,10)});

  //           // setValue('program_name', program.program_name);
  //           // setValue('begin', program.begin?.slice(0,10));
  //           // setValue('end', program.end?.slice(0,10));
  //       }




  //     } catch (error) {
  //       console.error(error);
  //     }}

  //     getProgram();
  //     //const program = programs?.find((program) => program._id === params.id);
  //  // const program = queryClient.getQueryData("programs")?.filter((program) => program._id !== id);
  
  // }, [params.id, queryClient, navigateTo]);

  
 

  const {mutateAsync, isPending} = useMutation({
    mutationFn: (data) =>  {return (id? update("programs", id, data): create("programs", data))},
    onSuccess: () => {
        queryClient.invalidateQueries(["programs",id]);
    },
    onError: (error) => {
        console.error(error);
    }
});

  const onSubmit = async (data) => {
        
    try {
        const response = await mutateAsync(data);
        console.log(response.message);
        if(id === undefined){
          navigateTo('/programs');
        }
        
    } catch (error) {   
        console.error(error);
    }
};

  // This following section will display the form that takes the input from the user.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">{params.id? "Update":"Create"} Program</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border rounded-lg overflow-hidden p-4"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
          <div>
            <h2 className="text-base font-semibold leading-7 text-slate-900">
              Program Info
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Name of the Program
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="program_name"
                    id="program_name"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter the name of the program"
                    {...register('program_name', { required: true, maxLength: 80})}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="position"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Begin date of the program
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="date"
                    name="begin"
                    id="begin"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter the begin date"
                    {...register('begin', { required: true})}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="position"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                End date of the program
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="date"
                    name="end"
                    id="end"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Enter the end date"
                    {...register('end', { required: true})}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Save Program"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
        />
      </form>
    </>
  );
}