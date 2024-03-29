import React,{useState} from 'react';
import { Table, Group, Button, NumberInput } from '@mantine/core';
import { useUpdateGrade } from '../../api/gradesAPI';

export default function Grade  ({grade,mode}) {

    const updateGrade = useUpdateGrade();
    const [editGrade, setEditGrade] = useState({value: grade.grade ,edit: false}); 

    const saveGrade = async () => {
        updateGrade.mutate({grade_id: grade._id,new_score: editGrade.value});
        setEditGrade({...editGrade,edit: false});
    }
   
    return (
        <Table.Tr >
        <Table.Td>  {mode!=="student" ? grade.student.first_name : grade.course?.course_name}</Table.Td>
        <Table.Td>{mode!=="student" ? grade.student.last_name : (grade.course?.teacher?.first_name || "") + " " + (grade.course?.teacher?.last_name || "")}</Table.Td>
        <Table.Td>{grade.course?.program?.program_name}</Table.Td>
        <Table.Td >
            <NumberInput
                allowNegative = {false}
                decimalScale = {2}
                fixedDecimalScale
                max={100}
                min={0}
                error={editGrade.value < 0 || editGrade.value > 100}
                hideControls
                disabled={!editGrade.edit}
                value={grade.grade}
                onChange={(value) => setEditGrade({...editGrade, value: value})}
                size='md'
                radius='md'
                w = {100}
            />
        </Table.Td>
        <Table.Td>    
            {editGrade.edit ?
                <Group justify="start">
                  <Button
                        color="pink"
                        size="md"
                        onClick={() => setEditGrade({value: grade.grade ,edit: false})}
                    >
                        Cancel
                    </Button>
                    <Button 
                        color="violet"
                        size="md"
                        onClick={saveGrade}
                    >
                        Save
                    </Button>    
                </Group> :
                    <Button
                        color="violet"
                        size="md"
                        onClick={() => setEditGrade({...editGrade,edit: true})}
                    >
                        Edit
                    </Button>
            }
        </Table.Td>
      </Table.Tr>

 );}