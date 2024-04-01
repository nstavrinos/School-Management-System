import React ,{useMemo, useState}from 'react';
import Teacher from './TeacherListItem';
import { Card, Title, Grid, Table, TextInput, Button, Modal, Tooltip } from '@mantine/core';
import { useDisclosure} from '@mantine/hooks';
import TeacherForm from './TeacherForm';
import AddTeacher from './AddTeacher';

export default function TeachersList({teachers, headerInfo, tableMaxHeight,modalInfo, deleteFun}) {

    const [query, setQuery] = useState('');
    const [opened, { open, close }] = useDisclosure(false);
    const modeCreateTeacher = modalInfo?.includes("Create") ? true : false;
    
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
                buttonInfo= {modeCreateTeacher ? "Delete" : "Remove"}
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
            <Modal opened={opened} onClose={close} title={modalInfo} centered size={modeCreateTeacher? "md" : "90%"} >
                {  modeCreateTeacher?  <TeacherForm submitText={"Create"} closeModal={close}/> : <AddTeacher closeModal={close}/>}
            </Modal>

            <Card shadow="sm" padding="lg" radius="md" withBorder  m="lg">
                <Card.Section inheritPadding mt="sm" pb="md">
                    <Grid  spacing="xl"  columns={24}>
                        <Grid.Col span={modeCreateTeacher ? { base: 24, md: 8, lg: 12 } : { base: 24, md: 12, lg: 16 }} >
                            <Title order={1}>{headerInfo}</Title>
                        </Grid.Col>
                        { modeCreateTeacher && 
                        <Grid.Col span={{ base: 12, md: 8, lg: 6 }} >
                            <TextInput
                                radius="xl"
                                size="md"
                                w='auto'
                                placeholder="Search..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </Grid.Col>}
                        <Grid.Col span={modeCreateTeacher ? { base: 12, md: 8, lg: 6 } : { base: 12, md: 12, lg: 8 }} align='end' >
                            <Tooltip label="Only 1 teacher per course remove the previous teacher to add one new" position="left" disabled={modeCreateTeacher || teachers[0] === undefined }>
                            <Button variant="filled" color="violet" size="md" onClick={open} disabled={ !modeCreateTeacher && teachers[0] !== undefined}> 
                                Add Teacher
                            </Button>
                            </Tooltip>
                        </Grid.Col>
                    </Grid>
                </Card.Section>
                <Card.Section inheritPadding mt="sm" pb="md"> 
                    <Table.ScrollContainer minWidth={500} type="native"  h="auto" mah={tableMaxHeight}>
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