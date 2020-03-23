import React, {useEffect, useState} from "react";
import {Modal, Button, Form, Row, Col} from "react-bootstrap"
import '../Styles/popup.css'
import '../Styles/usercomponent.css'


export default function UpdateCurrencyModal(props) {

    function handleChanges(e) {
        const {name, value} = e.target;

        var newRow = Object.assign({}, props.dataRow);
        newRow[name] = value;
        props.setDataRow(newRow)

    }

    return(
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Update currency
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="d-flex justify-content-center">
                <div className="d-flex flex-column w-75 ">
                            <Row>
                                <Col>
                                    <Form.Label>Currency</Form.Label>
                                    <Form.Control placeholder="Currency" name="currency" value={props.dataRow.currency} onChange={handleChanges}/>
                                </Col>
                            </Row>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={(e)=>props.updateCurrency(props.dataRow)}>Update</Button>
            </Modal.Footer>
        </Modal>
    )
}