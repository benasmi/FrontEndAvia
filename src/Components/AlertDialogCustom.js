import React from "react";
import {Modal, Button} from "react-bootstrap";

import AlertDialogContext from "../Contexts/AlertDialogContext";
import UseAlertDialogContext from "../Contexts/UseAlertDialogContext";

const AlertDialogCustom = () => {

    const {alertConfig, removeAlertConfig} = UseAlertDialogContext();

    return(
                    <Modal
                        show={!!alertConfig}
                        onHide={removeAlertConfig}
                        centered>
                        <Modal.Header closeButton>
                            <Modal.Title>{!!alertConfig ? alertConfig.title : ""}</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>{!!alertConfig ? alertConfig.message : ""}</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={removeAlertConfig}>Close</Button>
                            <Button variant="primary" onClick={!!alertConfig ? ()=>{
                                removeAlertConfig()
                                alertConfig.func()
                            } : {}}>Proceed</Button>
                        </Modal.Footer>
                    </Modal>
    )
};

export default AlertDialogCustom
