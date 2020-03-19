import React, {useEffect, useState} from 'react'
import '../Styles/userspage.css'
import axios from "axios"
import TableComponent from '../Components/TableComponent'
import {Button, ButtonToolbar} from "react-bootstrap"
import AddCityModal from "../Components/AddCityModal";
import CustomLoader from "../Components/CustomLoader";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import API from "../Networking/API";

export default function CityPage() {
    //Data hooks
    const [data, setData] = useState([]);
    const [updatedRows, setUpdatedRows] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [headers, setHeaders] = useState([])

    const [currencyData, setCurrencyData] = useState([]);
    const [countryData, setCountryData] = useState([]);
    const [timeZoneData, setTimeZoneData] = useState([])

    //Popup hooks
    const [showAddPopUp, setShowAddPopUp] = useState(false);

    //Feedback hooks
    const [showLoader, setShowLoader] = useState(false);
    const [isQueryActive, setQueryActive] = useState(false);
    const [showStatus, setShowStatus] = useState(false);
    const [snackbarConfig, setSnackBarConfig] = useState({message:"", isSuccessful: false});

    const MESSAGES = {
        SUCCESS: "Your request to server went successfully!",
        ERROR: "Something went wrong! Please try again later."
    };

    useEffect(()=>{
        fetchCities()
    },[]);

    useEffect(()=>{
        let temp = [
            {key:"checkbox", editable:true, selectable: false},
            {key:"cityName", editable:false, selectable: false},
            {key:"averageTemperature", editable:true, selectable: false},
            {key:"fk_timeZone", editable:false, selectable: true, selectableData: createSelectorValues(timeZoneData, "timeZone", "timeZone")},
            {key:"fk_currency", editable:false, selectable: true, selectableData: createSelectorValues(currencyData,"currency","currency")},
            {key:"fk_countryCode", editable:false, selectable: false}];
            setHeaders(temp)
    },[currencyData, timeZoneData]);


    return(
        <div className="content">
            {showLoader ?
                <CustomLoader/> :
                <div className="content">
                    <h1 className="mt-5">Cities(PP2)</h1>
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
                            <Button className="ml-0" variant="success" onClick={()=>{
                                setShowAddPopUp(true)}}>Add cities</Button>

                            <Button className="ml-4" variant="primary" onClick={()=>{
                                updateUsers()
                            }}>Update</Button>

                            <Button className="ml-2" variant="danger" onClick={()=>{
                                removeCity()
                            }}>Remove selected</Button>
                        </ButtonToolbar>
                    </div>

                    <AddCityModal
                        show={showAddPopUp}
                        selectableData={{countries: countryData, timeZones: timeZoneData, currencies: currencyData}}
                        onHide={() => setShowAddPopUp(false)}
                        addAllUsers={addAllUsers}
                    />

                    {isQueryActive ? <CustomLoader/> : null}

                    <Snackbar anchorOrigin={{vertical:'bottom', horizontal:'left'}} open={showStatus} autoHideDuration={3000} onClose={e=>{setShowStatus(false)}}>
                        <Alert onClose={e=>{setShowStatus(false)}} severity={snackbarConfig.isSuccessful ? "success" : "error"}>
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

    function responseFeedback(success){
        makeSnackbar(success ? MESSAGES.SUCCESS : MESSAGES.ERROR, success)
        setQueryActive(false)
    }

    function addAllUsers(users) {
        insertCity(users)
    }

    function createSelectorValues(data, value, displayValue){
        let temp = [];
        data.map((item) => {
            temp.push({value: item[value], displayValue: item[displayValue]})
        });
        return temp
    }

    function fetchCurrencies(){
        API.CurrencyAPI.getCurencies().then(response=>{
            setCurrencyData(response);
            fetchTimezones()
        }).catch(error=>{
            setShowLoader(false)
        });
    }

    function fetchTimezones(){
        API.TimeZoneAPI.getTimeZones().then(response=>{
            setTimeZoneData(response);
            fetchCountries()
        }).catch(error=>{
            setShowLoader(false)
        });
    }

    function fetchCountries(){
        API.CountryAPI.getCountries().then(response=>{
           setCountryData(response)
           setShowLoader(false)
        }).catch(error=>{
            setShowLoader(false)
        });
    }


    function insertCity(cities){
        setQueryActive(true)
        API.CityAPI.insertCities(cities).then(response=>{
            cities.map((item) =>{setData(oldArray => [...oldArray, item])});
            setShowAddPopUp(false)
            setSelectedRows([]);

           responseFeedback(true)
        }).catch(error=>{
           responseFeedback(false)
        });
    }

    function fetchCities(){
        setShowLoader(true)
        API.CityAPI.getCities().then(response=>{
           setData(response);
           fetchCurrencies();
        }).catch(error=>{
            responseFeedback(false)
            setShowLoader(false)
        });

    }

    function updateUsers() {
        setQueryActive(true);
        API.CityAPI.updateCities(updatedRows.map((item)=>{return item.data})).then(response=>{
            responseFeedback(true)
        }).catch(error=>{
            responseFeedback(false)
        });
    }

    function removeCity() {
        setQueryActive(true);
        const selected = selectedRows.map((item)=>{return item.data})

        API.CityAPI.deleteCities(selected).then(response=>{
            setData([]);
            setSelectedRows([]);
            selected.map((item)=>setData(data.filter((row)=>{return item.cityName !== row.cityName})));
            responseFeedback(true);
        }).catch(error=>{
            responseFeedback(false);
        });
    }
}
