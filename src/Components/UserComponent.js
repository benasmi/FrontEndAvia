import React from "react";
import {ReactComponent as Close} from "../Images/close.svg";


export default function UserComponent(props) {
    console.log(props)

    return(
        <div className="addUserComponent">
            <div style={{width:"90%"}}>
                {props.data.name + ", " + props.data.surname + ", " + props.data.email + ", " + props.data.birthday + ", " + props.data.gender}
            </div>
            <div style={{display: "flex", justifyContent: "flex-end"}}>
                <button style={{background: "none", border:"none"}} onClick={() => props.removeUser(props.row)} >
                    <Close style={{width: "32px", height:"32px", padding: "6px"}}/>
                </button>
            </div>
        </div>
    )
}