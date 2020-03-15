import React, {useState,useEffect,useReducer} from "react";
import Table from "react-bootstrap/table"
import '../Styles/table.css'


let selectedRows = [];
let data = [];

export default function TableComponent(props) {
    const [header, setHeader] = useState(props.header);
    const [updatedRows, setUpdatedRows] = useState([]);
    data = props.data;

    function existRow(data, rowNumb){
        for(let i = 0; i<data.length; i++){
            if(data[i].row === rowNumb) return true
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

        props.setUpdatedRows(updatedRows);
        props.setSelectedRows(selectedRows)
    }



    const renderTableHeader = () =>{
        return header.map((key, index) => {
            return <th key={index}>{key.key.toUpperCase()}</th>
        })
    };

    const giveTableRow = (row,index) => {
        return header.map((key, column) => {
            if(key.key===""){
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
                }else if(key.selectable){
                    console.log("Gavau selectorius:", key.selectableData)
                    return <td><select
                        data-column={column}
                        data-row={index}
                        defaultValue={row[key.key]}
                        onChange={handleChange}>
                        {key.selectableData.map((element)=>{
                            return (<option value={element.value}>{element.displayValue}</option>)
                        })}
                    </select></td>
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
        <div style={{overflowY:"scroll", maxHeight: "70%",background: "white",width: "80%"}}>
                <Table id="table" striped bordered hover responsive="lg" size="lg">
                    <thead>
                    <tr>
                        {renderTableHeader()}
                    </tr>
                    </thead>

                    <tbody>
                        {renderTableData()}
                    </tbody>
                </Table>
        </div>
    )
}
