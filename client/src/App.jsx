import Navbar from './components/Navbar.jsx'
import {Outlet} from "react-router-dom";

export default function NavbarWrapper ()  {
    return (   
      <div>
        <Navbar/>
        <Outlet/>
      </div>
    );

}



