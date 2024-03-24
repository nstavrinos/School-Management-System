import { useForm, hasLength, isNotEmpty } from '@mantine/form';
import { Button,TextInput, Box, Title} from '@mantine/core';
import {DateInput} from '@mantine/dates';
import {useCreate, useUpdate} from '../../api/sharedAPI';
import { useNavigate } from 'react-router-dom';
import NotFoundPage from '../../pages/NotFoundPage';

export default function ProgramForm({program, submitText}) {

    const navigateTo = useNavigate();
    const mutation = program ? useUpdate("programs") : useCreate("programs");

    const submitAction = async (data) => {
        const mutatedProgram = await mutation.mutateAsync(data);
        form.resetDirty();
        navigateTo(`/programs/${mutatedProgram._id}`);
    };

    if( mutation.isError){
        return <NotFoundPage/>
    }

    const form = useForm({
        initialValues: {
            program_name: program?.program_name || "",
            begin:  program?.begin ? new Date(program?.begin) : new Date(), 
            end:  program?.end ? new Date(program?.end) : new Date(),
            students: program?.students || []
        },
    
        validate: {
          program_name: hasLength({ min: 1, max: 50 }, 'First Name must be 1-50 characters long'),
          begin: isNotEmpty('Begin date must be 10 characters long'),
          end: isNotEmpty( 'End date must be 10 characters long')    
        },
    });

    return (
        <Box component="form" maw={400} mx="auto"   p="lg" onSubmit={form.onSubmit(submitAction)} >
        <Title order={2}>Program Details</Title>
        <TextInput 
            label="Program Name" 
            placeholder="Program Name" 
            withAsterisk
            required
            mt="md" 
            {...form.getInputProps('program_name')} 
        />
        <DateInput  
            label="Begin date of the program" 
            placeholder="Begin date"
            valueFormat="DD MMM YYYY"
            withAsterisk
            required
            mt="md"
            {...form.getInputProps('begin')} 
        />
        <DateInput  
            label="End date of the program" 
            placeholder="End date"
            valueFormat="DD MMM YYYY"
            withAsterisk
            required
            mt="md"
            {...form.getInputProps('end')}
        />
        <Button type="submit" variant="filled" color="violet" size="md" justify="center" fullWidth mt="md" disabled={ !form.isDirty() || form.isPending || mutation.isPending}>{submitText}</Button>
    </Box>
    );
}