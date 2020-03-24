import React, {useEffect, useState} from "react";
import {Modal, Button, Form, Row, Col} from "react-bootstrap"
import '../Styles/popup.css'
import '../Styles/usercomponent.css'
import UserComponent from "./UserComponent";

let citiesTemp = [];

export default function AddCityModal(props) {

    const [city, setCity] = useState("")
    const [temperature, setTemperature] = useState("")
    const [currency, setCurrency] = useState("")
    const [timeZone, setTimeZone] = useState("")
    const [country, setCountry] = useState("")
    const [cities, setCities] = useState([])

    function addCity(){
        citiesTemp.push({"cityName": city, "averageTemperature": temperature, "fk_currency": currency, "fk_timeZone": timeZone, "fk_countryCode": country})
        setCity("")
        setTemperature("")
        setCurrency("")
        setTimeZone("")
        setCountry("")
        setCities(citiesTemp)
    }

    function renderUsers(){
        return cities.map((key, index) => {
            return <UserComponent removeUser={removeUser} row={index} data={key}/>
        })
    }

    function removeUser(row) {
        var temp = []
        for(var i = 0; i<cities.length; i++){
            if(i!==row){
                temp.push(cities[i])
            }
        }
        setCities(temp)
    }

    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add cities
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex  flex-column w-100 ">
                    <div className="d-flex justify-content-center w-100 flex-row">
                        <div className="w-50 ">
                            <Row>
                                <Col>
                                    <Form.Control placeholder="City" value={city} onChange={(e)=>setCity(e.target.value)}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-4">
                                    <Form.Control placeholder="Average Temperature" value={temperature} onChange={(e)=>setTemperature(e.target.value)}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-4">
                                    <Form.Control as="select" value={currency} onChange={(e)=>setCurrency(e.target.value)}>
                                        <option>Select currency</option>
                                        {props.selectableData.currencies.map((item)=>{
                                            return (<option>{item.currency}</option>)
                                        })}
                                    </Form.Control>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-4">
                                    <Form.Control as="select" value={timeZone} onChange={(e)=>setTimeZone(e.target.value)}>
                                        <option>Select time zone</option>
                                        {props.selectableData.timeZones.map((item)=>{
                                            return (<option>{item.timeZone}</option>)
                                        })}
                                    </Form.Control>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="mt-4">
                                    <Form.Control as="select" value={country} onChange={(e)=>setCountry(e.target.value)}>
                                        <option>Select country</option>
                                        {props.selectableData.countries.map((item)=>{
                                            return (<option value={item.numericCode}>{item.country}</option>)
                                        })}
                                    </Form.Control>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="d-flex justify-content-center mt-5">
                                    <Button variant="primary" onClick={addCity}>Add City</Button>
                                </Col>
                            </Row>

                        </div>
                        {cities.length>0 ?
                            <div className="w-50 d-flex flex-column">
                                {renderUsers()}
                            </div> : null}
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={(e)=>{
                    props.addAllUsers(cities);
                    setCities([]);
                }}>Submit</Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}