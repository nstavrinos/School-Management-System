import { useMemo } from 'react';
import { useForm, isEmail, isInRange, hasLength } from '@mantine/form';
import { Button, Group, TextInput, NumberInput, Box, Grid,  Text, Title ,Card  } from '@mantine/core';
import '@mantine/core/styles/Grid.css';



export default function StudentForm({ student, submitText, submitAction }) {

    const form = useForm({
        initialValues: {
            first_name: student?.first_name || "",
            last_name:  student?.last_name || "",
            phone:  student?.phone || "",
            email:  student?.email || "",
            age:  student?.age || 18
        },
    
        validate: {
          first_name: hasLength({ min: 2, max: 10 }, 'First Name must be 2-10 characters long'),
          last_name: hasLength({ min: 2, max: 10 }, 'Last Name must be 2-10 characters long'),
          phone: hasLength({ min: 10, max: 10 }, 'Phone must be 10 digits long'),
          email: isEmail('Invalid email'),
          age: isInRange({ min: 18, max: 99 }, 'You must be 18-99 years old to register'),
        },
      });

    const averageScore = useMemo(() => {return student?.grades.reduce((acc, grade) => acc + grade.grade, 0) / student?.grades.length;}, [student?.grades]);
    
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder  m="lg">
            <Card.Section inheritPadding mt="sm" pb="md">
                <Title order={1}>Student Information</Title>
            </Card.Section>
            <Card.Section inheritPadding mt="sm" pb="md">
                <Grid  spacing="xl"  columns={24}>
                    <Grid.Col span={{ base: 24, md: 8, lg: 6 }} >
                        <Box p="lg" >
                                <Title order={2}>Student Statistics</Title>
                        
                                <Text fw={500} mt="lg">
                                    Number of programs:  &emsp;<strong>{student?.programs.length} </strong>
                                </Text>
                                <Text fw={500} mt="lg">
                                    Number of courses:  &emsp;<strong>{student?.grades.length} </strong>
                                </Text>
                                <Text fw={500} mt="lg">
                                    Average score per course:  &emsp;<strong>{averageScore?.toString().slice(0,4)|| 0} </strong>
                                </Text>
                        </Box>  
                    </Grid.Col>
                    <Grid.Col span={{ base: 24, md: 16, lg: 18 }} >
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
                            <Button type="submit"variant="filled" color="violet" size="md" justify="center" fullWidth mt="md">Submit</Button>
                        </Box>
                    </Grid.Col>
                </Grid>
            </Card.Section>
        </Card>
    );
}