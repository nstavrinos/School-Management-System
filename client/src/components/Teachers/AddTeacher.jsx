import { useState,useMemo  } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useGetAll,useAddTeacherToCourse } from '../../api/sharedAPI';
import NotFoundPage from '../../pages/NotFoundPage';
import { Card, Title, Grid, Table, TextInput, Button, Group , Checkbox  } from '@mantine/core';

export default function AddTeacher() {
    const [query, setQuery] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const navigateTo = useNavigate();

    const { data: teachers, isLoading, error } = useGetAll("teachers");
    const addTeacherToCourse = useAddTeacherToCourse();

    const onCheckboxChange = (e) => {
        
        if (e.target.checked) {
            setSelectedTeacher(e.target.value);
        } else {
            setSelectedTeacher('');
        }
        
    };

    const onClickAdd = async () => {
        addTeacherToCourse.mutate({"teacherId": selectedTeacher});
        navigateTo(-1);
    };

    const filteredTeachers = useMemo( () => {
        return teachers?.filter(teacher => {
                return (teacher.first_name.toLowerCase().includes(query.toLowerCase())
                    || teacher.last_name.toLowerCase().includes(query.toLowerCase())
                    || teacher.phone.toLowerCase().includes(query.toLowerCase()))
        });
    }, [query, teachers]);

    function teachersList() {

        if (filteredTeachers?.length === 0) {
            return <Table.Tr><Table.Td>No Teacher found</Table.Td></Table.Tr>;
    
        }
    
        return filteredTeachers?.map((teacher) => {
            return (
                <Table.Tr key={teacher._id}>
                <Table.Td> {teacher.first_name}</Table.Td>
                <Table.Td> {teacher.last_name}</Table.Td>
                <Table.Td>
                       <Checkbox 
                       onChange={onCheckboxChange} 
                       value={teacher._id} 
                       color='violet'
                       checked={selectedTeacher === teacher._id}
                       />
                </Table.Td>
                </Table.Tr>
            );})
    }

    if (isLoading || teachers === undefined) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <NotFoundPage />
    }
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder  m="lg">
            <Card.Section inheritPadding mt="sm" pb="md">
                <Grid  spacing="xl"  columns={24}>
                    <Grid.Col span={{ base: 24, md: 24, lg: 12 }} align="center">
                        <Title order={1}>Selecte 1 Teacher to add to the course</Title>
                    </Grid.Col>
                    <Grid.Col span={{ base: 24, md: 12, lg: 6 }} align="center" >
                        <TextInput
                            radius="xl"
                            w={"auto"}
                            placeholder="Search..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 24, md: 12, lg: 6 }} align='end' >
                    <Group justify="center">
                        <Button 
                            onClick={onClickAdd}
                            disabled={selectedTeacher === ''}
                            variant="filled" 
                            color="violet" 
                            size="md"  
                        > 
                            Add Selected Teacher
                        </Button>
                        <Button  color="violet" size="md"  > 
                                <Link
                                    to={"/teachers/create"}
                                    className= "hover:text-pink-500"
                                    >
                                Add New Teacher
                                </Link>
                        </Button>
                        </Group>
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
                            <Table.Th w={300}>Select</Table.Th>
                        </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{teachersList()}</Table.Tbody>
                    </Table>
                </Table.ScrollContainer>
            </Card.Section>
        </Card>
    );

}