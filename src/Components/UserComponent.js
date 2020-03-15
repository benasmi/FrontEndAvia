import React from "react";
import {ReactComponent as Close} from "../Images/close.svg";

export default function UserComponent(props) {
    console.log(props);

    function combineAll() {
        let string = "";
        for (var key in props.data) {
            string = string  + props.data[key] + ", "
        }
        return string.substring(0,string.length-2)
    }

    return(
        <div className="addUserComponent">
            <div style={{width:"90%"}}>
                {combineAll()}
            </div>
            <div style={{display: "flex", justifyContent: "flex-end"}}>
                <button style={{background: "none", border:"none"}} onClick={() => props.removeUser(props.row)} >
                    <Close style={{width: "32px", height:"32px", padding: "6px"}}/>
                </button>
            </div>
        </div>
    )
}