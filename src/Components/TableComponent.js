import React, {useState,useEffect,useReducer} from "react";
import Table from "react-bootstrap/table"
import '../Styles/table.css'



export default function TableComponent(props) {


    const [header, setHeader] = useState(props.header);
    const [updatedRows, setUpdatedRows] = useState([]);
    const [initialized, setInit] = useState(false);



    function existRow(data, rowNumb){
        console.log(data)
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
                if(!existRow(props.selectedRows, rowNum)){
                    const sRows = props.selectedRows.slice();
                    sRows.push({"row": rowNum, "data": props.data[rowNum]});
                    props.setSelectedRows(sRows);
                }
            }else{
                let sRows = props.selectedRows.slice();
                sRows = sRows.filter(({ row }) => row !== rowNum);
                props.setSelectedRows(sRows)
            }
        }

        const vals = [...props.data];
        vals[rowNum][header[column].key] = type==='checkbox' ? checked : value;
        props.setData(vals);

        if(!existRow(updatedRows, rowNum)){
            updatedRows.push({"row": rowNum, "data": props.data[rowNum]});
            setUpdatedRows(updatedRows)
        }

        props.setUpdatedRows(updatedRows);
    }



    const renderTableHeader = () =>{
        return header.map((key, index) => {
            return <th key={index}>{key.key === 'checkbox' ? "#" : key.key.toUpperCase()}</th>
        })
    };

    const giveTableRow = (row,index) => {
        return header.map((key, column) => {
            if(key.key==="checkbox"){
                return <td> <input
                    data-column={column}
                    data-row={index}
                    checked={props.data[index][header[column].key]}
                    onChange={handleChange}
                    type="checkbox" /></td>
            }else{
                if(key.editable){
                    return <td><input
                        data-column={column}
                        data-row={index}
                        value={props.data[index][header[column].key]}
                        type="text"
                        defaultValue={row[key.key]}
                        onChange={handleChange}/></td>
                }else if(key.selectable){
                    return <td><select
                        data-column={column}
                        data-row={index}
                        defaultValue={row[key.key]}
                        value={props.data[index][header[column].key]}
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
