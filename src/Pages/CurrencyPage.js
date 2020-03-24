import React, {useState, useEffect} from "react";
import SingleSelectionComponent from "../Components/SingleSelectionComponent";
import API from "../Networking/API";
import CustomLoader from "../Components/CustomLoader";
import UpdateCurrencyModal from "../Components/UpdateCurrencyModal";
import SnackbarFeedback from "../Components/SnackbarFeedback";
import UseSnackbarContext from "../Contexts/UseSnackbarContext";

export default function CurrencyPage() {

    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState({currency:""});
    const [showLoader, setShowLoader] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const { addConfig } = UseSnackbarContext();

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
                    title={"Currency(SF)"}
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

            {isQueryActive ? <CustomLoader/> : null}

        </div>

    );


    function responseFeedback(success){
        addConfig(success)
        setQueryActive(false)
    }
}