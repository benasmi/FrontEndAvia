import React from "react";
import {Button, ButtonToolbar, Col, Form, Row} from "react-bootstrap";
import {useState, useEffect} from "react"
import DatePicker from "react-datepicker"
import '../Styles/styles.css'
import API from "../Networking/API";
import TableComponent from "../Components/TableComponent";
import SnackbarFeedback from "../Components/SnackbarFeedback";
import CustomLoader from "../Components/CustomLoader";
import UseSnackbarContext from "../Contexts/UseSnackbarContext";
import StatisticsMoreInfo from "../Components/StatisticsMoreInfo";

require('react-datepicker/dist/react-datepicker.css')

export default function StatisticsPage(){
    const [reqBody, setReqBody] = useState({hourStartBound: "4", hourEndBound: "6", startDate:"2020-02-02", stopDate: "2020-03-03", showPayments: true});
    const [resBody, setResBody] = useState([]);
    const [showMoreInfo, setShowMoreInfo] = useState(false);
    const [moreData, setMoreData] = useState({});

    const [isQueryActive, setQueryActive] = useState(false);
    const { addConfig } = UseSnackbarContext();


    function handleChange(e) {
        const {name, value, type, checked} = e.target;
        let body = Object.assign({}, reqBody);
        body[name] = type==="checkbox" ? checked : value;
        setReqBody(body)
    }

    const headers = [
        {key:"fullName", display: "Name", editable:false, selectable: false},
        {key:"hourDuration", display: "H", editable:false, selectable: false},
        {key:"minuteDuration", display: "Min", editable:false, selectable: false},
        {key:"totalDifCardsPerUser", display: "C/User", editable:false, selectable: false},
        {key:"totalPaymentPerReservation", display: "PC/Res", editable:false, selectable: false},
        {key:"totalPaymentSumPerReservation", display: "PS/Res", editable:false, selectable: false},
        {key:"totalDifCardsUsedPerReservation", display: "CU/Res", editable:false, selectable: false},
        {key:"moreInfo", display:"Info",editable:false,selectable: false}
    ];

    const paymentHeaders = [
        {key:"paymentId", display: "Id", editable:false, selectable: false},
        {key:"paymentAmount", display: "Amount", editable:false, selectable: false},
        {key:"paymentDate", display: "Date", editable:false, selectable: false},
        {key:"fk_cardNumber", display: "Card", editable:false, selectable: false},
        {key:"fk_currency", display: "Currency", editable:false, selectable: false},
        {key:"fk_reservationId", display: "Reservation Id", editable:false, selectable: false}
    ];

    function formStats(){
        setQueryActive(true)
        API.StatsAPI.getFlightStats(reqBody).then(response=>{
            const obj = [];
            for (const key of Object.keys(response)){
                obj.push({flightNumber: key, reservations: response[key]})
            }
            console.log(obj);
            setResBody(obj);
            responseFeedback(true)
        }).catch(error=>{
            responseFeedback(false)
        })
    }

    /*
    { flightNumber: "FR7621", fullName: "Leory Rojas", email: "leory.rojas@gmail.com", hourDuration: 5, minuteDuration: 0, reservationId: "40", totalDifCardsPerUser: 2, totalPaymentPerReservation: 4, totalPaymentSumPerReservation: 158, totalDifCardsUsedPerReservation: 2 }
     */
    function moreInfo(data) {
        Promise.all([
            getUserCards(data.email),
            getAllPaymentsByReservation({reservationId: data.reservationId}),
            getAllCardsForReservation({reservationId: data.reservationId})
        ])
            .then(function (responses) {
                let c = responses[0].cards;
                let p = responses[1].payments;
                let cr = responses[2].cardsInReservation;
                setMoreData({cards: c, payments: p, cardsInReservation: cr});
            }).then(function (data) {
                setShowMoreInfo(true)
        }).catch(function (error) {
            // if there's an error, log it
            console.log(error);
        });

    }

    return(
        <div className="content overflow-auto">
            <h1 className="mt-5">Flights statistics page(L3)</h1>
            <h4 className="mt-2">Form statistics using duration and dates bound</h4>

            <div className="mt-5 d-flex  flex-column w-50 justify-content-center align-content-center">
                <Row>
                    <Col>
                        <Form.Label>From hour</Form.Label>
                        <Form.Control placeholder="From Hour" name="hourStartBound" onChange={handleChange}/>
                    </Col>
                    <Col >
                        <Form.Label>To hour</Form.Label>
                        <Form.Control placeholder="To Hour" name="hourEndBound" onChange={handleChange} />
                    </Col>
                    <Col>
                        <Form.Label>Start date</Form.Label>
                        <Form.Control type="date"  placeholder="From Hour" name="startDate" onChange={handleChange}/>
                    </Col>
                    <Col >
                        <Form.Label>End date</Form.Label>
                        <Form.Control type="date" placeholder="To Hour" name="stopDate" onChange={handleChange} />
                    </Col>
                    <Col className="align-self-end">
                        <Form.Check  name="showPayments" type="checkbox" label="Show payments" onChange={handleChange} />
                    </Col>
                </Row>
            </div>

            <ButtonToolbar className="mt-5">
                <Button className="ml-0" variant="primary" onClick={formStats}>Form statistics</Button>
            </ButtonToolbar>

            {
                resBody.length !==0 ?
                    <div className=" w-75 mt-4 d-flex flex-column align-items-center">
                        {
                            resBody.map((data=>{
                                console.log(resBody);
                                return <div className="mt-4 border p-3 border-top w-75 d-flex flex-column d-flex align-items-center">
                                    <div className="w-100  d-flex align-items-start">
                                        <h3>Flight id - {data.flightNumber}</h3>
                                    </div>
                                    {data.reservations.map(dataRow=>{
                                        return <div className="w-100 border p-3 mt-3 d-flex flex-column align-items-center">
                                            <TableComponent
                                                header={headers}
                                                overflow={false}
                                                data={[dataRow]}
                                                moreInfo={moreInfo}
                                            />
                                            {(dataRow.payments !== null) ? <TableComponent
                                                    overflow={false}
                                                    header={paymentHeaders}
                                                    data={dataRow.payments}
                                                    size="sm"
                                                />: null}

                                            {dataRow.payments !== null ? <h4>Total payment sum: {totalPaymentSum(dataRow.payments)}</h4> : null}

                                            </div>


                                    })}

                                    <div className="w-75 mt-5 d-flex justify-content-end">
                                        <h3>Reservations in flight: {data.reservations.length}</h3>
                                    </div>
                                    
                                </div>
                            }))
                        }
                        <h4 className="mt-5">Total flights {resBody.length}</h4>
                    </div>
                    : <h4 className="mt-5">No results match query</h4>
            }
            {isQueryActive ? <CustomLoader/> : null}

            {showMoreInfo ? <StatisticsMoreInfo
                show={showMoreInfo}
                data={moreData}
                onHide={e=>{
                    setShowMoreInfo(false)
                }}
            /> : null}

        </div>
    );

     function getUserCards(data){
        return API.CardsAPI.getCardsByUser(data).then(response=>{
            return ({cards: response})
        }).catch(error=>{
            responseFeedback(false)
        })
    }

    function totalPaymentSum(data){
        var sum = 0;
        data.map(dataRow=>{
            sum+=dataRow.paymentAmount;
        });
        return sum;
    }

    function totalPaymentFlight(){
         var sum = 0;

         resBody.map(dataRow=>{
             dataRow.reservations.map(reserv=>{
                sum+=totalPaymentSum(reserv.payments)
             })
         })
        return sum;
    }

     function getAllPaymentsByReservation(id){
         return API.PaymentsAPI.getPaymentsByReservation(id).then(response=>{
            return ({payments: response})
        }).catch(error=>{
            responseFeedback(false)
        })
    }

     function getAllCardsForReservation(id){
       return  API.CardsAPI.getCardsByReservation(id).then(response=>{
            return ({cardsInReservation: response})
        }).catch(error=>{
            responseFeedback(false)
        })
    }


    function responseFeedback(success){
        addConfig(success)
        setQueryActive(false)
    }
}