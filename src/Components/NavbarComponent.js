import React from "react";
import {NavLink} from "react-router-dom";
import {Nav, Navbar} from 'react-bootstrap'

export default function NavbarComponent() {
    return(
        <Navbar bg="dark" variant="blue">
            <Navbar.Brand style={{color:"dodgerblue"}}>Database manager</Navbar.Brand>
            <Nav className="mr-auto">
                <NavLink className="d-inline p-2 bg-dark text-white" to="/users">Users</NavLink>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/city">Cities</NavLink>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/currency">Currencies</NavLink>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/timezone">Time Zones</NavLink>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/country">Countries</NavLink>
                <NavLink className="d-inline p-2 bg-dark text-white" to="/suggestion">Suggestions</NavLink>
            </Nav>
        </Navbar>
    )

}


