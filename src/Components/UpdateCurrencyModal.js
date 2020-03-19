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
            <Modal.Body>
                <div className="d-flex  flex-column w-100 h-50 ">
                    <div className="d-flex justify-content-center w-100 h-75 flex-row">
                            <Row>
                                <Col>
                                    <Form.Control placeholder="Currency" name="currency" value={props.dataRow.currency} onChange={handleChanges}/>
                                </Col>
                            </Row>
                        </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={(e)=>props.updateTimezone(props.dataRow)}>Update</Button>
            </Modal.Footer>
        </Modal>
    )
}