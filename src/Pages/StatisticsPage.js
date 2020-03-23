import React from "react";
import {Button, ButtonToolbar, Col, Form, Row} from "react-bootstrap";
import {useState, useEffect} from "react"
import DatePicker from "react-datepicker"
import '../Styles/styles.css'
import API from "../Networking/API";
import TableComponent from "../Components/TableComponent";

require('react-datepicker/dist/react-datepicker.css')

export default function StatisticsPage(){
    const [reqBody, setReqBody] = useState({hourStartBound: "", hourEndBound: "", startDate:"", stopDate: ""});
    const [resBody, setResBody] = useState([]);

    function handleChange(e) {
        const {name, value} = e.target
        let body = Object.assign({}, reqBody);
        body[name] = value
        setReqBody(body)
    }

    /*
    "flightNumber": "FR7627",
            "fullName": "Zephania Johns",
            "hourDuration": 0,
            "minuteDuration": 0,
            "reservationId": "7",
            "totalDifCardsPerUser": 1,
            "totalPaymentPerReservation": 1,
            "totalPaymentSumPerReservation": 99,
            "totalDifCardsUsedPerReservation": 1
     */

    const headers = [
        {key:"fullName", display: "Name", editable:false, selectable: false},
        {key:"hourDuration", display: "Hours", editable:false, selectable: false},
        {key:"minuteDuration", display: "Minutes", editable:false, selectable: false},
        {key:"totalDifCardsPerUser", display: "User cards", editable:false, selectable: false},
        {key:"totalPaymentPerReservation", display: "", editable:false, selectable: false},
        {key:"totalPaymentSumPerReservation", editable:false, selectable: false},
        {key:"totalDifCardsUsedPerReservation", editable:false, selectable: false},
    ];

    function formStats(){
        console.log("Started formation...")
        API.StatsAPI.getFlightStats(reqBody).then(response=>{
            const obj = [];
            for (const key of Object.keys(response)){
                obj.push({flightNumber: key, reservations: response[key]})
            }
            setResBody(obj);
            console.log(obj)
        }).catch(error=>{
            console.log(error)
        })
    }

    return(
        <div className="content">
            <h1 className="mt-5">Flights statistics page</h1>
            <h4 className="mt-2">Form statistics using duration and dates bound</h4>

            <div className="mt-5 d-flex flex-column w-50 justify-content-center align-content-center ">
                <Row>
                    <Col>
                        <Form.Control placeholder="From Hour" name="hourStartBound" onChange={handleChange}/>
                    </Col>
                    <Col >
                        <Form.Control placeholder="To Hour" name="hourEndBound" onChange={handleChange} />
                    </Col>
                    <Col>
                        <Form.Control type="date"  placeholder="From Hour" name="startDate" onChange={handleChange}/>
                    </Col>
                    <Col >
                        <Form.Control type="date" placeholder="To Hour" name="stopDate" onChange={handleChange} />
                    </Col>
                </Row>
            </div>

            <ButtonToolbar className="mt-5">
                <Button className="ml-0" variant="primary" onClick={formStats}>Form statistics</Button>
            </ButtonToolbar>

            {
                resBody.length !== 0 ? resBody.map((data=>{
                    return <div>
                        <TableComponent
                            header={headers}
                            data={data.reservations}
                        />

                    </div>
                })) : null
            }

        </div>
    )
}