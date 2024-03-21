import { useMemo } from 'react';
import { useForm, isInRange, hasLength } from '@mantine/form';
import { Button,TextInput, NumberInput, Box, Grid,  Text, Title ,Card  } from '@mantine/core';
import '@mantine/core/styles/Grid.css';

export default function CourseForm({ course, submitText, submitAction }) {

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
        <Card shadow="sm" padding="lg" radius="md" withBorder  m="lg">
            <Card.Section inheritPadding mt="sm" pb="md">
                <Title order={1}>Course Information</Title>
            </Card.Section>
            <Card.Section inheritPadding mt="sm" pb="md">
                <Grid  spacing="xl"  columns={24}>
                    <Grid.Col span={{ base: 24, md: 8, lg: 6 }} >
                        <Box p="lg" >
                                <Title order={2}>Course Statistics</Title>
                        
                                <Text fw={500} mt="lg">
                                    Number of students:  &emsp;<strong>{course?.grades.length} </strong>
                                </Text>
                                <Text fw={500} mt="lg">
                                    Average score per student:  &emsp;<strong>{0} </strong>
                                </Text>
                        </Box>  
                    </Grid.Col>
                    <Grid.Col span={{ base: 24, md: 16, lg: 18 }} >
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
                            <Button type="submit"variant="filled" color="violet" size="md" justify="center" fullWidth mt="md">Submit</Button>
                        </Box>
                    </Grid.Col>
                </Grid>
            </Card.Section>
        </Card>
    );
}