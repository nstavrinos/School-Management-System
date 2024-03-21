import React, { useMemo, useState } from 'react';
import Student from './StudentListItem2';
import { Link } from 'react-router-dom';
import { Card, Title, Grid, Table, TextInput, Button } from '@mantine/core';

export  default  function  StudentsList ({students, headerInfo , buttonLink, deleteFun}) {

  const [query, setQuery] = useState('');
  

  const filteredStudents = useMemo( () => {
      return students?.filter(student => {
        return student.first_name?.toLowerCase().includes(query.toLowerCase()) 
              || student.last_name?.toLowerCase().includes(query.toLowerCase()) 
              || student.phone?.toLowerCase().includes(query.toLowerCase())
      })
  }, [query, students])

    function studentsList() {

        if (filteredStudents?.length === 0) {
            return <Table.Tr><Table.Td>No Student found</Table.Td></Table.Tr>;

        }

        return filteredStudents?.map((student) => {
            return (
                <Student
                    key={student._id}
                    student={student}
                    deleteFun={deleteFun}
                    
                />
            );
        });
    }

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder  m="lg">
            <Card.Section inheritPadding mt="sm" pb="md">
                <Grid  spacing="xl"  columns={24}>
                    <Grid.Col span={{ base: 24, md: 8, lg: 12 }} >
                        <Title order={1}>{headerInfo}</Title>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 8, lg: 6 }} >
                        <TextInput
                            radius="xl"
                            size="md"
                            w={400}
                            placeholder="Search..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 8, lg: 6 }} align='end' >
                        <Button variant="filled" color="violet" size="md"  > 
                            <Link
                                to={buttonLink}
                                className= "hover:text-pink-500"
                                >
                                Add Student
                            </Link>
                        </Button>
                    </Grid.Col>
                </Grid>
            </Card.Section>
            <Card.Section inheritPadding mt="sm" pb="md"> 
                <Table.ScrollContainer minWidth={500} type="native" h={200}>
                    <Table striped highlightOnHover withTableBorder    stickyHeader  >
                        <Table.Thead>
                        <Table.Tr bg='gray'>
                            <Table.Th>First Name</Table.Th>
                            <Table.Th>Last Name</Table.Th>
                            <Table.Th> Phone</Table.Th>
                            <Table.Th w={300}>Actions</Table.Th>
                        </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{studentsList()}</Table.Tbody>
                    </Table>
                </Table.ScrollContainer>
            </Card.Section>
        </Card>
      );



}