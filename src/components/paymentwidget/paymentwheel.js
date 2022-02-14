import React, { useEffect, useState } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import moment from 'moment';
import CurrencyInput from 'react-currency-input-field';
import GradientSVG from './gradientsvg';
import '../../styles/circleslider.scss';
import CircleSlider from './circleslider';

function PaymentWheel({ paymentInfo }) {

    console.log('wheel', paymentInfo['past-due'] + paymentInfo.fees + paymentInfo['current-due']);
    const [paymentValue, setPaymentValue] = useState(paymentInfo['past-due'] + paymentInfo.fees + paymentInfo['current-due']);
    const [sliderColor, setSliderColor] = useState('rgb(130,184,83)');
    const minimumPayment = paymentInfo['past-due'] + paymentInfo.fees + paymentInfo['current-due'];

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "/circleslider.js";
        script.async = true;
        document.body.appendChild(script);
        setPaymentValue(paymentInfo['past-due'] + paymentInfo.fees + paymentInfo['current-due']);
        return () => {
            document.body.removeChild(script);
        }
    }, [paymentInfo]);

    function handleOnValueChange(value, a, values) {
        console.log(value, values);
        setPaymentValue(value);
        if(value < minimumPayment) {
            setSliderColor('rgb(285,204,83)')
        } else if(value >= minimumPayment && value <= paymentInfo['loan-balance']) {
            setSliderColor('rgb(130,184,83)')
        } else {
            setSliderColor('#ff0000')
        }
    };

    return (
        <>
            {/* <GradientSVG startColor='#000000' endColor='#ffffff' idCSS='CircularProgressbarWithChildren' rotation={90} /> */}
            <div className='mx-auto' style={{ width: 220, height: 220, marginBottom: '50px' }}>
                <CircularProgressbarWithChildren
                    maxValue={minimumPayment * 2}
                    strokeWidth={3}
                    value={paymentValue} 
                    styles={buildStyles({
                        pathColor: sliderColor,
                        trailColor: "#eee"
                      })} >
                    <div className='container d-flex align-items-center text-center' style={{ borderRadius: '50%', border: '5px solid red', height: '175px', width: '175px' }}>
                        <div className='text-center'>
                            <div>Payment Amount</div>
                            <CurrencyInput
                                style={{ width: 125}}
                                id="validation-example-2-field"
                                placeholder="$1,234,567"
                                className='rounded-pill text-center'
                                value={paymentValue}
                                onValueChange={handleOnValueChange}
                                prefix={'$'}
                                step={1}
                                maxLength={9} />
                            <div>Due Date: {moment(paymentInfo['due-date']).utc().format('MM/DD/YY')}</div>
                        </div>
                    </div>
                </CircularProgressbarWithChildren>
            </div>
            {paymentInfo['loan-balance'] < paymentValue && <div className='text-center fst-italic alert-text'>Payment Amount Exceeds Loan Balance</div>}
        </>
    )
}

export default PaymentWheel;