import React, {useEffect, useState} from 'react'
import '../Styles/userspage.css'
import axios from "axios"
import TableComponent from '../Components/TableComponent'
import {Button, ButtonToolbar} from "react-bootstrap"
import AddUserModal from "../Components/AddUserModal";
import CustomLoader from "../Components/CustomLoader";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

export default function UserPage() {
    //Data hooks
    const [data, setData] = useState([]);
    const [fetchedData, setFetchData] = useState(false);
    const [updatedRows, setUpdatedRows] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    //Popup hooks
    const [showAddPopUp, setShowAddPopUp] = useState(false);

    //Feedback hooks
    const [showLoader, setShowLoader] = useState(false);
    const [isQueryActive, setQueryActive] = useState(false);
    const [showStatus, setShowStatus] = useState(false);
    const [snackbarConfig, setSnackBarConfig] = useState({message:"", isSuccessful: false});


    const headers = [
        {key:"", editable:true, selectable: false},
        {key:"name", editable:true, selectable: false},
        {key:"surname", editable:true, selectable: false},
        {key:"gender", editable:false, selectable: false},
        {key:"birthday", editable:false, selectable: false},
        {key:"email", editable:false, selectable: false}
    ];

    if(!fetchedData){
        setFetchData(true)
        fetchUsers()
    }


    return(
        <div className="content">
            {showLoader ?
                <CustomLoader/> :
                <div className="content">
                    <h1 className="mt-5">Users</h1>
                        <TableComponent
                            header={headers}
                            data={data}
                            setData={setData}
                            setUpdatedRows={setUpdatedRows}
                            setSelectedRows={setSelectedRows}
                        />
                        <div className="w-75 d-flex justify-content-end ">
                            <ButtonToolbar className="mt-5">
                                <Button className="ml-0" variant="success" onClick={()=>{
                                    setShowAddPopUp(true)}}>Add user</Button>

                                <Button className="ml-4" variant="primary" onClick={()=>{
                                    updateUsers()
                                }}>Update</Button>

                                <Button className="ml-2" variant="danger" onClick={()=>{
                                    removeUsers()
                                }}>Remove selected</Button>
                            </ButtonToolbar>
                        </div>


                    <AddUserModal
                        show={showAddPopUp}
                        onHide={() => setShowAddPopUp(false)}
                        addAllUsers={addAllUsers}
                    />

                    {isQueryActive ? <CustomLoader/> : null}

                    <Snackbar anchorOrigin={{vertical:'bottom', horizontal:'left'}} open={showStatus} autoHideDuration={3000} onClose={snackbarClose}>
                        <Alert onClose={snackbarClose} severity={snackbarConfig.isSuccessful ? "success" : "error"}>
                            {snackbarConfig.message}
                        </Alert>
                    </Snackbar>

                </div>


            }
        </div>
    );

    function makeSnackbar(message, isSuccessful) {
        setSnackBarConfig({message: message, isSuccessful: isSuccessful})
        setShowStatus(true)
    }

    function snackbarClose(){
            setShowStatus(false)
    }

    function addAllUsers(users) {
        insertUsers(users)
    }

    
    function insertUsers(users){
        setQueryActive(true)
        axios.post('https://intense-plateau-30917.herokuapp.com/users/insert', users,{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }).then(function (response) {
            let temp = data.slice();
            users.map((item)=>{temp.push(item)});
            setData(temp)

            setQueryActive(false)
            setShowAddPopUp(false)
            setSelectedRows([]);
            makeSnackbar("All users added successfully!", true)
        }).catch(function (error) {
            makeSnackbar("Something went wrong! Please try again later.", false)
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
            setSelectedRows([])
        }).catch(function (error) {
            makeSnackbar("Something went wrong! Please try again later.", false)
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
            let temp = []
            Object.keys(response.data).map((user)=>{
                temp.push(response.data[user])
            });
            setQueryActive(false)
            setSelectedRows([]);
            makeSnackbar("Horray! All users were updated successfully!", true)
        }).catch(function (error) {
            makeSnackbar("Something went wrong! Please try again later.", false)
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
        setQueryActive(true)
        var selected = selectedRows.map((item)=>{return item.data})
        var temp = data.slice()
        console.log("Pries naikinant")
        console.log(temp);
        console.log("Pasirinkti naikinti")
        console.log(selected);

        axios.post('https://intense-plateau-30917.herokuapp.com/users/delete', selected,{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }).then(function (response) {
            selected.map((item)=>{
                temp = temp.filter((row) => {return item.email !== row.email})});
            setData([])
            setData(temp);
            setSelectedRows([]);
            setQueryActive(false);
            makeSnackbar("All users removed successfully!", true)
        }).catch(function (error) {
            makeSnackbar("Something went wrong! Please try again later.", false)
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

}

