import { useState,useMemo  } from 'react';
import { useGetAll} from '../../api/sharedAPI';
import { useAddTeacherToCourse } from '../../api/coursesAPI';
import NotFoundPage from '../../pages/NotFoundPage';
import { Grid, Table, TextInput, Button, Group , Checkbox,  Modal  } from '@mantine/core';
import TeacherForm from './TeacherForm';
import { useDisclosure} from '@mantine/hooks';

export default function AddTeacher({closeModal}) {
    const [query, setQuery] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');
    
    const [opened, { open, close }] = useDisclosure(false);

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
        //close the modal
        closeModal();
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

    if (error) {
        return <NotFoundPage />
    }

    if (isLoading || teachers === undefined) {
        return <div>Loading...</div>;
    }

    return (
        <>  
        <Modal opened={opened} onClose={close} title="Create a New Teacher" centered >
            <TeacherForm submitText={"Create"} closeModal={close}/>
        </Modal>
        <Grid  spacing="xl" >
            <Grid.Col span={12} align="center" >
                <Grid  spacing="xl"  columns={24}>
                    <Grid.Col span={{ base: 24, md: 12, lg: 12 }} align="center" >
                        <TextInput
                            radius="xl"
                            w={"60%"}
                            placeholder="Search..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </Grid.Col>
                    <Grid.Col span={{ base: 24, md: 12, lg: 12 }} align='end' >
                    <Group justify="center">
                        <Button 
                            onClick={onClickAdd}
                            disabled={selectedTeacher === ''}
                            variant="filled" 
                            color="violet" 
                            size="sm"  
                        > 
                            Add Selected Teacher
                        </Button>
                        <Button  variant="filled" color="violet" size="sm" onClick={open} > 
                            Add New Teacher
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
                            <Table.Th w={300}>Select</Table.Th>
                        </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{teachersList()}</Table.Tbody>
                    </Table>
                </Table.ScrollContainer>
            </Grid.Col>
        </Grid>
        </>
    );

}