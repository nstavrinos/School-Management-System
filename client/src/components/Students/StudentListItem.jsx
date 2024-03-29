import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Group, Button } from '@mantine/core';

export default function Student  ({student,buttonInfo ,deleteFun}) {

    return (
        <Table.Tr >
        <Table.Td> {student.first_name}</Table.Td>
        <Table.Td> {student.last_name}</Table.Td>
        <Table.Td>{student.phone}</Table.Td>
        <Table.Td>    
            <Group justify="start">
                <Button 
                    color="violet"
                    size="md">
                        <Link
                            className= "hover:text-pink-500"
                            to={`/students/${student._id}`}
                        >
                            Edit
                        </Link>
                </Button>
                <Button 
                    size="md" 
                    color="red"            
                    onClick={() => {deleteFun(student._id);}} >
                        {buttonInfo}
                </Button>
            </Group>
        </Table.Td>
      </Table.Tr>

 );}