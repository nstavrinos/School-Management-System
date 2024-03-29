import CourseForm from "./CourseForm";
import {Grid, Card, Title, Box,Text} from '@mantine/core';
import {useMemo} from 'react';

export default function EditCourse({course}) {

    const courseStats = useMemo(() => {
        if(!course?.grades) return {};

        const avgG = course.grades.reduce((acc, grade) => acc + grade.grade, 0) / course.grades.length || 0;
        const avgGradeRounded = Math.round(avgG * 100) / 100;
        const avgGradeString = avgGradeRounded.toString();
        const avgGrade = avgGradeString.length > 3 ? avgGradeString.slice(0, 5) : avgGradeString;
        const highestGrade = Math.max(...course.grades.map(grade => grade.grade)) ;
        const lowestGrade = Math.min(...course.grades.map(grade => grade.grade)) ;
        const highestGradeStudent = course.grades.find(grade => grade.grade === highestGrade)?.student.last_name || "N/A";
        const lowestGradeStudent = course.grades.find(grade => grade.grade === lowestGrade)?.student.last_name || "N/A";
        return {
            numberOfStudents: course.grades.length,
            averageGrade: avgGrade,
            highestGrade: highestGrade,
            lowestGrade: lowestGrade,
            highestGradeStudent: highestGradeStudent,
            lowestGradeStudent: lowestGradeStudent
        }
    }, [course]);

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
                                    Number of students:  &emsp;<strong>{courseStats.numberOfStudents} </strong>
                                </Text>
                                <Text fw={500} mt="lg">
                                    Average grade:  &emsp;<strong>{courseStats.averageGrade} </strong>
                                </Text>
                                <Text fw={500} mt="lg">
                                    Highest grade:  &emsp;<strong>{courseStats.highestGrade} </strong>
                                </Text>
                                <Text fw={500} mt="lg">
                                    Highest grade student:  &emsp;<strong>{courseStats.highestGradeStudent} </strong>
                                </Text>
                                <Text fw={500} mt="lg">
                                    Lowest grade:  &emsp;<strong>{courseStats.lowestGrade} </strong>
                                </Text>
                                <Text fw={500} mt="lg">
                                    Lowest grade student:  &emsp;<strong>{courseStats.lowestGradeStudent} </strong>
                                </Text>
                        </Box>  
                    </Grid.Col>
                    <Grid.Col span={{ base: 24, md: 16, lg: 18 }} >
                       <CourseForm course={course} submitText= {"Edit"}/>
                    </Grid.Col>
                </Grid>
            </Card.Section>
      </Card>
    );
}