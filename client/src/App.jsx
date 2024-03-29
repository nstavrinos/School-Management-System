import { AppShell, Burger, Group, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {Outlet,Link} from "react-router-dom";
import MainLinks from './components/MainLinks.jsx'

export default function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" bg='violet'>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Link to="/">
                <Title px="xl">School MS</Title>
            </Link>
            <Group ml="xl" gap='xl' visibleFrom="sm" size="xl">
              <MainLinks/>
            </Group>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="lg" px={10} onClick={toggle} >
            <MainLinks/>
      </AppShell.Navbar>

      <AppShell.Main>
         <Outlet/>
      </AppShell.Main>

    </AppShell>
  );
}