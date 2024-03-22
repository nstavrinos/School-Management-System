import TeacherForm from "./TeacherForm";
import {Card, Title, Text, Box, Grid} from '@mantine/core';
import { useMemo } from 'react';

export default function EditTeacher({teacher}) {

    const coursesDuration = useMemo(() => teacher?.courses.reduce((acc, course) => acc + course.duration, 0), [teacher.courses]);

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
                                    Number of courses:  &emsp;<strong>{teacher.courses.length} </strong>
                                </Text>
                                <Text fw={500} mt="lg">
                                    Sum of courses duration:  &emsp;<strong>{coursesDuration} </strong>
                                </Text>
                        </Box>  
                    </Grid.Col>
                    <Grid.Col span={{ base: 24, md: 16, lg: 18 }} >
                        <TeacherForm teacher={teacher} submitText="Edit" />
                    </Grid.Col>
                </Grid>
            </Card.Section>
        </Card>
    );
}