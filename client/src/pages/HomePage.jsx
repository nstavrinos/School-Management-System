import React from 'react';
import {Grid,Card,Center,Title,Text, Button, Container} from '@mantine/core';
import {Link} from 'react-router-dom';

function HomePage() {

    return (
    <Container py="xl">
        <Title order={1} align='center' mb="lg" >Welcome to the Student Management System</Title>
        <Center>
          <Grid  spacing="sm"  columns={24}>
            <Grid.Col span={{ base: 24, md: 24, lg: 12 }} w={30}>
                <Card shadow="sm" padding="lg" radius="md" withBorder  m="lg">
                  <Card.Section inheritPadding mt="sm" pb="md">
                      <Title order={2}>Programs</Title>
                  </Card.Section>
                  <Card.Section inheritPadding mt="sm" pb="md">
                    <Title order={4}>Description</Title>
                    <Text> View, add, edit and delete programs</Text>
                    </Card.Section>
                    <Card.Section inheritPadding mt="sm" pb="md">
                    <Button variant="filled" color="violet" size="md">
                      <Link to="/programs" className='hover:text-pink-500'>View Programs</Link>
                    </Button> 
                  </Card.Section>
                </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 24, md: 24, lg: 12 }} >
              <Card shadow="sm" padding="lg" radius="md" withBorder  m="lg">
                  <Card.Section inheritPadding mt="sm" pb="md">
                      <Title order={2}>Teachers</Title>
                  </Card.Section>
                  <Card.Section inheritPadding mt="sm" pb="md">
                    <Title order={4}>Description</Title>
                    <Text> View, add, edit and delete teachers</Text>
                    </Card.Section>
                    <Card.Section inheritPadding mt="sm" pb="md">
                    <Button variant="filled" color="violet" size="md">
                      <Link to="/teachers" className='hover:text-pink-500'>View Teachers</Link>
                    </Button>
                  </Card.Section>
              </Card>  
            </Grid.Col>
            <Grid.Col span={{ base: 24, md: 24, lg: 12 }} >
              <Card shadow="sm" padding="lg" radius="md" withBorder  m="lg">
                  <Card.Section inheritPadding mt="sm" pb="md">
                      <Title order={2}>Students</Title>
                  </Card.Section>
                  <Card.Section inheritPadding mt="sm" pb="md">
                    <Title order={4}>Description</Title>
                    <Text> View, add, edit and delete students</Text>
                    </Card.Section>
                    <Card.Section inheritPadding mt="sm" pb="md">
                    <Button variant="filled" color="violet" size="md">
                      <Link to="/students" className='hover:text-pink-500'>View Students</Link>
                    </Button>
                  </Card.Section>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 24, md: 24, lg: 12 }} >
              <Card shadow="sm" padding="lg" radius="md" withBorder  m="lg">
                  <Card.Section inheritPadding mt="sm" pb="md">
                      <Title order={2}>Courses</Title>
                  </Card.Section>
                  <Card.Section inheritPadding mt="sm" pb="md">
                    <Title order={4}>Description</Title>
                    <Text> View, add, edit and delete courses</Text>
                    </Card.Section>
                    <Card.Section inheritPadding mt="sm" pb="md">
                    <Button variant="filled" color="violet" size="md">
                      <Link to="/courses" className='hover:text-pink-500'>View Courses</Link>
                    </Button>
                  </Card.Section>
              </Card>
            </Grid.Col>
          </Grid>
        </Center>
    </Container>
    );
}

export default HomePage