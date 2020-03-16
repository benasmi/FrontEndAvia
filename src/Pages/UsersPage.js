import React, {useEffect, useState} from 'react'
import '../Styles/userspage.css'
import axios from "axios"
import TableComponent from '../Components/TableComponent'
import {Button, ButtonToolbar} from "react-bootstrap"
import AddUserModal from "../Components/AddUserModal";
import AddUserComplex from "../Components/AddUserComplex";
import CustomLoader from "../Components/CustomLoader";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import API from "../Networking/API";

export default function UserPage() {
    //Data hooks
    const [data, setData] = useState([]);
    const [countryData, setCountryData] = useState([]);
    const [cardsProviderData, setCardsProviderData] = useState([]);
    const [fetchedData, setFetchData] = useState(false);
    const [updatedRows, setUpdatedRows] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    //Popup hooks
    const [showAddPopUp, setShowAddPopUp] = useState(false);

    //Feedback hooks
    const [showLoader, setShowLoader] = useState(false);
    const [isQueryActive, setQueryActive] = useState(false);
    const [showStatus, setShowStatus] = useState(false);
    const [snackbarConfig, setSnackBarConfig] = useState({message: "", isSuccessful: false});

    //Forms manipulation
    const [complexFormEnabled, setComplexFormEnabled] = useState(false);

    const MESSAGES = {
        SUCCESS: "Your request to server went successfully!",
        ERROR: "Something went wrong! Please try again later."
    };

    const headers = [
        {key:"", editable:true, selectable: false},
        {key:"name", editable:true, selectable: false},
        {key:"surname", editable:false, selectable: false},
        {key:"gender", editable:false, selectable: false},
        {key:"birthday", editable:false, selectable: false},
        {key:"fk_country", editable:false, selectable: false},
        {key:"email", editable:false, selectable: false}
    ];

    if(!fetchedData){
        setFetchData(true)
        fetchUsers()
    }

    function submitComplexUserForm(data){
        insertUsersWithCards(data)
    }

    return(
        <div className="content">
            {showLoader ?
                <CustomLoader/> :
                complexFormEnabled ? <AddUserComplex
                    closeComplexForm={setComplexFormEnabled(false)}
                    submitComplexUserForm={submitComplexUserForm}
                    selectableData={{countries: countryData, cardsProviderData: cardsProviderData}}
                    />
                    : <div className="content">
                        <h1 className="mt-5">Users(PN2)</h1>
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
                                    setShowAddPopUp(true)}}>Add users</Button>

                                <Button className="ml-4" variant="success" onClick={()=>{
                                    setComplexFormEnabled(true)}}>Advanced</Button>

                                <Button className="ml-4" variant="primary" onClick={()=>{
                                    updateUsers()
                                }}>Update</Button>

                                <Button className="ml-2" variant="danger" onClick={()=>{
                                    removeUsers()
                                }}>Remove selected</Button>
                            </ButtonToolbar>
                        </div>


                        <AddUserModal
                            selectableData={{countries: countryData}}
                            show={showAddPopUp}
                            onHide={() => setShowAddPopUp(false)}
                            addAllUsers={addAllUsers}
                        />

                    </div>
            }

            <Snackbar anchorOrigin={{vertical:'bottom', horizontal:'left'}} open={showStatus} autoHideDuration={3000} onClose={setShowStatus(false)}>
                <Alert onClose={setShowStatus(false)} severity={snackbarConfig.isSuccessful ? "success" : "error"}>
                    {snackbarConfig.message}
                </Alert>
            </Snackbar>

            {isQueryActive ? <CustomLoader/> : null}
        </div>
    );

    function insertUsersWithCards(cardsUserData){
        setQueryActive(true)
        API.CardsAPI.insertCardsWithUser(cardsUserData).then(response=>{
            setData(oldArray=> [...oldArray, cardsUserData.user])
            setComplexFormEnabled(false)
            responseFeedback(true)
        }).catch(error=>{
            responseFeedback(false)
        });
    }

    function fetchCountries(){
        API.CountryAPI.getCountries().then(response=>{
           setCountryData(response);
           fetchCardProvider()
        }).catch(error=>{
            setShowLoader(false)
        });
    }

    function fetchCardProvider(){
        API.CardsProviderAPI.getCardsProviders().then(response=>{
           setCardsProviderData(response);
            setShowLoader(false)
        }).catch(error=>{
            setShowLoader(false)
        });
    }

    function insertUsers(users){
        setQueryActive(true);
        API.UsersAPI.insertUsers(users).then(response=>{
            users.map((item) =>{setData(oldArray => [...oldArray, item])});
            setSelectedRows([])
            setShowAddPopUp(false)
            responseFeedback(true)
        }).catch(error=>{
            responseFeedback(false)
        });
    }

    function fetchUsers(){
        setShowLoader(true)
        API.UsersAPI.getUsers().then(response=>{
            setData(response);
            fetchCountries()
        }).catch(()=>{
            responseFeedback(false)
        });
    }

    function updateUsers() {
        setQueryActive(true)
        API.UsersAPI.updateUsers(updatedRows.map((item)=>{return item.data})).then(response=>{
            responseFeedback(true)
        }).catch(error=>{
            responseFeedback(false)
        });
    }

    function removeUsers() {
        setQueryActive(true)
        const selected = selectedRows.map((item)=>{return item.data});
        API.UsersAPI.removeUsers(selected).then(response=>{
            selected.map((item)=>setData(data.filter((row)=>{return item.email !== row.email})));
            responseFeedback(true);
        }).catch(error=>{
            responseFeedback(false)
        });
    }

    function responseFeedback(success){
        makeSnackbar(success ? MESSAGES.SUCCESS : MESSAGES.ERROR, success)
        setQueryActive(false)
    }

    function makeSnackbar(message, isSuccessful) {
        setSnackBarConfig({message: message, isSuccessful: isSuccessful})
        setShowStatus(true)
    }

    function addAllUsers(users) {
        insertUsers(users)
    }

}

