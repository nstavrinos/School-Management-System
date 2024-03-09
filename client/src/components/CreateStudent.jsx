import { useParams, useNavigate } from "react-router-dom";
import {  useForm } from 'react-hook-form'; 
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import {  update, create, getById } from '../api/programsAPI';
import { useEffect,useState } from "react";


export default function CreateStudent() {

    const params = useParams();
    const navigateTo = useNavigate();
    const queryClient = useQueryClient();
    const [student, setStudent] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
        age: 18
    });

    const id = params.id?.toString() || undefined;

    const {register,handleSubmit,setValue,setError,formState: { errors, isSubmitting },} = useForm(  {defaultValues: student});

    if(id){
        const {data: studentData} = useQuery({
            queryKey: ["students",id],
            queryFn: () =>  getById("students",id)
        });

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
    }

    async function onSubmit(data) {
        try {
            if(id){
                const response = await update("students",id, data);
                console.log(response.message);
            }else{
                const response = await create("students", data);
                console.log(response.message);
            }
            queryClient.invalidateQueries(["students"]);
            navigateTo('/students');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="py-2 mx-auto flex items-center justify-between flex-wrap p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg">
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="first_name">
                            First Name
                        </label>
                        <input
                            {...register("first_name", { required: true })}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="first_name"
                            type="text"
                            placeholder="First Name"
                        />
                        {errors.first_name && <p className="text-red-500 text-xs italic">First Name is required</p>}
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="last_name">
                            Last Name
                        </label>
                        <input
                            {...register("last_name", { required: true })}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="last_name"
                            type="text"
                            placeholder="Last Name"
                        />
                        {errors.last_name && <p className="text-red-500 text-xs italic">Last Name is required</p>}
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phone">
                            Phone
                        </label>
                        <input
                            {...register("phone", { required: true })}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="phone"
                            type="text"
                            placeholder="Phone"
                        />
                        {errors.phone && <p className="text-red-500 text-xs italic">Phone is required</p>}
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            {...register("email", { required: true })}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="email"
                            type="text"
                            placeholder="Email"
                        />
                        {errors.email && <p className="text-red-500 text-xs italic">Email is required</p>}
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="age">
                            Age
                        </label>
                        <input
                            {...register("age", { required: true })}
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="age"
                            type="number"
                            placeholder="Age"
                        />
                        {errors.age && <p className="text-red-500 text-xs italic">Age is required</p>}
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );

}