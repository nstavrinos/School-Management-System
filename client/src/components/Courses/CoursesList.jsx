import React, { useMemo, useState } from 'react';
import Course from './CourseListItem';
import { Card, Title, Grid, Table, TextInput, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import CourseForm from './CourseForm';


export  default  function  CoursesList ({courses, headerInfo ,enableAddCourse ,tableMaxHeight, buttonInfo ,deleteFun}) {

  const [query, setQuery] = useState('');
  const [opened, { open, close }] = useDisclosure(false);

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
        <>
        <Modal opened={opened} onClose={close} title="Create Course" centered >
          <CourseForm submitText={"Create"}/>
        </Modal>
        <Card shadow="sm" padding="lg" radius="md" withBorder  m="lg">
            <Card.Section inheritPadding mt="sm" pb="md">
                <Grid  spacing="xl"  columns={24}>
                    <Grid.Col span={enableAddCourse? { base: 24, md: 8, lg: 12 }: { base: 24, md:12, lg: 18 } } >
                        <Title order={1}>{headerInfo}</Title>
                    </Grid.Col>
                    <Grid.Col span={enableAddCourse? { base: 12, md: 8, lg: 6 }:  { base: 24, md: 12, lg: 6}} >
                        <TextInput
                            radius="xl"
                            size="md"
                            w='auto'
                            placeholder="Search..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </Grid.Col>
                    {enableAddCourse && <Grid.Col span={{ base: 12, md: 8, lg: 6 }} align='end' >
                        <Button variant="filled" color="violet" size="md" onClick={open}> 
                            Add New Course
                        </Button>
                    </Grid.Col>}
                </Grid>
            </Card.Section>
            <Card.Section inheritPadding mt="sm" pb="md"> 
                <Table.ScrollContainer minWidth={500} type="native" h="auto" mah={tableMaxHeight}>
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
        </>
    );
}