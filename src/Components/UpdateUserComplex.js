import React, {useState} from "react";
import '../Styles/userspage.css'
import {Modal, Button, Form, Row, Col} from "react-bootstrap"
import API from "../Networking/API";
import {ReactComponent as Back} from '../Images/arrowBack.svg'
import {CloseButton} from "react-bootstrap";
import UseSnackbarContext from "../Contexts/UseSnackbarContext";
import UseAlertDialogContext from "../Contexts/UseAlertDialogContext";



var dataRows = []

export default function UpdateUserComplex(props){
    const [data, setData] = useState(props.data);
    const { addConfig } = UseSnackbarContext();
    const { addAlertConfig } = UseAlertDialogContext();

    function submitForm() {
            return prepareUpdatedRows()
    }

    function removeCreditCard(row, col){
        addAlertConfig("Remove","Do you want to remove credit card for this user?", function () {
            removeCreditCardFromDB(row,col)
        });
    }

    function removeCreditCardFromDB(row, col){
        const vals = [...data];
        var card = vals[row].cards[col]
        API.CardsAPI.removeCard(card).then(response=>{
            vals[row].cards.splice(col, 1);
            setData(vals)
            addConfig(true)
        }).catch(error=>{
            addConfig(false)
        })
    }

    function handleChanges(e, row, col=0){
        const vals = [...data];
        const {name, value} = e.target;
        vals[row].user[name] = value;
        if(vals[row].cards.length !== 0 ){
            vals[row].cards[col][name] = value;
        }
        setData(vals)

        if(!rowExists(row)){
            dataRows.push(row)
        }
    }

    function rowExists(row){
        for(let i = 0; i<dataRows.length; i++){
            if(dataRows[i] === row) return true
        }
        return false
    }

    function prepareUpdatedRows() {
        let tempo = []
        dataRows.map((row)=>{
            tempo.push(data[row])
        })
        return tempo
    }


    return(
        <div className="w-100  overflow-auto d-flex flex-column align-items-center p-3">
            <div className="w-75 d-flex flex-column align-items-center p-3">
                <div className="w-75 d-flex justify-content-center">
                    <Back style={{width:"48px", height:"48px", marginRight:"12px"}} onClick={props.closeComplexForm}/>
                    <h1>Add user with credit cards(SP)</h1>
                </div>

                {data.map((data, idx)=>{
                    return <div className="w-50 mt-5 p-3 border rounded">
                        <div className="w-100 d-flex justify-content-between">
                            <h4>User details</h4>
                        </div>
                        <Row>
                            <Col>
                                <Form.Control placeholder="Name"  name="name" value={data.user.name} onChange={e=>handleChanges(e,idx,)}/>
                            </Col>
                            <Col>
                                <Form.Control placeholder="Surname" name="surname" value={data.user.surname} onChange={e=>handleChanges(e,idx,)} />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mt-4">
                                <Form.Control disabled placeholder="Email" name="email" value={data.user.email} onChange={e=>handleChanges(e,idx,)}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mt-4">
                                <Form.Control type="password" disabled placeholder="Password" name="password" value={data.user.password} onChange={e=>handleChanges(e,idx,)}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mt-4">
                                <Form.Control type="date" placeholder="Birthday" name="birthday" value={data.user.birthday} onChange={e=>handleChanges(e,idx)}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mt-4">
                                <Form.Control as="select" name="fk_country" value={data.user.fk_country} onChange={e=>handleChanges(e,idx)}>
                                    <option>Select country</option>
                                    {props.selectableData.countries.map((item)=>{
                                        return (<option value={item.numericCode}>{item.country}</option>)
                                    })}
                                </Form.Control>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mt-4">
                                <Form.Control as="select" name="gender" value={data.user.gender} onChange={e=>handleChanges(e,idx)}>
                                    <option>Select gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </Form.Control>
                            </Col>
                        </Row>

                        <h4 className="mt-5">Credit card details</h4>
                        {data.cards.map((dataRow, cardIdx)=>{
                            return(
                                <div className="w-100 mb-3">
                                    <div className="w-100 d-flex mt-2 justify-content-end">
                                        <CloseButton onClick={e=>{removeCreditCard(idx,cardIdx)}}/>
                                    </div>
                                    <Row>
                                        <Col>
                                            <Form.Control disabled value={dataRow.cardNumber} name="cardNumber" placeholder="Card number" onChange={e=>handleChanges(e,idx,cardIdx)}/>
                                        </Col>
                                    </Row>
                                    <Row className="mt-4">
                                        <Col>
                                            <Form.Control maxlength="3" value={dataRow.csv} name="csv" placeholder="CSV"  onChange={e=>handleChanges(e,idx,cardIdx)}/>
                                        </Col>
                                        <Col>
                                            <Form.Control maxlength="4" value={dataRow.expYear} name="expYear" placeholder="Exp. Year"  onChange={e=>handleChanges(e,idx,cardIdx)}/>
                                        </Col>
                                        <Col>
                                            <Form.Control maxlength="2" value={dataRow.expMonth} name="expMonth" placeholder="Exp. Month"  onChange={e=>handleChanges(e,idx,cardIdx)}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="mt-4">
                                            <Form.Control as="select" name="fk_cardProvider" value={dataRow.fk_cardProvider} onChange={e=>handleChanges(e,idx,cardIdx)}>
                                                <option>Select payment method</option>
                                                {props.selectableData.cardsProviderData.map((item)=>{
                                                    return (<option value={item.id}>{item.provider}</option>)
                                                })}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })}
                    </div>
                })}

                <div className="w-50 mt-3 d-flex justify-content-end">
                    <Button variant="primary" onClick={e=>{
                        addAlertConfig("Update", "Do you want to make these changes?", function () {
                            props.updateComplexUserForm(submitForm())
                        })
                    }}>Update</Button>
                </div>
                <div className="w-100 mb-5 d-flex justify-content-start"/>
            </div>

        </div>

    )
}
