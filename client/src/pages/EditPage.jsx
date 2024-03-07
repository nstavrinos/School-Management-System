import React from 'react';
import { useForm } from 'react-hook-form'; 
import { useMutation, useQueryClient } from '@tanstack/react-query';

function EditPage({setIsOpen, program}) {
    const {register,handleSubmit,setError,formState: { errors, isSubmitting },} = useForm(  {defaultValues: {
        program_name: program.program_name,
        begin: program.begin.slice(0,10),
        end: program.end.slice(0,10)
      }});
    const queryClient = useQueryClient();

    const {mutateAsync, isPending} = useMutation({
        mutationFn: async (data) => {
           
        const response = await fetch(`http://localhost:5000/programs/${program._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        }

        return await response.json();
        },
        onSuccess: () => {
            setIsOpen(false);
            queryClient.invalidateQueries(["programs"]);
        },
        onError: (error) => {
            console.error(error);
        }
    });
    
    const onSubmit = async (data) => {
        
        try {
           const response = await mutateAsync(data);
           console.log(response.message);
        } catch (error) {   
            console.error(error);
        }
    };
  
  



    return (
            <form  onSubmit={handleSubmit(onSubmit)}>
                <h1 className="text-3xl font-bold mb-8 text-center text-indigo-900">Edit the program</h1>
                <div className="mb-4">
                    <label className="block text-indigo-900 text-sm font-bold mb-2" htmlFor="program_name">
                        Name of the program
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-indigo-900 leading-tight focus:outline-none focus:shadow-outline"
                        id="program_name"
                        type="text"
                        name="program_name"
                        {...register('program_name', { required: true, maxLength: 80})}
                    />
                </div>
                {errors.name && <p>Name is required.</p>}
                <div className="mb-4">
                    <label className="block text-indigo-900 text-sm font-bold mb-2" htmlFor="begin">
                        Begin date of the program
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-indigo-900 leading-tight focus:outline-none focus:shadow-outline"
                        id="begin"
                        type="date"
                        name="begin"
                        {...register('begin', { required: true, maxLength: 30})}
                    />
                </div>
                {errors.begin && <p>Begin date is required.</p>}
                <div className="mb-4">
                    <label className="block text-indigo-900 text-sm font-bold mb-2" htmlFor="end">
                        End date of the program
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-indigo-900 leading-tight focus:outline-none focus:shadow-outline"
                        id="end"
                        type="date"
                        name="end"
                        {...register('end', { required: true, maxLength: 30})}
                    />
                </div>
                {errors.end && <p>End date is required.</p>}

                <div className="flex items-center justify-center">
                    <button
                        className="bg-indigo-600 hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting? "Editing..." : "Edit" }
                    </button>
                </div>
            </form>
     
    );
}

export default EditPage;