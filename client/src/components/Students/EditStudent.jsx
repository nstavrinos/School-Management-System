import {Grid, Box, Text, Card, Title} from '@mantine/core';
import { useMemo } from 'react';
import StudentForm from './StudentForm';

export default function EditStudent({student}) {

    const averageScore = useMemo(() => {
        return student?.grades?.reduce((acc, grade) => acc + grade.grade, 0) / student?.grades?.length || 0;
    }, [student?.grades]);

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
                                    Number of programs:  &emsp;<strong>{student?.programs?.length} </strong>
                                </Text>
                                <Text fw={500} mt="lg">
                                    Number of courses:  &emsp;<strong>{student?.grades?.length} </strong>
                                </Text>
                                <Text fw={500} mt="lg">
                                    Average score per course:  &emsp;<strong>{averageScore?.toString().slice(0,4)|| 0} </strong>
                                </Text>
                        </Box>  
                    </Grid.Col>
                    <Grid.Col span={{ base: 24, md: 16, lg: 18 }} >
                        <StudentForm student={student} submitText="Edit"/>
                    </Grid.Col>
                </Grid>
            </Card.Section>
        </Card>
    );
}