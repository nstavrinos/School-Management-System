import React, { useMemo, useState } from 'react';
import { useGetAll,useGetById,useAddStudentsToProgram } from '../../api/sharedAPI';
import { useNavigate,  Link } from 'react-router-dom';
import { Card, Title, Grid, Table, TextInput, Button, Group , Checkbox ,Tooltip } from '@mantine/core';

export  default  function  AddStudents () {

    const [query, setQuery] = useState('');
    const [selectedStudents, setSelectedStudents] = useState([]);
    const navigateTo = useNavigate();

    const {data: students, isLoading, error} = useGetAll("students");
    const {data: program} = useGetById("programs");

    const addStudentsToProgram = useAddStudentsToProgram();

    const onCheckboxChange = (e) => {
        if (e.target.checked) {
            setSelectedStudents((prev)=>[...prev, e.target.value]);
        } else {
            setSelectedStudents((prev)=>prev.filter((id) => id !== e.target.value));
        }
    };

    const onClickAdd = async() => {
        addStudentsToProgram.mutate(selectedStudents);
        navigateTo(-1);
    };

  const studentsInProgram = useMemo(() =>{ return program?.students.map(student => student._id)}, [program]);

  // filter students based on search query and students already in the program
  const filteredStudents = useMemo( () => {
    return students?.filter(student => {
      return (student.first_name.toLowerCase().includes(query.toLowerCase()) 
             || student.last_name.toLowerCase().includes(query.toLowerCase()) 
             || student.phone.toLowerCase().includes(query.toLowerCase()))
             && !studentsInProgram.includes(student._id)
    });
  }, [query, students, studentsInProgram])

  function studentsList() {

    if (filteredStudents?.length === 0) {
        return <Table.Tr><Table.Td>No Student found</Table.Td></Table.Tr>;

    }

    return filteredStudents?.map((student) => {
        return (
            <Table.Tr key={student._id}>
            <Table.Td> {student.first_name}</Table.Td>
            <Table.Td> {student.last_name}</Table.Td>
            <Table.Td>
                   <Checkbox 
                   onChange={onCheckboxChange} 
                   value={student._id} 
                   color='violet'
                   checked={selectedStudents.includes(student._id)}
                   />
            </Table.Td>
            </Table.Tr>
        );})
}


    if (isLoading ||  students === undefined) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>An error has occurred: {error.message}</div>;
    }

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder  m="lg">
            <Card.Section inheritPadding mt="sm" pb="md">
                <Grid  spacing="xl"  columns={24}>
                    <Grid.Col span={{ base: 24, md: 24, lg: 12 }} align="center">
                        <Title order={1}>Selected students to add to the program: <strong>{selectedStudents.length}</strong></Title>
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
                            disabled={selectedStudents.length === 0}
                            variant="filled" 
                            color="violet" 
                            size="md"  
                        > 
                            Add Selected Students
                        </Button>
                        <Button  color="violet" size="md"  > 
                                <Link
                                    to={"/students/create"}
                                    className= "hover:text-pink-500"
                                    >
                                Add New Student
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
                            <Table.Th                                 align="center"
                                style={{ width: 300}}  >Select</Table.Th>
                        </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{studentsList()}</Table.Tbody>
                    </Table>
                </Table.ScrollContainer>
            </Card.Section>
        </Card>
    );
}