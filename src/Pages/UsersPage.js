import React, {useEffect, useState} from 'react'
import '../Styles/userspage.css'
import { ReactComponent as Logo } from '../Images/add.svg';
import axios from "axios"
import TableComponent from '../Components/TableComponent'
import AddUserPopUp from "../Components/AddUserPopUp";
import { CircleToBlockLoading } from 'react-loadingg';
import ReactSnackBar from "react-js-snackbar";


export default function UserPage() {
    const [data, setData] = useState([])
    const [fetchedData, setFetchData] = useState(false)
    const [updatedRows, setUpdatedRows] = useState([])
    const [selectedRows, setSelectedRows] = useState([])
    const [showAddPopUp, setShowAddPopUp] = useState(false)
    const [showLoader, setShowLoader] = useState(false)

    const [isQueryActive, setQueryActive] = useState(false)

    const [showSnackBar, setShowSnackbar] = useState(false)
    const [isSnackBarShowing, setSnackBarShowing] = useState(false)

    const headers = [
        {key:"", editable:true},
        {key:"name", editable:true},
        {key:"surname", editable:false},
        {key:"gender", editable:false},
        {key:"birthday", editable:true},
        {key:"email", editable:true}
    ];

    const show = () => {
        if (isSnackBarShowing) return;

        setSnackBarShowing(true)
        setShowSnackbar(true)
        setTimeout(() => {
            setSnackBarShowing(false)
            setShowSnackbar(false)
        }, 2000);
    };

    if(!fetchedData){
        console.log("Pradedamas siuntimas...")
        setFetchData(true)
        fetchUsers()
    }



    return(
            <div className="content">
                <div style={{ width: "100%"}}>
                    <h1 >Users</h1>
                    <ReactSnackBar style={{}} Icon={<span>✔</span>} Show={showSnackBar}>
                        Succesfully updated!
                    </ReactSnackBar>
                </div>
                <div className="actionsPanel">
                    <button className="updateButton" onClick={updateUsers}>Update</button>
                    <button className="removeButton" onClick={removeUsers}>Remove selected</button>
                    <button className="updateButton" onClick={addUser}>
                        <Logo style={{width:"48px", height:"48px"}}/>
                    </button>
                </div>
                {showAddPopUp ? <AddUserPopUp addAllUsers={addAllUsers} closePopup={togglePopUp}/> : null}
                <div className="tableDiv">

                    {isQueryActive ?  <CircleToBlockLoading size="large" style={{}}/> : null}

                    {(showLoader) ?
                        <CircleToBlockLoading size="large" style={{}}/>
                    : <TableComponent
                        header={headers}
                        data={data}
                        setData={setData}
                        setUpdatedRows={setUpdatedRows}
                        setSelectedRows={setSelectedRows}
                    />}
                </div>

            </div>
    );

    function addUser() {
        setShowAddPopUp(true)
    }

    function addAllUsers(users) {
        insertUsers(users)
        togglePopUp()
    }

    function insertUsers(users){
        axios.post('https://intense-plateau-30917.herokuapp.com/users/insert', users,{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }).then(function (response) {
            console.log(response)
            let temp = data.slice();
            users.map((item)=>{temp.push(item)});
            setData(temp)
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.headers);
            }
            else if (error.request) {
                console.log(error.request);
            }
            else {
                console.log(error.message);
            }
            console.log(error.config);
        });
    }

    function fetchUsers(){
        setShowLoader(true)
        axios.get('https://intense-plateau-30917.herokuapp.com/users/all', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(function (response) {
            let temp = []
            Object.keys(response.data).map((user)=>{
                temp.push(response.data[user])
            });
            setData(temp)
            setShowLoader(false)
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.headers);
            }
            else if (error.request) {
                console.log(error.request);
            }
            else {
                console.log(error.message);
            }
            console.log(error.config);
        });
    }

    function updateUsers() {
        setQueryActive(true)
        axios.post('https://intense-plateau-30917.herokuapp.com/users/update', updatedRows.map((item)=>{return item.data}),{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }).then(function (response) {
            console.log(data)
            let temp = []
            Object.keys(response.data).map((user)=>{
                temp.push(response.data[user])
            });
            setQueryActive(false)
            show();
            console.log(data)
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.headers);
            }
            else if (error.request) {
                console.log(error.request);
            }
            else {
                console.log(error.message);
            }
            console.log(error.config);
        });
    }

    function removeUsers() {
        axios.post('https://intense-plateau-30917.herokuapp.com/users/delete', selectedRows.map((item)=>{return item.data}),{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }).then(function (response) {
            let temp = data.slice()
            let deleteRows = selectedRows.map((item)=>{return item.data})
            deleteRows.map((row)=>{
                console.log(row)
                temp = temp.filter(item => item.email !== row.email)
            });
            console.log(temp)
            setData(temp)
            console.log(data)
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.headers);
            }
            else if (error.request) {
                console.log(error.request);
            }
            else {
                console.log(error.message);
            }
            console.log(error.config);
        });

    }

    function togglePopUp() {
        setShowAddPopUp(!showAddPopUp)
    }
}

