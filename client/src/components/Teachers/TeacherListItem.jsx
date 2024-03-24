import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Group, Button } from '@mantine/core';

export default function Teacher  ({teacher, buttonInfo,deleteFun}) {

    return (
        <Table.Tr >
        <Table.Td>{teacher.first_name}</Table.Td>
        <Table.Td>{teacher.last_name}</Table.Td>
        <Table.Td>{teacher.phone}</Table.Td>
        <Table.Td>{teacher.courses.length}</Table.Td>
        <Table.Td>    
            <Group justify="start">
                <Button 
                    color="violet"
                    size="md">
                        <Link
                            className= "hover:text-pink-500"
                            to={`/teachers/${teacher._id}`}
                        >
                            Edit
                        </Link>
                </Button>
                <Button 
                    size="md" 
                    color="red"            
                    onClick={() => {deleteFun(teacher._id);}} >
                        {buttonInfo}
                </Button>
            </Group>
        </Table.Td>
      </Table.Tr>
 );}