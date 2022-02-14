import React, { useEffect, useState } from 'react';
import moment from 'moment';

function DetailLine({ className, title, type, value }) {

    return (
        <div className='container'>
            <div className={`row ${className}`}>
                <div className={`col`}>{title}</div>
                {(() => {
                    switch (type) {
                        case 'cc':
                            return <div className='col' style={{ textAlign: 'right' }}>Acct. ****{value}</div>;
                        case 'dollar':
                            return <div className='col' style={{ textAlign: 'right' }}>${value}</div>;
                        default:
                            return <div className='col' style={{ textAlign: 'right' }}>{value}</div>;
                    }
                })()}
            </div>
        </div>
    )
}

export default DetailLine;