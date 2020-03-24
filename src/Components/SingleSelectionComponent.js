import React, {useEffect, useState} from 'react'
import '../Styles/userspage.css'
import TableComponent from '../Components/TableComponent'
import UseAlertDialogContext from "../Contexts/UseAlertDialogContext";

export default function SingleSelectionComponent(props) {

    const { addAlertConfig } = UseAlertDialogContext();

    return(
        <div className="content">
              <div className="content">
                    <h1 className="mt-5">{props.title}</h1>
                    <TableComponent
                        header={props.header}
                        data={props.data}
                        UpdateRow={props.UpdateRow}
                        DeleteRow={function (row){
                            addAlertConfig("Remove row","Do you want to remove this row? Other rows who have this row as a foreign key will also be affected and deleted", function () {
                                props.DeleteRow(row)
                            })
                        }}
                    />
                </div>
        </div>
    );
}
