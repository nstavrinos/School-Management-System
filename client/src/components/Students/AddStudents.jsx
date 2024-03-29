import React, { useMemo, useState } from 'react';
import { useGetAll,useGetById } from '../../api/sharedAPI';
import { useAddStudentsToProgram } from '../../api/programsAPI';
import { Grid, Table, TextInput, Button,Title, Group , Checkbox,  Modal  } from '@mantine/core';
import StudentForm from './StudentForm';
import { useDisclosure} from '@mantine/hooks';

export  default  function  AddStudents ({closeModal}) {

    const [query, setQuery] = useState('');
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [opened, { open, close }] = useDisclosure(false);

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
        closeModal();
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

    if (error) {
        return <NotFoundPage />
    }

    if (isLoading ||  students === undefined) {
        return <div>Loading...</div>;
    }


    return (
        <>  
        <Modal opened={opened} onClose={close} title="Create a New Student" centered >
            <StudentForm submitText={"Create"} closeModal={close}/>
        </Modal>
        <Grid  spacing="xl" >
            <Grid.Col span={12} align="center" >
                <Grid  spacing="xl"  columns={24}>
                    <Grid.Col span={{ base: 24, md: 24, lg: 12 }} align="center">
                        <Title order={3}>Selected studentsto add to the program : <strong>{selectedStudents.length}</strong></Title>
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
                            size="sm"  
                        > 
                            Add Selected Students
                        </Button>
                        <Button  variant="filled" color="violet" size="sm" onClick={open} > 
                            Add New Student
                        </Button>
                        </Group>
                    </Grid.Col>
                </Grid>
            </Grid.Col>
            <Grid.Col span={12 } align="center" >
                <Table.ScrollContainer w="100%" type="native" h={200}>
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
            </Grid.Col>
        </Grid>
        </>
    );
}