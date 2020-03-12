import React, {useState,useEffect,useReducer} from "react";
import '../Styles/userspage.css'


let selectedRows = [];
let data = []

export default function Table(props) {
    const [header, setHeader] = useState(props.header);
    const [updatedRows, setUpdatedRows] = useState([]);
    data = props.data;
    function existRow(data, rowNumb){
        for(let i = 0; i<data.length; i++){
            if(data[i].row == rowNumb) return true
        }
        return false
    }

    function handleChange(e) {
        const column = e.target.getAttribute('data-column');
        const rowNum = e.target.getAttribute('data-row');
        const {value, type, checked} = e.target;

        if(type === "checkbox"){
            if(checked){
                if(!existRow(selectedRows, rowNum)){
                    selectedRows.push({"row": rowNum, "data": data[rowNum]})
                }
            }else{
                selectedRows = selectedRows.filter(({ row }) => row !== rowNum);
            }
        }

        data[rowNum][header[column].key] = value;

        if(!existRow(updatedRows, rowNum)){
            updatedRows.push({"row": rowNum, "data": data[rowNum]});
            setUpdatedRows(updatedRows)
        }

        props.setUpdatedRows(updatedRows)
        props.setSelectedRows(selectedRows)
    }



    const renderTableHeader = () =>{
        return header.map((key, index) => {
            return <th key={index}>{key.key.toUpperCase()}</th>
        })
    };

    const giveTableRow = (row,index) => {
        return header.map((key, column) => {
            if(key.key==""){
                return <td> <input
                    data-column={column}
                    data-row={index}
                    onChange={handleChange}
                    name="isGoing"
                    type="checkbox" /></td>
            }else{
                if(key.editable){
                    return <td><input
                        data-column={column}
                        data-row={index}
                        type="text"
                        defaultValue={row[key.key]}
                        onChange={handleChange}/></td>
                }else{
                    return <td>{row[key.key]}</td>
                }
            }
        })
    };

    const renderTableData = () => {
        return props.data.map((row,index) => {
            return(
                <tr key={index}>
                    {giveTableRow(row,index)}
                </tr>
            )
        })
    };

    return(
        <div style={{transition: "transition: opacity 10s ease-in-out;",width: "100%"}}>
            <table id='students'>
                <thead>{renderTableHeader()}</thead>
                <tbody>
                    {renderTableData()}
                </tbody>

            </table>
        </div>
    )
}
