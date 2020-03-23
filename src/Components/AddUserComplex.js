import React, {useState} from "react";
import '../Styles/userspage.css'
import {Modal, Button, Form, Row, Col} from "react-bootstrap"
import {ReactComponent as Add} from '../Images/add.svg'
import {ReactComponent as Close} from '../Images/close.svg'
import {ReactComponent as Back} from '../Images/arrowBack.svg'
import {CloseButton} from "react-bootstrap";

export default function AddUserComplex(props){
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [date, setDate] = useState("");
    const [gender, setGender] = useState("Select gender...");
    const [users, setUsers] = useState([]);
    const [city, setCity] = useState("Select country...");
    const [cardProvider, setCardProvider] = useState("Select payment method....");

    const [dataCards, setDataCards] = useState([{cardNumber:"", csv: "", expYear: "", expMonth: "", fk_cardProvider: 0}]);


    function removeCreditCard(row){
        var vals = dataCards.slice()
        vals = vals.filter((item, idx)=>{return idx!==row})
        console.log(vals)
        setDataCards(vals)

    }

    function submitForm() {
        return {
            user: {"name": name, "surname": lastName, "email": email, "birthday": date, "gender": gender, "password": password, "fk_country": parseInt(city)},
            cards: dataCards
        }
    }
    
    function handleCardsData(row, e) {
        const vals = [...dataCards]
        const {name, value} = e.target;
        vals[row][name] = value
        setDataCards(vals)
    }

    function addCreditCard(){
        const cCards = dataCards.slice();
        cCards.push({cardNumber:"",csv: "", expYear: "", expMonth: "", fk_cardProvider: 0});
        setDataCards(cCards);
    }

    return(
        <div className="w-100 h-100  overflow-auto d-flex flex-column align-items-center p-3">
            <div className="w-75 h-100 d-flex flex-column align-items-center p-3">
                <div className="w-75 d-flex mb-3 justify-content-start">
                    <Back style={{width:"48px", height:"48px"}} onClick={props.closeComplexForm}/>
                </div>
                <h1>Add user with credit cards(SP)</h1>
                <div className="w-50 ">
                    <h4>User details</h4>
                    <Row>
                        <Col>
                            <Form.Control placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                        </Col>
                        <Col>
                            <Form.Control placeholder="Surname" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mt-4">
                            <Form.Control placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mt-4">
                            <Form.Control placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mt-4">
                            <Form.Control placeholder="Birthday" value={date} onChange={(e)=>setDate(e.target.value)}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mt-4">
                            <Form.Control as="select" value={city} onChange={(e)=>setCity(e.target.value)}>
                                <option>Select country</option>
                                {props.selectableData.countries.map((item)=>{
                                    return (<option value={item.numericCode}>{item.country}</option>)
                                })}
                            </Form.Control>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="mt-4">
                            <Form.Control as="select" value={gender} onChange={(e)=>setGender(e.target.value)}>
                                <option>Select gender</option>
                                <option>Male</option>
                                <option>Female</option>
                            </Form.Control>
                        </Col>
                    </Row>

                    <h4 className="mt-5">Credit card details</h4>
                    {dataCards.map((dataRow, idx)=>{
                        return(
                            <div className="w-100 mb-3">
                                <div className="w-100 d-flex mt-2 justify-content-end">
                                    <CloseButton onClick={e=>removeCreditCard(idx)}/>
                                </div>
                                <Row>
                                    <Col>
                                        <Form.Control value={dataRow.cardNumber} name="cardNumber" placeholder="Card number" onChange={e=>handleCardsData(idx,e)}/>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col>
                                        <Form.Control value={dataRow.csv} name="csv" placeholder="CSV"  onChange={e=>handleCardsData(idx,e)}/>
                                    </Col>
                                    <Col>
                                        <Form.Control value={dataRow.expYear} name="expYear" placeholder="Exp. Year"  onChange={e=>handleCardsData(idx,e)}/>
                                    </Col>
                                    <Col>
                                        <Form.Control value={dataRow.expMonth} name="expMonth" placeholder="Exp. Month"  onChange={e=>handleCardsData(idx,e)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="mt-4">
                                        <Form.Control as="select" name="fk_cardProvider" value={dataRow.fk_cardProvider} onChange={(e)=>handleCardsData(idx,e)}>
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
                    <div className="w-100 d-flex justify-content-end">
                        <Add style={{width:"32px", height:"32px"}} onClick={addCreditCard} />
                    </div>

                    <div className="w-100 mb-5 d-flex justify-content-center">
                        <Button variant="success" onClick={e=>props.submitComplexUserForm(submitForm())}>Submit</Button>
                    </div>
                    <div className="w-100 mb-5 d-flex justify-content-start">

                    </div>
                </div>
            </div>
        </div>

    )
}