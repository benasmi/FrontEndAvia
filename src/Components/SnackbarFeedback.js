import React, {useState} from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";


export default function SnackbarFeedback(props){

    const [snackbarConfig, setSnackBarConfig] = useState({isSuccessful: false});


    const MESSAGES = {
        SUCCESS: "Your request to server went successfully!",
        ERROR: "Something went wrong! Please try again later."
    };

    return(
            <Snackbar anchorOrigin={{vertical:'bottom', horizontal:'left'}} open={props.show} autoHideDuration={3000} onClose={e=>{props.setShow(false)}}>
                <Alert onClose={e=>{props.setShow(false)}} severity={props.snackbarConfig.isSuccessful ? "success" : "error"}>
                    {props.snackbarConfig.isSuccessful ? MESSAGES.SUCCESS : MESSAGES.ERROR}
                </Alert>
            </Snackbar>
    )

}