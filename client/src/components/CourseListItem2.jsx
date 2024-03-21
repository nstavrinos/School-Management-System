import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Group, Button } from '@mantine/core';

export default function Course({course, deleteFun,buttonInfo}) {

    return (
        <Table.Tr >
            <Table.Td> {course?.course_name}</Table.Td>
            <Table.Td>{course?.duration}</Table.Td>
            <Table.Td>    
                <Group justify="start">
                    <Button 
                        color="violet"
                        size="md">
                            <Link
                                className= "hover:text-pink-500"
                                to={`/courses/${course?._id}`}
                            >
                                Edit
                            </Link>
                    </Button>
                    <Button 
                        size="md" 
                        color="red"            
                        onClick={() => {deleteFun(course?._id);}} >
                            {buttonInfo}
                    </Button>
                </Group>
            </Table.Td>
      </Table.Tr>
    );
}