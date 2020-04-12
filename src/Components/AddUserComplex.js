import React, {useState} from "react";
import '../Styles/userspage.css'
import {Modal, Button, Form, Row, Col} from "react-bootstrap"
import {ReactComponent as Add} from '../Images/add.svg'
import {ReactComponent as Close} from '../Images/close.svg'
import {ReactComponent as Back} from '../Images/arrowBack.svg'
import {CloseButton} from "react-bootstrap";

export default function AddUserComplex(props){
    const [data, setData] = useState([{user: {name: "", surname: "", email: "", birthday: "", gender: "-1", password: "", fk_country: "-1"}, cards: [{cardNumber:"", csv: "", expYear: "", expMonth: "", fk_cardProvider: -1}]}]);
    const [validated, setValidated] = useState(false)

    function submitForm(event) {
        const form = event.currentTarget;

        event.stopPropagation();
        event.preventDefault();
        setValidated(true);

        if(form.checkValidity() === true){
            props.submitComplexUserForm(data)
        }

    }

    function addCreditCard(row){
        const vals = [...data];
        vals[row].cards.push({cardNumber:"", csv: "", expYear: "", expMonth: "", fk_cardProvider: 0});
        setData(vals);
    }

    function removeCreditCard(row, col){
        const vals = [...data];
        vals[row].cards.splice(col, 1);
        setData(vals)
    }

    function addUser(){
        const vals = [...data];
        vals.push({user: {name: "", surname: "", email: "", birthday: "", gender: "-1", password: "", fk_country: "-1"}, cards: [{cardNumber:"", csv: "", expYear: "", expMonth: "", fk_cardProvider: -1}]});
        setData(vals)
    }

    function removeUser(row){
        const vals = [...data];
        vals.splice(row,1);
        setData(vals)
    }

    function handleChanges(e, row, col=0){
        const vals = [...data];
        const {name, value} = e.target;
        vals[row].user[name] = value;
        vals[row].cards[col][name] = value;
        setData(vals)
    }

    function validateFields() {

    }




    return(
        <div className="w-100  overflow-auto d-flex flex-column align-items-center p-3">
            <div className="w-75 d-flex flex-column align-items-center p-3">
                <div className="w-75 d-flex justify-content-center">
                    <Back style={{width:"48px", height:"48px", marginRight:"12px"}} onClick={props.closeComplexForm}/>
                    <h1>Add user with credit cards(SP)</h1>
                </div>
                <Form className="w-100 d-flex flex-column justify-content-center align-items-center" noValidate validated={validated} onSubmit={submitForm}>
                {data.map((data, idx)=>{
                    return <div className="w-50 mt-5 p-3 border rounded">
                        <div className="w-100 d-flex justify-content-between">
                            <h4>User details</h4>
                            <Close style={{width:"16px", height:"16px"}} onClick={e=>{removeUser(idx)}} />
                        </div>
                        <Row>
                            <Form.Group as={Col} controlId="validationCustom01">
                                <Form.Control required placeholder="Name"  name="name" value={data.user.name} onChange={e=>handleChanges(e,idx,)}/>
                                <Form.Control.Feedback type="invalid">Name is required</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} controlId="validationCustom02">
                                <Form.Control required placeholder="Surname" name="surname" value={data.user.surname} onChange={e=>handleChanges(e,idx,)} />
                                <Form.Control.Feedback type="invalid">Surname is required</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} controlId="validationCustom03">
                                <Form.Control required placeholder="Email" name="email" value={data.user.email} onChange={e=>handleChanges(e,idx,)}/>
                                <Form.Control.Feedback type="invalid">Email is required</Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} controlId="validationCustom04">
                                <Form.Control required type="password" placeholder="Password" name="password" value={data.user.password} onChange={e=>handleChanges(e,idx,)}/>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} controlId="validationCustom05">
                                <Form.Control required type="date" placeholder="Birthday" name="birthday" value={data.user.birthday} onChange={e=>handleChanges(e,idx)}/>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} controlId="validationCustom06">
                                <Form.Control  as="select" name="fk_country" value={data.user.fk_country} onChange={e=>handleChanges(e,idx)}>
                                    <option disabled value="-1">Select country</option>
                                    {props.selectableData.countries.map((item)=>{
                                        return (<option value={item.numericCode}>{item.country}</option>)
                                    })}
                                </Form.Control>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} controlId="validationCustom04">
                                <Form.Control as="select" name="gender" value={data.user.gender} onChange={e=>handleChanges(e,idx)}>
                                    <option disabled value="-1">Select gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </Form.Control>
                            </Form.Group>
                        </Row>

                        <h4 className="mt-5">Credit card details</h4>
                        {data.cards.map((dataRow, cardIdx)=>{
                            return(
                                <div className="w-100 mb-3">
                                    <div className="w-100 d-flex mt-2 justify-content-end">
                                        <CloseButton onClick={e=>{removeCreditCard(idx,cardIdx)}}/>
                                    </div>
                                    <Row>
                                        <Form.Group as={Col} controlId="validationCustom06">
                                            <Form.Control required value={dataRow.cardNumber} name="cardNumber" placeholder="Card number" onChange={e=>handleChanges(e,idx,cardIdx)}/>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group as={Col} controlId="validationCustom06">
                                            <Form.Control required maxlength="3" value={dataRow.csv} name="csv" placeholder="CSV"  onChange={e=>handleChanges(e,idx,cardIdx)}/>
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="validationCustom06">
                                            <Form.Control required maxlength="4" value={dataRow.expYear} name="expYear" placeholder="Exp. Year"  onChange={e=>handleChanges(e,idx,cardIdx)}/>
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="validationCustom06">
                                            <Form.Control required maxlength="2" value={dataRow.expMonth} name="expMonth" placeholder="Exp. Month"  onChange={e=>handleChanges(e,idx,cardIdx)}/>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Control as="select" name="fk_cardProvider" value={dataRow.fk_cardProvider} onChange={e=>handleChanges(e,idx,cardIdx)}>
                                                <option disabled value="-1">Select payment method</option>
                                                {props.selectableData.cardsProviderData.map((item)=>{
                                                    return (<option value={item.id}>{item.provider}</option>)
                                                })}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })}
                        <div className="w-100 d-flex justify-content-end">
                            <Add style={{width:"32px", height:"32px"}} onClick={e=>{addCreditCard(idx)}} />
                        </div>

                    </div>
                })}

                <div className="w-50 mt-3 d-flex justify-content-end">
                    <Button variant="primary" type="submit" >Submit</Button>
                    <Button className="ml-4" variant="success" onClick={e=>{addUser()}}>Add user</Button>
                </div>
                </Form>

                <div className="w-100 mb-5 d-flex justify-content-start"/>
                </div>

        </div>

    )
}

/*



 */