import { useParams, useNavigate } from "react-router-dom";
import {  useForm } from 'react-hook-form'; 
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import {  update, create, getById } from '../api/programsAPI';
import { useEffect,useState } from "react";

export default function CreateStudent() {

    const urlOption = (window.location.href).toString().includes("addNewStudent")? "create-add":"create/edit";

    const params = useParams();
    const navigateTo = useNavigate();
    const queryClient = useQueryClient();
    const {register,handleSubmit,setValue,setError,formState: { errors, isSubmitting },} = useForm(  {defaultValues: {
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        age: 18
    
    }});

    const id = params.id?.toString() || undefined;

    useEffect(() => {
        if(!id){
            return;
        }
    }, [id]);


    if(id && urlOption === "create/edit"){

        const {data: studentData} = useQuery({
            queryKey: ["students",id],
            queryFn: async() =>  {
                const studentData= await getById("students",id);
                if (!studentData) {
                    console.warn(`Student with id ${id} not found. Redirecting to /students.`);
                    navigateTo('/students');
                }else{
                    setValue('first_name', studentData?.first_name);
                    setValue('last_name', studentData?.last_name);
                    setValue('phone', studentData?.phone);
                    setValue('email', studentData?.email);
                    setValue('age', studentData?.age);
 
                }
                return studentData;
            }
        });

    }

    const {mutateAsync, isPending} = useMutation({
        mutationFn: (data) =>  {return (id? update("students", id, data): create("students", data))},
        onSuccess: () => {
            queryClient.invalidateQueries(["students",id]);
        },
        onError: (error) => {
            console.error(error);
        }
    });

    const {mutateAsync : addStudent, isPending: isAddingStudent} = useMutation({
        mutationFn: (data) =>  {return update("programs", id, data)},
        onSuccess: () => {
            queryClient.invalidateQueries(["programs"]);
        },
        onError: (error) => {
            console.error(error);
        }
    });

    const onSubmit = async (data) => {
        
        try {

            if(urlOption === "create-add"){
                const response = await addStudent(data);
                console.log("aaa",response.message);
                navigateTo(`/programs/${id}`);
            }

            const response = await mutateAsync(data);
            console.log("hhhh",response.message);
            if(id === undefined){
              navigateTo('/students');
            }
            
        } catch (error) {   
            console.error(error);
        }
    };


    return (
        <>
          <h3 className="text-lg font-semibold p-4">{params.id? "Edit":"Create"} a Student</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border rounded-lg overflow-hidden p-4"
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
                <div>
                    <h2 className="text-base font-semibold leading-7 text-slate-900">
                    Student Info
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-slate-600">
                    This information will be displayed publicly so be careful what you
                    share.
                    </p>
                </div>
        
                <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
                    <div className="sm:col-span-4">
                    <label
                        htmlFor="first_name"
                        className="block text-sm font-medium leading-6 text-slate-900"
                    >
                        First Name
                    </label>
                    <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                            type="text"
                            name="first_name"
                            id="first_name"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Enter the first name of the student"
                            {...register('first_name', { required: true, maxLength: 80})}
                        />
                        </div>
                        {errors.first_name && <p className="text-red-500 text-xs italic">First Name is required</p>}
                    </div>
                    </div>
                    <div className="sm:col-span-4">
                    <label
                        htmlFor="last_name"
                        className="block text-sm font-medium leading-6 text-slate-900"
                    >
                        Last Name
                    </label>
                    <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                            type="text"
                            name="last_name"
                            id="last_name"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Enter the last name of the student"
                            {...register('last_name', { required: true})}
                        />
                        </div>
                        {errors.last_name && <p className="text-red-500 text-xs italic">Last Name is required</p>}
                    </div>
                    </div>
                    <div className="sm:col-span-4">
                    <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-slate-900"
                    >
                        Phone
                    </label>
                    <div className="mt-2">
                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                            placeholder="Enter the phone number of the student"
                            {...register('phone', { required: true})}
                        />
                        </div>
                        {errors.phone && <p className="text-red-500 text-xs italic">Phone is required</p>}
                    </div>
                    </div>
                    <div className="sm:col-span-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-slate-900"
                        >
                            Email
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                                type="text"
                                name="email"
                                id="email"
                                className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                                placeholder="Enter the email of the student"
                                {...register('email', { required: true})}
                            /> 
                            </div>
                            {errors.email && <p className="text-red-500 text-xs italic">Email is required</p>}
                        </div>
                    </div>
                    <div className="sm:col-span-4">
                        <label
                            htmlFor="age"
                            className="block text-sm font-medium leading-6 text-slate-900"
                        >
                            Age
                        </label>
                        <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                <input
                                    type="number"
                                    name="age"
                                    id="age"
                                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="Enter the age of the student"
                                    {...register('age', { required: true})}
                                /> 
                            </div>
                            {errors.age && <p className="text-red-500 text-xs italic">Age is required</p>}
                        </div>
                    </div>
                </div>
            </div>
            <input
              type="submit"
              value="Save Student"
              disabled={isPending || isAddingStudent}
              className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
            />
          </form>
        </>
      );






}