import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import PaymentWheel from './paymentwheel';
import DetailLine from './detailline';
import moment from 'moment';
import { Button, Container, Row } from 'react-bootstrap';

function PaymentWidget() {

    const [paymentInfo, setPaymentInfo] = useState(
        {
            "balance": 0,
            "due-date": 0,
            "past-due": 0,
            "fees": 0,
            "current-due": 0,
            "payment-type": "cc",
            "payment-details": "0000",
            "friendly-due-date": moment().format('MM/DD/YY'),
            loaded: false
        }
    );

    useEffect(() => {
        axios.get('mockdata/paymentinfo.json')
            .then((response) => {
                console.log('date', moment(response.data['due-date']).utc().format('MM/DD/YY'))
                setPaymentInfo({ ...response.data, "friendly-due-date": moment(response.data['due-date']).utc().format('MM/DD/YY'), loaded: true });
            })
            .catch((error) => {
                //Just log to the console for now
                console.log(error);
            });
    }, []);

    return (
        <Card className='rounded-10' style={{ width: '30rem' }}>
            <Card.Body>
                <div className='container'>
                    <div className='row'>
                        <div className='col'>
                            <span className="material-icons close-icon style-button md-dark">
                                close
                            </span>
                        </div>
                        <div className='col' style={{ textAlign: 'right' }}>
                            <div>{`Loan Balance: ${paymentInfo['loan-balance']}`}</div>
                            <div>{`Loan: ${paymentInfo['loan-number']}`}</div>
                        </div>
                    </div>
                </div>
                <PaymentWheel paymentInfo={paymentInfo} />
                {(() => {
                    if (paymentInfo.loaded) return <>
                        <div style={{ marginBottom: '50px' }}>
                            <DetailLine title='Payment Date' value={paymentInfo['friendly-due-date']} />
                            {paymentInfo['past-due'] > 0 && <DetailLine className='boldInlineDetail alert-text' title='Past Due Amount' type='dollar' value={paymentInfo['past-due']} />}
                            {paymentInfo.fees > 0 && <DetailLine className='boldInlineDetail' title='Outstanding Fees' type='dollar' value={paymentInfo.fees} />}
                            <DetailLine className='boldInlineDetail' title={`${moment(paymentInfo['due-date']).utc().format('MMMM')}`} type='dollar' value={paymentInfo['current-due']} />
                            <DetailLine className='boldInlineDetail' title='Total Payment Amount' type='dollar' value={paymentInfo['past-due'] + paymentInfo.fees + paymentInfo['current-due']} />
                            <DetailLine title='Payment Method' type='cc' value={paymentInfo['payment-details']} />
                        </div>
                        <div className='row'>
                            <Button className='rounded-pill mx-auto style-button px-3' style={{ width: '150px' }}>
                                <span className='float-start'>Review</span>
                                <span className='material-icons align-middle float-end'>arrow_right_alt</span>
                            </Button>
                        </div>
                    </>
                })()}

                <Container className='footer mt-4'>
                    <div className='text-center'>Payments made after 5 pm Cetral will be posted the following day.</div>
                    <div className='text-center'>By sliding to make a payment, I agree to the</div>
                    <div className='text-center'><a href='#'>Terms + Conditions</a></div>
                </Container>
            </Card.Body>
        </Card>
    )
}

export default PaymentWidget;