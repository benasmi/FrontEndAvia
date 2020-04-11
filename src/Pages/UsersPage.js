import React, {useEffect, useState} from 'react'
import '../Styles/userspage.css'
import TableComponent from '../Components/TableComponent'
import {Button, ButtonToolbar} from "react-bootstrap"
import AddUserModal from "../Components/AddUserModal";
import AddUserComplex from "../Components/AddUserComplex";
import CustomLoader from "../Components/CustomLoader";
import API from "../Networking/API";
import UseSnackbarContext from "../Contexts/UseSnackbarContext";
import UseAlertDialogContext from "../Contexts/UseAlertDialogContext";
import UpdateUserComplex from "../Components/UpdateUserComplex";

export default function UserPage() {
    //Data hooks
    const [data, setData] = useState([]);
    const [countryData, setCountryData] = useState([]);
    const [cardsProviderData, setCardsProviderData] = useState([]);
    const [cardsData, setCardsData] = useState([]);

    const [updatedRows, setUpdatedRows] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    //Popup hooks
    const [showAddPopUp, setShowAddPopUp] = useState(false);

    //Feedback hooks
    const [showLoader, setShowLoader] = useState(true);
    const [isQueryActive, setQueryActive] = useState(false);

    const { addConfig } = UseSnackbarContext();
    const { addAlertConfig } = UseAlertDialogContext();

    //Forms manipulation
    const [complexFormEnabled, setComplexFormEnabled] = useState(false);
    const [complexFormUpdateEnabled, setComplexFormUpdateEnabled] = useState(false);



    const headers = [
        {key:"checkbox", editable:true, selectable: false},
        {key:"name", editable:true, selectable: false},
        {key:"surname", editable:false, selectable: false},
        {key:"gender", editable:false, selectable: false},
        {key:"birthday", editable:false, selectable: false},
        {key:"fk_country", editable:false, selectable: false},
        {key:"email", editable:false, selectable: false}
    ];

    useEffect(()=>{
          fetchUsers()
        },[]);


    function submitComplexUserForm(data){
        insertUsersWithCards(data)
    }

    function preparedSelectedUsers(){
        let tempo = [];
        selectedRows.map((data, idx) => {
            var test = cardsData[data.data.email];
            tempo.push({user: data.data, cards: []});

            if(test !== undefined){
                test.map(card=>{
                    tempo[idx].cards.push(card)
                })
            }
        });
        return tempo
    }


    function updateComplexUserForm(data) {
        setQueryActive(true)
        API.UsersAPI.updateUsersWithCards(data).then(response=>{
            API.UsersAPI.getUsers().then(response=>{
                setSelectedRows([])
                responseFeedback(true)
                setComplexFormUpdateEnabled(false)
            }).catch(error=>{
                responseFeedback(false)
            })
        }).catch(error=>{
            responseFeedback(false)
        });
    }

    return(

        <div className="content">
            {showLoader ?
                <CustomLoader/> :
                complexFormEnabled ? <AddUserComplex
                    closeComplexForm={e=>{setComplexFormEnabled(false)}}
                    submitComplexUserForm={submitComplexUserForm}
                    selectableData={{countries: countryData, cardsProviderData: cardsProviderData}}
                    />
                    : complexFormUpdateEnabled ? <UpdateUserComplex
                        closeComplexForm={e=>{setComplexFormUpdateEnabled(false)}}
                        updateComplexUserForm={updateComplexUserForm}
                        selectableData={{countries: countryData, cardsProviderData: cardsProviderData}}
                        data={preparedSelectedUsers()}
                    /> : <div className="content">
                        <h1 className="mt-5">Users(PN2)</h1>
                        <TableComponent
                            header={headers}
                            data={data}
                            setData={setData}
                            setUpdatedRows={setUpdatedRows}
                            selectedRows={selectedRows}
                            setSelectedRows={setSelectedRows}
                        />
                        <div className="w-75 d-flex justify-content-end ">
                            <ButtonToolbar className="mt-5">

                                {/*<Button className="ml-0" variant="success" onClick={()=>{
                                    setShowAddPopUp(true)}}>Add users</Button>*/}

                                <Button className="ml-4" variant="success" onClick={()=>{
                                    setComplexFormEnabled(true)}}>Add users</Button>

                                <Button className="ml-4" variant="primary" onClick={()=>{
                                    updateUsers()
                                }}>Update</Button>

                                <Button className="ml-2" variant="primary" onClick={()=>{
                                    setComplexFormUpdateEnabled(true)
                                }}>Advanced Update</Button>

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

            {isQueryActive ? <CustomLoader/> : null}

        </div>
    );

    function insertUsersWithCards(cardsUserData){
        setQueryActive(true)
        API.CardsAPI.insertCardsWithUser(cardsUserData).then(response=>{
            addUsersLocally(cardsUserData);
            setComplexFormEnabled(false);
            responseFeedback(true)
        }).catch(error=>{
            responseFeedback(false)
        });
    }

    function addUsersLocally(data) {
        data.map(item =>{
            setData(oldArray=> [...oldArray, item.user])
        })
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
           fetchCards()
        }).catch(error=>{
            setShowLoader(false)
        });
    }


    function fetchCards(){
        API.CardsAPI.getAllCards().then(response=>{
            setCardsData(response);
            setShowLoader(false)
        }).catch(error=>{
            setShowLoader(false)
        })
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
        addAlertConfig("Update users", "Do you really want to make any changes?", function () {
            setQueryActive(true)
            API.UsersAPI.updateUsers(updatedRows.map((item)=>{return item.data})).then(response=>{
                responseFeedback(true)
            }).catch(error=>{
                responseFeedback(false)
            });
        });
    }

    function updateAdvanced(){

    }


    function removeUsers() {
        addAlertConfig("Remove users", "Do you really want to remove selected users? Other rows who have this row as a foreign key will also be affected and deleted!", function(){
            setQueryActive(true);
            const selected = selectedRows.map((item)=>{return item.data});
            API.UsersAPI.removeUsers(selected).then(response=>{
                API.UsersAPI.getUsers().then(response=>{
                    setSelectedRows([]);
                    setData(response);
                    responseFeedback(true);
                }).catch(error=>{
                    responseFeedback(false)
                });
            }).catch(error=>{
                responseFeedback(false)
            });
        });
    }

    function responseFeedback(success){
        addConfig(success);
        setQueryActive(false)
    }

    function addAllUsers(users) {
        insertUsers(users)
    }

}

