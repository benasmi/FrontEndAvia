import React, {useState, useEffect} from "react";
import SingleSelectionComponent from "../Components/SingleSelectionComponent";
import API from "../Networking/API";
import CustomLoader from "../Components/CustomLoader";
import UpdateCurrencyModal from "../Components/UpdateCurrencyModal";
import SnackbarFeedback from "../Components/SnackbarFeedback";

export default function TimeZonePage() {

    const [data, setData] = useState([]);
    const [showLoader, setShowLoader] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState({timeZone:""});

    const [showStatus, setShowStatus] = useState(false);
    const [snackbarConfig, setSnackbarConfig] = useState({isSuccessful: false});
    const [isQueryActive, setQueryActive] = useState(false);


    const headers = [
        {key:"id", editable:false, selectable: false},
        {key:"timeZone", editable:false, selectable: false},
        {key:"singleSelection", editable:false, selectable: false}

    ];

    useEffect(()=>{
        fetchTimeZone()
    },[])

    function fetchTimeZone(){
        setShowLoader(true)
        API.TimeZoneAPI.getTimeZones().then(response=>{
            setData(response)
            setShowLoader(false)
        }).catch(error=>{

        });
    }

    function UpdateRow(row) {
        setSelectedRow(row);
        setShowModal(true)
    }

    function DeleteRow(row) {
        setQueryActive(true)
        API.TimeZoneAPI.deleteTimeZones(row).then(response=>{
            API.TimeZoneAPI.getTimeZones().then(response=>{
                setData(response)
                responseFeedback(true)
            }).catch(error=>{
                responseFeedback(false)
            })
        }).catch(error=>{
            responseFeedback(false)
        });
    }

    function updateTimezone(updatedRow){
        setQueryActive(true)
        API.TimeZoneAPI.updateTimeZones(updatedRow).then(response=>{
            responseFeedback(true)
        }).catch(error=>{
            responseFeedback(false)
        })
    }

    function responseFeedback(success){
        setSnackbarConfig({isSuccessful: success})
        setShowStatus(true);
        setQueryActive(false)
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

            <UpdateCurrencyModal
                show={showModal}
                dataRow={selectedRow}
                setDataRow={setSelectedRow}
                updateTimezone={updateTimezone}
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
}