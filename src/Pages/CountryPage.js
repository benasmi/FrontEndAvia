import React, {useState, useEffect} from "react";
import SingleSelectionComponent from "../Components/SingleSelectionComponent";
import API from "../Networking/API";
import CustomLoader from "../Components/CustomLoader";
import UpdateCurrencyModal from "../Components/UpdateCurrencyModal";
import SnackbarFeedback from "../Components/SnackbarFeedback";
import UpdateCountryModal from "../Components/UpdateCountryModal";

export default function CountryPage() {

    const [data, setData] = useState([]);

    const [selectedRow, setSelectedRow] = useState({country:"", countryCode:"", numericCode:""});
    const [showLoader, setShowLoader] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [showStatus, setShowStatus] = useState(false);
    const [snackbarConfig, setSnackbarConfig] = useState({isSuccessful: false});
    const [isQueryActive, setQueryActive] = useState(false);

    const headers = [
        {key:"country", editable:false, selectable: false},
        {key:"countryCode", editable:false, selectable: false},
        {key:"numericCode", editable:false, selectable: false},
        {key:"singleSelection", editable:false, selectable: false}
    ];

    useEffect(()=>{
        fetchCountry()
    },[])

    function fetchCountry(){
        setShowLoader(true)
        API.CountryAPI.getCountries().then(response=>{
            setData(response)
            setShowLoader(false)
        }).catch(error=>{

        });
    }

    function DeleteRow(row) {
        setQueryActive(true)
        API.CountryAPI.deleteCountry(row).then(response=>{
            API.CountryAPI.getCountries().then(response=>{
                setData(response)
                responseFeedback(true)
            }).catch(error=>{
                responseFeedback(false)
            })
        }).catch(error=>{
            responseFeedback(false)
        });
    }

    function updateCountry(updatedRow){
        setQueryActive(true)
        API.CountryAPI.updateCountry(updatedRow).then(response=>{
            const tempData = data.slice();
            tempData.map((item,idx)=>{if(item.numericCode === updatedRow.numericCode){
                tempData[idx] = updatedRow
            }});
            setData(tempData);
            responseFeedback(true)
            setShowModal(false)
        }).catch(error=>{
            responseFeedback(false)
        });
    }

    function UpdateRow(row) {
        setShowModal(true)
        setSelectedRow(row)
    }

    return(
        <div className="content">
            {showLoader ? <CustomLoader/> :
                <SingleSelectionComponent
                    title={"Currency"}
                    header={headers}
                    data={data}
                    UpdateRow={UpdateRow}
                    DeleteRow={DeleteRow}
                />
            }

            <UpdateCountryModal
                show={showModal}
                dataRow={selectedRow}
                setDataRow={setSelectedRow}
                updateCountry={updateCountry}
                onHide={e=>{
                    setShowModal(false)
                }}
            />

            <SnackbarFeedback
                show={showStatus}
                setShow={setShowStatus}
                snackbarConfig={snackbarConfig}
            />

            {isQueryActive ? <CustomLoader/> : null}
        </div>

    );


    function responseFeedback(success){
        setSnackbarConfig({isSuccessful: success})
        setShowStatus(true);
        setQueryActive(false)
    }
}