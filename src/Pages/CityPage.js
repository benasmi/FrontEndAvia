import React, {useEffect, useState} from 'react'
import '../Styles/userspage.css'
import axios from "axios"
import TableComponent from '../Components/TableComponent'
import {Button, ButtonToolbar} from "react-bootstrap"
import AddCityModal from "../Components/AddCityModal";
import CustomLoader from "../Components/CustomLoader";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

export default function CityPage() {
    //Data hooks
    const [data, setData] = useState([]);
    const [fetchedData, setFetchData] = useState(false);
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



    if(!fetchedData){
        setFetchData(true)
        fetchUsers()
    }


    useEffect(()=>{
        let temp = [{key:"", editable:true, selectable: false},
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
                    <h1 className="mt-5">Cities</h1>
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

    function createSelectorValues(data, value, displayValue){
        let temp = [];
        data.map((item) => {
            temp.push({value: item[value], displayValue: item[displayValue]})
        });
        return temp
    }

    function fetchCurrencies(){
        axios.get('https://intense-plateau-30917.herokuapp.com/currency/all', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(function (response) {
            let temp = [];
            Object.keys(response.data).map((currency)=>{
                temp.push(response.data[currency])
            });
            setCurrencyData(temp);
            fetchTimezones()
        }).catch(function (error) {
            setShowLoader(false)
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

    function fetchTimezones(){
        axios.get('https://intense-plateau-30917.herokuapp.com/timezone/all', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(function (response) {
            let temp = [];
            Object.keys(response.data).map((currency)=>{
                temp.push(response.data[currency])
            });
            setTimeZoneData(temp);
            fetchCountries()
        }).catch(function (error) {
            setShowLoader(false)
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

    function fetchCountries(){
        axios.get('https://intense-plateau-30917.herokuapp.com/country/all', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }).then(function (response) {
            let temp = [];
            Object.keys(response.data).map((currency)=>{
                temp.push(response.data[currency])
            });
            setCountryData(temp);
            setShowLoader(false)
        }).catch(function (error) {
            setShowLoader(false)
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


    function insertUsers(users){
        setQueryActive(true)
        axios.post('https://intense-plateau-30917.herokuapp.com/city/insert', users,{
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
            setShowLoader(false)
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
        axios.get('https://intense-plateau-30917.herokuapp.com/city/all', {
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
            setSelectedRows([])
            fetchCurrencies()
        }).catch(function (error) {
            makeSnackbar("Something went wrong! Please try again later.", false)
            setShowLoader(false)

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
        axios.post('https://intense-plateau-30917.herokuapp.com/city/update', updatedRows.map((item)=>{return item.data}),{
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
            makeSnackbar("City data updated successfully!", true)
        }).catch(function (error) {
            makeSnackbar("Something went wrong! Please try again later.", false)
            setQueryActive(false)
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

    function removeCity() {
        setQueryActive(true)
        var selected = selectedRows.map((item)=>{return item.data})
        var temp = data.slice()

        axios.post('https://intense-plateau-30917.herokuapp.com/city/delete', selected,{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }).then(function (response) {
            selected.map((item)=>{
                temp = temp.filter((row) => {return item.cityName !== row.cityName})});
            setData([])
            setData(temp);
            setSelectedRows([]);
            setQueryActive(false);
            makeSnackbar("All selected cities were removed successfully!", true)
        }).catch(function (error) {
            setShowLoader(false)
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
