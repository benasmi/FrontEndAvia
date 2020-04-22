import React from "react";
import {Modal, Button, Form, Row, Col} from "react-bootstrap"
import TableComponent from "./TableComponent";


export default function StatisticsMoreInfo(props){

    const paymentHeaders = [
        {key:"paymentId", display: "Id", editable:false, selectable: false},
        {key:"paymentAmount", display: "Amount", editable:false, selectable: false},
        {key:"paymentDate", display: "Date", editable:false, selectable: false},
        {key:"fk_cardNumber", display: "Card", editable:false, selectable: false},
        {key:"fk_currency", display: "Currency", editable:false, selectable: false},
        {key:"fk_reservationId", display: "Reservation Id", editable:false, selectable: false}
    ];

    const cardHeader = [
        {key:"csv", display: "Csv", editable:false, selectable: false},
        {key:"expYear", display: "Exp.Year", editable:false, selectable: false},
        {key:"expMonth", display: "Exp.Month", editable:false, selectable: false},
        {key:"cardNumber", display: "Card Number", editable:false, selectable: false},
        {key:"fk_cardProvider", display: "Card provider", editable:false, selectable: false}
    ];




    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Additional info
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex justify-content-center align-items-center flex-column w-100 ">
                    <div className="w-75 d-flex align-items-start"><Form.Label>Payments</Form.Label></div>
                    <TableComponent
                        header={paymentHeaders}
                        data={props.data.payments}
                        size="sm"
                    />
                    <div className="w-75 d-flex align-items-start"><Form.Label>Different credit cards used for reservation</Form.Label></div>
                    <TableComponent
                        header={cardHeader}
                        data={props.data.cardsInReservation}
                        size="sm"
                    />
                    <div className="w-75 d-flex align-items-start"><Form.Label> All credit cards owned by the user</Form.Label></div>
                    <TableComponent
                        header={cardHeader}
                        data={props.data.cards}
                        size="sm"
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}