import React from "react";
import {NavLink} from "react-router-dom";
import '../Styles/navbar.css'
export default function Navbar() {
    return(

        <div className="routerHeader">
            <div className="dashboard">
                <h3 style={{color:"white"}}>Dashboard</h3>
            </div>
            <ul className="header">
                <li><NavLink exact  to="/">Home</NavLink ></li>
                <li><NavLink to="/users">Users</NavLink></li>
                <li><NavLink to="/currencies">Currencies</NavLink></li>
            </ul>
        </div>
    )

}