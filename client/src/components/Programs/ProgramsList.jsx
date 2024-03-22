import React ,{useMemo, useState}from 'react';
import Program from './ProgramListItem';
import { Card, Title, Grid, Table, TextInput, Button, Modal } from '@mantine/core';
import { useDisclosure} from '@mantine/hooks';
import ProgramForm from './ProgramForm';

export default function ProgramsList({programs, headerInfo, buttonLink, deleteFun}) {
  
  const [query, setQuery] = useState('');
  const [opened, { open, close }] = useDisclosure(false);

  const filterPrograms = useMemo(() => {
      return programs?.filter((program) => {
        return program.program_name.toLowerCase().includes(query.toLowerCase()) 
              || program.begin.toLowerCase().includes(query.toLowerCase()) 
              || program.end.toLowerCase().includes(query.toLowerCase());
      });
    }, [query, programs]);

   // This method will map out the records on the table
    function programsList() {
        if (filterPrograms?.length === 0) {
            return <Table.Tr><Table.Td>No Program found</Table.Td></Table.Tr>;
        }


      return filterPrograms.map((program) => {
        return (
          <Program
            program={program}
            deleteFun={deleteFun}
            key={program._id}
          />
        );
      });
    }

    // This following section will display the table with the records of individuals.
    return (
        <>
      <Modal opened={opened} onClose={close} title="Create Program" centered >
        <ProgramForm submitText={"Create"}/>
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
                    <Grid.Col span={{ base: 12, md: 8, lg: 6 }} align='end' >
                        <Button variant="filled" color="violet" size="md" onClick={open}>
                          Add New Program
                        </Button>
                    </Grid.Col>
                </Grid>
            </Card.Section>
            <Card.Section inheritPadding mt="sm" pb="md"> 
                <Table.ScrollContainer minWidth={500} type="native" h={200}>
                    <Table striped highlightOnHover withTableBorder    stickyHeader  >
                        <Table.Thead>
                        <Table.Tr bg='gray'>
                            <Table.Th> Name of the program</Table.Th>
                            <Table.Th> Start Date</Table.Th>
                            <Table.Th> End Date</Table.Th>
                            <Table.Th w={300}>Actions</Table.Th>
                        </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{programsList()}</Table.Tbody>
                    </Table>
                </Table.ScrollContainer>
            </Card.Section>
        </Card>
        </>
    );
  }