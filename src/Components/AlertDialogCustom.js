import React from "react";
import {Modal, Button} from "react-bootstrap";

export default function AlertDialogCustom(props) {
    return(
        <Modal show={props.show}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>{props.body}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={()=>{
                    props.setShow(false)
                }}>Close</Button>
                <Button variant="primary" onClick={()=>props.confirm}>Proceed</Button>
            </Modal.Footer>
        </Modal>
    )
}