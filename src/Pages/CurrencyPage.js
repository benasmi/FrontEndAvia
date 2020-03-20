import React, {useState, useEffect} from "react";
import SingleSelectionComponent from "../Components/SingleSelectionComponent";
import API from "../Networking/API";
import CustomLoader from "../Components/CustomLoader";
import UpdateCurrencyModal from "../Components/UpdateCurrencyModal";
import SnackbarFeedback from "../Components/SnackbarFeedback";

export default function CurrencyPage() {

    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState({currency:""});
    const [showLoader, setShowLoader] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [showStatus, setShowStatus] = useState(false);
    const [snackbarConfig, setSnackbarConfig] = useState({isSuccessful: false});
    const [isQueryActive, setQueryActive] = useState(false);


    const headers = [
        {key:"id", editable:false, selectable: false},
        {key:"currency", editable:false, selectable: false},
        {key:"singleSelection", editable:false, selectable: false}

    ];

    useEffect(()=>{
        fetchCurrency()
    },[])


    function fetchCurrency(){
        setShowLoader(true)
        API.CurrencyAPI.getCurencies().then(response=>{
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
        API.CurrencyAPI.deleteCurrency(row).then(response=>{
            API.CurrencyAPI.getCurencies().then(response=>{
                setData(response);
                responseFeedback(true)
            }).catch(error=>{
                responseFeedback(false)
            })
        }).catch(error=>{
            responseFeedback(false)
        });
    }

    function updateCurrency(updatedRow){
        setQueryActive(true)
        console.log(updatedRow)
        API.CurrencyAPI.updateCurrency(updatedRow).then(response=>{
            responseFeedback(true)
            setShowModal(false)
            const tempData = data.slice();
            tempData.map((item,idx)=>{if(item.id === updatedRow.id){
                tempData[idx] = updatedRow
            }})
            setData(tempData)
        }).catch(error=>{
            responseFeedback(false)
        });
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
                updateCurrency={updateCurrency}
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