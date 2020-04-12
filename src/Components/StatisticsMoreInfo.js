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
                <div className="d-flex  flex-column w-100 ">
                    Payments
                    <TableComponent
                        header={paymentHeaders}
                        data={props.data.payments}
                        size="sm"
                    />
                    Different credit cards used for reservation
                    <TableComponent
                        header={paymentHeaders}
                        data={props.data.payments}
                        size="sm"
                    />
                    All credit cards owned by the user
                    <TableComponent
                        header={paymentHeaders}
                        data={props.data.payments}
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