import {Grid, Card, Title, Text , Box} from '@mantine/core';
import ProgramForm from "./ProgramForm";

export default function EditProgram({program}) {

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
                                    Number of students:  &emsp;<strong>{program.students.length} </strong>
                                </Text>
                                <Text fw={500} mt="lg">
                                    Number of courses:  &emsp;<strong>{program.courses.length} </strong>
                                </Text>
                        </Box>  
                    </Grid.Col>
                    <Grid.Col span={{ base: 24, md: 16, lg: 18 }} >
                       <ProgramForm program={program} submitText= {"Edit"}/>
                    </Grid.Col>
                </Grid>
            </Card.Section>
        </Card>
    );
}