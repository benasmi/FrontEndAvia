import React, {useEffect, useState} from 'react'
import '../Styles/userspage.css'
import TableComponent from '../Components/TableComponent'

export default function SingleSelectionComponent(props) {
    return(
        <div className="content">
              <div className="content">
                    <h1 className="mt-5">{props.title}</h1>
                    <TableComponent
                        header={props.header}
                        data={props.data}
                        UpdateRow={props.UpdateRow}
                        DeleteRow={props.DeleteRow}
                    />
                </div>
        </div>
    );
}
