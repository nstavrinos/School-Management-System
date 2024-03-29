import { useForm, isEmail, isInRange, hasLength } from '@mantine/form';
import { Button,TextInput, NumberInput, Box,Title  } from '@mantine/core';
import { useCreate, useUpdate} from '../../api/sharedAPI';
import { useNavigate, useParams } from 'react-router-dom';
import NotFoundPage from '../../pages/NotFoundPage';

export default function StudentForm({ student, submitText , closeModal}) {

    const navigateTo = useNavigate();
    const {id} = useParams();
    const mutation = student ? useUpdate("students") :  useCreate("students");

    const submitAction = async (data) => {
        const mutatedStudent = await mutation.mutateAsync(data);
        form.resetDirty();
        if(!student && !id){
            navigateTo(`/students/${mutatedStudent._id}`);
        }
        else if(!student && id){
            closeModal();
        }
    }

    if( mutation.isError){
        return <NotFoundPage/>
    }

    const form = useForm({
        initialValues: {
            first_name: student?.first_name || "",
            last_name:  student?.last_name || "",
            phone:  student?.phone || "",
            email:  student?.email || "",
            age:  student?.age || 18
        },
    
        validate: {
          first_name: hasLength({ min: 2, max: 20 }, 'First Name must be 2-20 characters long'),
          last_name: hasLength({ min: 2, max: 20 }, 'Last Name must be 2-20 characters long'),
          phone: hasLength({ min: 10, max: 10 }, 'Phone must be 10 digits long'),
          email: isEmail('Invalid email'),
          age: isInRange({ min: 18, max: 99 }, 'You must be 18-99 years old to register'),
        },
      });
    
    return (
        <Box component="form" maw={400} mx="auto"   p="lg" onSubmit={form.onSubmit(submitAction)} >
            <Title order={2}>Student Details</Title>
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
            <NumberInput
                label="Your age"
                placeholder="Your age"
                withAsterisk
                mt="md"
                {...form.getInputProps('age')}
            />
             <Button type="submit" variant="filled" color="violet" size="md" justify="center" fullWidth mt="md" disabled={ !form.isDirty() || form.isPending || mutation.isPending}>{submitText}</Button>
        </Box>
    );
}