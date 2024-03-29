import { useState, useMemo } from 'react';
import Grade from './GradeListItem';
import { Card, Title, Grid,  Table, TextInput } from '@mantine/core';

export default function GradesList2({ grades, mode, tableMaxHeight }) {

    const [query, setQuery] = useState('');
    const headerInfo = (mode === "student" ) ? "Student Grades" : "Course Grades" ;

    const filteredGradesByStudentName = useMemo( () => {
        return grades?.filter(grade => {
            return grade.student?.first_name?.toLowerCase().includes(query.toLowerCase()) 
                || grade.student?.last_name?.toLowerCase().includes(query.toLowerCase()) 
                || grade.grade?.toString().includes(query.toLowerCase())
                || grade.course?.course_name?.toLowerCase().includes(query.toLowerCase())
                || grade.course?.teacher?.first_name?.toLowerCase().includes(query.toLowerCase())
                || grade.course?.teacher?.last_name?.toLowerCase().includes(query.toLowerCase());
        })
    }, [query, grades]);

    const gradesList = () => {
        if (filteredGradesByStudentName?.length  === 0 || !filteredGradesByStudentName) {
            return   <Table.Tr><Table.Td>No Grade found</Table.Td></Table.Tr>;
        }


      return filteredGradesByStudentName?.map((grade) => {
        
        return (
          <Grade
            grade={grade}
            mode={mode}
            key={grade._id}
          />
        );
      });
    }

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder  m="lg">
            <Card.Section inheritPadding mt="sm" pb="md">
                <Grid  spacing="xl"  columns={24}>
                    <Grid.Col span={{ base: 24, md: 12, lg: 16 }} >
                        <Title order={1}>{headerInfo}</Title>
                    </Grid.Col>
                    <Grid.Col span={{ base: 24, md: 12, lg: 8 }} >
                        <TextInput
                            radius="xl"
                            size="md"
                            w='auto'
                            placeholder="Search..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </Grid.Col>
                </Grid>
            </Card.Section>
            <Card.Section inheritPadding mt="sm" pb="md"> 
                <Table.ScrollContainer minWidth={500} type="native"  h="auto" mah={tableMaxHeight}>
                    <Table striped highlightOnHover withTableBorder    stickyHeader  >
                        <Table.Thead>
                        <Table.Tr bg='gray'>
                            <Table.Th> {mode!=="student" ?"First Name" : "Course"}</Table.Th>
                            <Table.Th> {mode!=="student" ?"Last Name" : "Teacher"}</Table.Th>
                            <Table.Th>Program</Table.Th>
                            <Table.Th>Grade</Table.Th>
                            <Table.Th>Actions</Table.Th>
                        </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {gradesList()}
                        </Table.Tbody>
                    </Table>
                </Table.ScrollContainer>
            </Card.Section>
        </Card>
    );
}