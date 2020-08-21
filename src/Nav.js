import React from 'react';
import {Link} from 'react-router-dom';

const Nav=()=>{
    return(
        <div>
        <nav className="navDiv">
           
            <Link to='/linechart'>
                <h1>Line Chart</h1> 
            </Link>
            <Link to='/piechart'>
                <h1>Pie Chart</h1> 
            </Link>
            <Link to='/mapchart'>
                <h1>Map Chart</h1> 
            </Link>
            <Link to='/barchart'>
                <h1>Bar Chart</h1> 
            </Link>
           
        </nav>
        </div>
    )
}

export default Nav;