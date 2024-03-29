import { useForm, isInRange, hasLength } from '@mantine/form';
import { Button,TextInput, NumberInput, Box,Title  } from '@mantine/core';
import {useUpdate} from '../../api/sharedAPI';
import {useAddCourseToProgram} from '../../api/programsAPI';
import { useNavigate } from 'react-router-dom';
import NotFoundPage from '../../pages/NotFoundPage';

export default function CourseForm({ course, submitText }) {

    const navigateTo = useNavigate();
    const mutation = course ? useUpdate("courses") : useAddCourseToProgram();

    const submitAction = async (data) => {
        const mutatedCourse = await mutation.mutateAsync(data);
        form.resetDirty();
        navigateTo(`/courses/${mutatedCourse.courses.at(-1)._id}`);
    };

    if( mutation.isError){
        return <NotFoundPage/>
    }

    const form = useForm({
        initialValues: {
            course_name: course?.course_name || "",
            duration:  course?.duration || 7,
            grades: course?.grades || [],
            program: course?.program || undefined,
            teacher: course?.teacher || undefined
        },
    
        validate: {
            course_name: hasLength({ min: 1, max: 10 }, 'First Name must be 2-10 characters long'),
            duration: isInRange({ min: 7, max: 200 }, 'Last Name must be 2-10 characters long'),
        },
    });
    
    return (
        <Box component="form" maw={400} mx="auto"   p="lg" onSubmit={form.onSubmit(submitAction)} >
        <Title order={2}>Course Details</Title>
        <TextInput 
            label="Course Name" 
            placeholder="Course Name" 
            withAsterisk
            mt="md" 
            {...form.getInputProps('course_name')} 
        />
        <NumberInput
            label="Duration in hours"
            allowNegative = {false}
            max={200}
            min={7}
            hideControls
            withAsterisk
            mt="md" 
            {...form.getInputProps('duration')}
        />
        <Button type="submit" variant="filled" color="violet" size="md" justify="center" fullWidth mt="md" disabled={ !form.isDirty() || form.isPending || mutation.isPending}>{submitText}</Button>
    </Box>
    );
}