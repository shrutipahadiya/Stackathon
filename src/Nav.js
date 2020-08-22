import React from 'react';
import {Link} from 'react-router-dom';

const Nav=()=>{
    return(
        <div>
        <nav className="navDiv">
           
            <Link to='/linechart'>
                <h1>Country/Time</h1> 
            </Link>
            <Link to='/piechart'>
                <h1>Global/Country</h1> 
            </Link>
            <Link to='/mapchart'>
                <h1>Country/Province</h1> 
            </Link>
            <Link to='/barchart'>
                <h1>US State Data</h1> 
            </Link>
            <Link to='/horizontalbarchart'>
                <h1>US State Today's Data </h1> 
            </Link>
            <Link to='/chart'>
                <h1>US State/Million Data</h1> 
            </Link>
           
        </nav>
        </div>
    )
}

export default Nav;