import React, {useState} from "react";
import '../Styles/popup.css'
import { ReactComponent as Close } from '../Images/close.svg';
import UserComponent from "./UserComponent";


export default function AddUserPopUp(props) {

    const [userName, setUsername] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [date, setDate] = useState("")
    const [gender, setGender] = useState("Male")
    const [users, setUsers] = useState([])

    function addUser(){
        users.push({"name": userName, "surname": lastName, "email": email, "birthday": date, "gender": gender, password: password})
        setUsername("")
        setLastName("")
        setEmail("")
        setGender("Male")
        setPassword("")
        setDate("")
        setUsers(users)
    }

    function renderUsers(){
        return users.map((key, index) => {
            return <UserComponent removeUser={removeUser} row={index} data={key}/>
        })
    }

    function removeUser(row) {
        var temp = []
        for(var i = 0; i<users.length; i++){
            if(i!==row){
                temp.push(users[i])
            }
        }
        setUsers(temp)
    }

    return(
        <div className="popup">
            <div className="popup_inner">
                <div style={{ width: "100%", display: "flex", justifyContent: "flex-end"}}>
                    <button style={{background: "none", border:"none"}} onClick={props.closePopup}>
                        <Close style={{width: "32px", height:"32px", padding: "6px"}}/>
                    </button>
                </div>
                <div className="centerHeader">
                    <h2>Add users</h2>
                </div>
                <div className="wrapperDiv">
                    <div className="formDiv" >
                        <div className="columnDiv">
                            <input type="text" placeholder="Name" value={userName} onChange={e=>{setUsername(e.target.value)}}/>
                            <input type="text" placeholder="Surname" value={lastName} onChange={e=>{setLastName(e.target.value)}}/>
                            <input type="text" placeholder="Email" value={email} onChange={e=>{setEmail(e.target.value)}}/>
                            <input type="text" placeholder="Password" value={password} onChange={e=>{setPassword(e.target.value)}}/>
                            <input type="text" placeholder="Birthday" value={date} onChange={e=>{setDate(e.target.value)}}/>
                            <div className="radioDiv">
                                <label>
                                    <input type="radio" value="Male" onChange={e=>{setGender("Male")}} checked={gender==="Male"} />
                                    Male
                                </label>
                                <label>
                                    <input type="radio" value="Female" onChange={e=>{setGender("Female")}} checked={gender==="Female"}/>
                                    Female
                                </label>
                            </div>
                            <button className="submitButton" onClick={addUser}>Add</button>
                        </div>
                    </div>

                    {users.length > 0 ?
                        <div className="resultsDiv">
                        {renderUsers()}
                        </div> : null
                    }
                </div>

                <div className="submitDiv">
                    {users.length > 0 ? <button style={{marginBottom:"20px", height: "40px"}} className="submitButton" onClick={e=>props.addAllUsers(users)}>Submit</button> : null }
                </div>


            </div>
        </div>
    )
}