import Navbar from './components/Navbar2.jsx'
import {Outlet} from "react-router-dom";

export default function App ()  {
    return (   
      <div className="w-full">
        <Navbar/>
        <Outlet/>
      </div>
    );
}



