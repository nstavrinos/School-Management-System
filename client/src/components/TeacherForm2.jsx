import { useMemo } from 'react';
import { useForm, isEmail, isInRange, hasLength } from '@mantine/form';
import { Button,TextInput, NumberInput, Box, Grid,  Text, Title ,Card  } from '@mantine/core';
import '@mantine/core/styles/Grid.css';

export default function TeacherForm({ teacher, submitText, submitAction }) {

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

    const coursesDuration = useMemo(() => teacher?.courses.reduce((acc, course) => acc + course.duration, 0), [teacher?.courses]);

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder  m="lg">
            <Card.Section inheritPadding mt="sm" pb="md">
                <Title order={1}>Teacher Information</Title>
            </Card.Section>
            <Card.Section inheritPadding mt="sm" pb="md">
                <Grid  spacing="xl"  columns={24}>
                    <Grid.Col span={{ base: 24, md: 8, lg: 6 }} >
                        <Box p="lg" >
                                <Title order={2}>Teacher Statistics</Title>
                        
                                <Text fw={500} mt="lg">
                                    Number of courses:  &emsp;<strong>{teacher?.courses.length} </strong>
                                </Text>
                                <Text fw={500} mt="lg">
                                    Sum of courses duration:  &emsp;<strong>{coursesDuration} </strong>
                                </Text>
                        </Box>  
                    </Grid.Col>
                    <Grid.Col span={{ base: 24, md: 16, lg: 18 }} >
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
                            <Button type="submit"variant="filled" color="violet" size="md" justify="center" fullWidth mt="md">Submit</Button>
                        </Box>
                    </Grid.Col>
                </Grid>
            </Card.Section>
        </Card>
    );
}