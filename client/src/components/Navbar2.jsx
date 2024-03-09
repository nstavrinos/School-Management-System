import { NavLink } from "react-router-dom";
import logo from "../assets/full-logo.png";

export default function Navbar() {
    const activeLink = "text-pink-500 font-bold";
    return (
      <>
        <nav className=" py-4 mx-auto text-xl text-white bg-indigo-500  flex items-center justify-between flex-wrap p-6">
          <div>
            <NavLink to="/"className= " text-3xl font-medium font-semibold tracking-tight">
               School M System
            </NavLink>
          </div>
          <div className="space-x-8">
            <NavLink
              to="/programs"
              className={({ isActive }) => (isActive ? activeLink : "hover:text-pink-500")}
            >
              Programs
            </NavLink>
            <NavLink
              to="/teachers"
              className={({ isActive }) => (isActive ? activeLink : "hover:text-pink-500")}
            >
              Teachers
            </NavLink>
            <NavLink
              to="/students"
              className={({ isActive }) => (isActive ? activeLink : "hover:text-pink-500")}
            >
              Students
            </NavLink>
            <NavLink
              to="/courses"
              className={({ isActive }) => (isActive ? activeLink : "hover:text-pink-500")}
            >
              Courses
            </NavLink>
            <NavLink
              to="/search"
              className={({ isActive }) => (isActive ? activeLink : "hover:text-pink-500")}
            >
             Search
            </NavLink>
          </div>
        </nav>
      </>
    );
}