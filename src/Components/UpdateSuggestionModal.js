import React, {useEffect, useState} from "react";
import {Modal, Button, Form, Row, Col} from "react-bootstrap"
import '../Styles/popup.css'
import '../Styles/usercomponent.css'


export default function UpdateSuggestionModal(props) {

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
                                <Form.Label>Place name</Form.Label>
                                <Form.Control placeholder="Place name" name="placeName" value={props.dataRow.placeName} onChange={handleChanges}/>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col>
                                <Form.Label>Ticket price</Form.Label>
                                <Form.Control placeholder="Ticket price" name="ticketPrice" value={props.dataRow.ticketPrice} onChange={handleChanges}/>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col >
                                <Form.Label>Is family friendly?</Form.Label>
                                <Form.Control as="select" name="isFamilyFriendly" value={props.dataRow.isFamilyFriendly} onChange={handleChanges}>
                                    <option value="1">Family friendly</option>
                                    <option value="0">Adults only</option>
                                </Form.Control>
                            </Col>
                        </Row>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={(e)=>props.updateSuggestion(props.dataRow)}>Update</Button>
            </Modal.Footer>
        </Modal>
    )
}