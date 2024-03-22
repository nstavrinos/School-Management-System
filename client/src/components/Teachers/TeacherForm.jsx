import { useNavigate } from 'react-router-dom';
import { useCreate, useUpdate } from '../../api/sharedAPI';
import { useForm, isEmail,hasLength } from '@mantine/form';
import { Button,TextInput,Box,Title } from '@mantine/core';
import '@mantine/core/styles/Grid.css';

export default function TeacherForm({ teacher, submitText }) {

    const navigateTo = useNavigate();
    const mutation = teacher ? useUpdate("teachers") : useCreate("teachers");

    const submitAction = async (data) => {
        const mutatedProgram = await mutation.mutateAsync(data);
        form.resetDirty();
        navigateTo(`/teachers/${mutatedProgram._id}`);
    };

    if( mutation.isError){
        return <NotFoundPage/>
    }

    const form = useForm({
        initialValues: {
            first_name: teacher?.first_name || "",
            last_name: teacher?.last_name || "",
            phone: teacher?.phone || "",
            email: teacher?.email || "",
            courses: teacher?.courses || []
        },
    
        validate: {
          first_name: hasLength({ min: 2, max: 20 }, 'First Name must be 2-20 characters long'),
          last_name: hasLength({ min: 2, max: 20 }, 'Last Name must be 2-20 characters long'),
          phone: hasLength({ min: 10, max: 10 }, 'Phone must be 10 digits long'),
          email: isEmail('Invalid email'),
        },
    });

    return (
        <Box component="form" maw={400} mx="auto"   p="lg" onSubmit={form.onSubmit(submitAction)} >
        <Title order={2}>Teacher Details</Title>
        <TextInput 
            label="First Name" 
            placeholder="First Name" 
            withAsterisk
            mt="md" 
            {...form.getInputProps('first_name')} 
        />
        <TextInput
            label="Last Name"
            placeholder="Last Name"
            withAsterisk
            mt="md"
            {...form.getInputProps('last_name')}
        />
        <TextInput
            label="Phone"
            placeholder="Phone"
            withAsterisk
            mt="md"
            {...form.getInputProps('phone')}
        />
        <TextInput
            label="Your email"
            placeholder="Your email"
            withAsterisk
            mt="md"
            {...form.getInputProps('email')}
        />
        <Button type="submit"variant="filled" color="violet" size="md" justify="center" fullWidth mt="md"disabled={ !form.isDirty() || form.isPending || mutation.isPending}>{submitText}</Button>
    </Box>
    );
}