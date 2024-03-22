import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Group, Button } from '@mantine/core';

export default function Program  ({program, deleteFun}) {

    return (
        <Table.Tr >
        <Table.Td> {program.program_name}</Table.Td>
        <Table.Td>{program.begin.slice(0, 10)}</Table.Td>
        <Table.Td>{program.end.slice(0, 10)}</Table.Td>
        <Table.Td>    
            <Group justify="start">
                <Button 
                    color="violet"
                    size="md">
                        
                        <Link
                            className= "hover:text-pink-500"
                            to={`/programs/${program._id}`}
                        >
                        Edit
                        </Link>
                </Button>
                <Button 
                    size="md" 
                    color="red"            
                    onClick={() => {deleteFun(program._id);}} >Delete
                </Button>
            </Group>
        </Table.Td>
      </Table.Tr>

 );}