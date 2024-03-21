import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Course from './CourseListItem2';
import { Card, Title, Grid, Table, TextInput, Button } from '@mantine/core';


export  default  function  CoursesList ({courses, headerInfo , buttonLink, buttonInfo ,deleteFun}) {

  const [query, setQuery] = useState('');
  

  const filteredCourses = useMemo( () => {
      return courses?.filter(course => {
        return course.course_name?.toLowerCase().includes(query.toLowerCase()) 
              || course.duration?.toLowerCase().includes(query.toLowerCase()) 
      })
  }, [query, courses])

    function coursesList() {

        if (filteredCourses?.length === 0) {
            return <Table.Tr><Table.Td>No Course found</Table.Td></Table.Tr>;

        }

        return filteredCourses?.map((course) => {
            return (
                <Course
                    key={course._id}
                    course={course}
                    deleteFun={deleteFun}
                    buttonInfo={buttonInfo}
                    
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
                                Add Course
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
                            <Table.Th>Course Name</Table.Th>
                            <Table.Th> Duration</Table.Th>
                            <Table.Th w={300}>Actions</Table.Th>
                        </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{coursesList()}</Table.Tbody>
                    </Table>
                </Table.ScrollContainer>
            </Card.Section>
        </Card>
      );



}