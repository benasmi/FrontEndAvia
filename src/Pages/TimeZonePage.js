import React, {useState, useEffect} from "react";
import SingleSelectionComponent from "../Components/SingleSelectionComponent";
import API from "../Networking/API";
import CustomLoader from "../Components/CustomLoader";
import UpdateCurrencyModal from "../Components/UpdateCurrencyModal";
import SnackbarFeedback from "../Components/SnackbarFeedback";
import UpdateTimeZoneModal from "../Components/UpdateTimeZoneModal";
import UseSnackbarContext from "../Contexts/UseSnackbarContext";

export default function TimeZonePage() {

    const [data, setData] = useState([]);
    const [showLoader, setShowLoader] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState({timeZone:""});

    const { addConfig } = UseSnackbarContext();

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
        console.log(updatedRow)
        API.TimeZoneAPI.updateTimeZones(updatedRow).then(response=>{
            const tempData = data.slice();
            tempData.map((item,idx)=>{if(item.id === updatedRow.id){
                tempData[idx] = updatedRow
            }});
            setData(tempData);
            setShowModal(false);
            responseFeedback(true)
        }).catch(error=>{
            responseFeedback(false)
        })
    }

    function responseFeedback(success){
        addConfig(success);
        setQueryActive(false)
    }

    return(
        <div className="content">
            {showLoader ? <CustomLoader/> :
                <SingleSelectionComponent
                    title={"Time Zone(SF)"}
                    header={headers}
                    data={data}
                    UpdateRow={UpdateRow}
                    DeleteRow={DeleteRow}
                />
            }

            <UpdateTimeZoneModal
                show={showModal}
                dataRow={selectedRow}
                setDataRow={setSelectedRow}
                updateTimeZone={updateTimezone}
                onHide={e=>{
                    setShowModal(false)
                }}
            />
            {isQueryActive ? <CustomLoader/> : null}
        </div>

    );
}