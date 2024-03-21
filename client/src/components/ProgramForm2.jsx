import { useForm, hasLength, isNotEmpty } from '@mantine/form';
import { Button,TextInput, Box, Grid,  Text, Title ,Card  } from '@mantine/core';
import {DateInput} from '@mantine/dates';

export default function ProgramForm({ program, submitText, submitAction }) {

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
        <Card shadow="sm" padding="lg" radius="md" withBorder  m="lg">
        <Card.Section inheritPadding mt="sm" pb="md">
            <Title order={1}>Program Information</Title>
        </Card.Section>
        <Card.Section inheritPadding mt="sm" pb="md">
            <Grid  spacing="xl"  columns={24}>
                <Grid.Col span={{ base: 24, md: 8, lg: 6 }} >
                    <Box p="lg" >
                            <Title order={2}>Program Statistics</Title>
                    
                            <Text fw={500} mt="lg">
                                Number of students:  &emsp;<strong>{program?.students.length} </strong>
                            </Text>
                            <Text fw={500} mt="lg">
                                Number of courses:  &emsp;<strong>{program?.courses.length} </strong>
                            </Text>
                    </Box>  
                </Grid.Col>
                <Grid.Col span={{ base: 24, md: 16, lg: 18 }} >
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
                        <Button type="submit"variant="filled" color="violet" size="md" justify="center" fullWidth mt="md">Submit</Button>
                    </Box>
                </Grid.Col>
            </Grid>
        </Card.Section>
    </Card>
    );
}