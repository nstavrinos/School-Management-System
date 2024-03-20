import React ,{useMemo, useState}from 'react';
import Program from './ProgramListItem2';
import { Link } from 'react-router-dom';
import { Card, Title, Grid, Box, Table, TextInput, Button } from '@mantine/core';

export default function ProgramsList({programs, headerInfo, buttonLink, deleteFun}) {
  
  const [query, setQuery] = useState('');

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
            return <tr><td colSpan="4">No programs found</td></tr>;
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
                                Add a New Program
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
    );
  }