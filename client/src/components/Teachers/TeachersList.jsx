import React ,{useMemo, useState}from 'react';
import Teacher from './TeacherListItem';
import { Link } from 'react-router-dom';
import { Card, Title, Grid, Table, TextInput, Button, Modal } from '@mantine/core';
import { useDisclosure} from '@mantine/hooks';
import TeacherForm from './TeacherForm';

export default function TeachersList({teachers, headerInfo, buttonLink, deleteFun}) {

    const [query, setQuery] = useState('');
    const [opened, { open, close }] = useDisclosure(false);
    
    const filterTeachers = useMemo(() => {
        return teachers?.filter((teacher) => {
            return teacher?.first_name?.toLowerCase().includes(query.toLowerCase()) 
                || teacher?.last_name?.toLowerCase().includes(query.toLowerCase()) 
                || teacher?.phone?.toLowerCase().includes(query.toLowerCase());
        });
        }, [query, teachers]);
    
     // This method will map out the records on the table
        function teachersList() {
    
            if (filterTeachers?.length === 0) {
                return <Table.Tr><Table.Td>No Teacher found</Table.Td></Table.Tr>;
            }

        return filterTeachers?.map((teacher) => {
            return (
                <Teacher
                teacher={teacher}
                deleteFun={deleteFun}
                key={teacher._id}
                />
            );
        }
        );
    }

    // This following section will display the table with the records of individuals.
    return (
        <>
            <Modal opened={opened} onClose={close} title="Create Program" centered >
                <TeacherForm submitText={"Create"}/>
            </Modal>
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
                                w='auto'
                                placeholder="Search..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </Grid.Col>
                        {buttonLink && <Grid.Col span={{ base: 12, md: 8, lg: 6 }} align='end' >
                            <Button variant="filled" color="violet" size="md" onClick={open}> 
                                Add New Teacher
                            </Button>
                        </Grid.Col>}
                    </Grid>
                </Card.Section>
                <Card.Section inheritPadding mt="sm" pb="md"> 
                    <Table.ScrollContainer minWidth={500} type="native" h={200}>
                        <Table striped highlightOnHover withTableBorder    stickyHeader  >
                            <Table.Thead>
                            <Table.Tr bg='gray'>
                                <Table.Th>First Name</Table.Th>
                                <Table.Th>Last Name</Table.Th>
                                <Table.Th>Phone</Table.Th>
                                <Table.Th>Number of Courses</Table.Th>
                                <Table.Th w={300}>Actions</Table.Th>
                            </Table.Tr>
                            </Table.Thead>
                            <Table.Tbody>{teachersList()}</Table.Tbody>
                        </Table>
                    </Table.ScrollContainer>
                </Card.Section>
            </Card>
        </>
    );
}