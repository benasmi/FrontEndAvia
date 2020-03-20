import React, {useState, useEffect} from "react";
import SingleSelectionComponent from "../Components/SingleSelectionComponent";
import API from "../Networking/API";
import CustomLoader from "../Components/CustomLoader";
import SnackbarFeedback from "../Components/SnackbarFeedback";
import UpdateSuggestionModal from "../Components/UpdateSuggestionModal";

export default function SuggestionPage() {

    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState({placeName:"", isFamilyFriendly:"", suggestionId:"", ticketPrice:""});
    const [showLoader, setShowLoader] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [showStatus, setShowStatus] = useState(false);
    const [snackbarConfig, setSnackbarConfig] = useState({isSuccessful: false});
    const [isQueryActive, setQueryActive] = useState(false);
    const headers = [
        {key:"placeName", editable:false, selectable: false},
        {key:"isFamilyFriendly", editable:false, selectable: false},
        {key:"ticketPrice", editable:false, selectable: false},
        {key:"suggestionId", editable:false, selectable: false},
        {key:"fk_cityName", editable:false, selectable: false},
        {key:"singleSelection", editable:false, selectable: false}

    ];

    useEffect(()=>{
        fetchSuggestions()
    },[])

    function fetchSuggestions(){
        setShowLoader(true)
        API.SuggestionAPI.getSuggestions().then(response=>{
            response.map((row)=>{
                row.imageUrl=row.imageUrl.substring(0,20)
            })
            setData(response)
            setShowLoader(false)
        }).catch(error=>{

        });
    }

    function UpdateRow(row) {
        setSelectedRow(row);
        setShowModal(true);
    }

    function DeleteRow(row) {
        setQueryActive(true)
        API.SuggestionAPI.deleteSuggestion(row).then(response=>{
            API.SuggestionAPI.getSuggestions().then(response=>{
                setData(response)
                responseFeedback(true)
            }).catch(error=>{
                responseFeedback(false)
            })
        }).catch(error=>{
            responseFeedback(false)
        });
    }

    function updateSuggestion(updatedRow){
        setQueryActive(true)
        API.SuggestionAPI.updateSuggestion(updatedRow).then(response=>{
            const tempData = data.slice();
            tempData.map((item,idx)=>{if(item.suggestionId === updatedRow.suggestionId){
                tempData[idx] = updatedRow
            }});
            setData(tempData);
            responseFeedback(true)
            setShowModal(false)
        }).catch(error=>{
            responseFeedback(false)
        });
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

            <UpdateSuggestionModal
                show={showModal}
                dataRow={selectedRow}
                setDataRow={setSelectedRow}
                updateSuggestion={updateSuggestion}
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