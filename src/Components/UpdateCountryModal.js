import React, {useEffect, useState} from "react";
import {Modal, Button, Form, Row, Col} from "react-bootstrap"
import '../Styles/popup.css'
import '../Styles/usercomponent.css'


export default function UpdateCountryModal(props) {

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
                    Update country
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex  flex-column w-100 h-50 ">
                    <div className="d-flex justify-content-center w-100 h-75 flex-row">
                        <Row>
                            <Col>
                                <Form.Control placeholder="Country" name="country" value={props.dataRow.country} onChange={handleChanges}/>
                            </Col>
                        </Row>
                        <Row className="mt-4">
                            <Col>
                                <Form.Control placeholder="Country code" name="countryCode" value={props.dataRow.countryCode} onChange={handleChanges}/>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={(e)=>props.updateCountry(props.dataRow)}>Update</Button>
            </Modal.Footer>
        </Modal>
    )
}