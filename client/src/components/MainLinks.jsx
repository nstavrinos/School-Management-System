import { NavLink } from "react-router-dom";
import { ActionIcon, useMantineColorScheme, useComputedColorScheme} from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

export default function MainLinks() {

    const activeLink = "text-xl text-pink-500 font-bold";
    const inactiveLink = "text-xl  font-bold hover:text-pink-500";
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    return (
        <>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? activeLink : inactiveLink)}
          >
            Home
          </NavLink>
          <NavLink
            to="/programs"
            className={({ isActive }) => (isActive ? activeLink : inactiveLink)}
          >
            Programs
          </NavLink>
          <NavLink
            to="/teachers"
            className={({ isActive }) => (isActive ? activeLink :inactiveLink)}
          >
            Teachers
          </NavLink>
          <NavLink
            to="/students"
            className={({ isActive }) => (isActive ? activeLink : inactiveLink)}
          >
            Students
          </NavLink>
          <NavLink
            to="/courses"
            className={({ isActive }) => (isActive ? activeLink : inactiveLink)}
          >
            Courses
          </NavLink>
          <ActionIcon
            onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
            variant="transparent"
            size="md"
            aria-label="Toggle color scheme"
            color= {computedColorScheme === 'light' ? 'black' : 'white'}
          >
            {computedColorScheme === 'light' ? <IconSun  stroke={1.5} />   :  <IconMoon stroke={1.5} />}
          </ActionIcon>
        </>
    );
}