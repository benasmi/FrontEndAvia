import React, {useEffect, useState} from "react";
import {Modal, Button, Form, Row, Col} from "react-bootstrap"
import '../Styles/popup.css'
import '../Styles/usercomponent.css'
import UserComponent from "./UserComponent";

let users = []

export default function AddUserModal(props) {

    const [name, setName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [date, setDate] = useState("")
    const [gender, setGender] = useState("Select gender...")
    const [users, setUsers] = useState([])

    function addUser(){
        users.push({"name": name, "surname": lastName, "email": email, "birthday": date, "gender": gender, password: password})
        setName("")
        setLastName("")
        setEmail("")
        setGender("Select gender...")
        setPassword("")
        setDate("")
        setUsers(users)
    }

    function renderUsers(){
        return users.map((key, index) => {
            return <UserComponent removeUser={removeUser} row={index} data={key}/>
        })
    }

    function removeUser(row) {
        var temp = []
        for(var i = 0; i<users.length; i++){
            if(i!==row){
                temp.push(users[i])
            }
        }
        setUsers(temp)
    }

    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add users
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex  flex-column w-100 h-50 ">
                    <div className="d-flex justify-content-center w-100 h-75 flex-row">
                        <div className="w-50 ">
                            <Row>
                                <Col>
                                    <Form.Control placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                                </Col>
                                <Col>
                                    <Form.Control placeholder="Surname" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-4">
                                    <Form.Control placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-4">
                                    <Form.Control placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-4">
                                    <Form.Control placeholder="Birthday" value={date} onChange={(e)=>setDate(e.target.value)}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-4">
                                    <Form.Control as="select" value={gender} onChange={(e)=>setGender(e.target.value)}>
                                        <option>Select gender</option>
                                        <option>Male</option>
                                        <option>Female</option>
                                    </Form.Control>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="d-flex justify-content-center mt-5">
                                    <Button variant="primary" onClick={addUser}>Add user</Button>
                                </Col>
                            </Row>

                        </div>
                        { users.length>0 ?
                            <div className="w-50 d-flex flex-column">
                                {renderUsers()}
                            </div> : null}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={(e)=>props.addAllUsers(users)}>Submit</Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}