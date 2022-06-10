import React from 'react';
import CountDownTimer from '../components/CountDownTimer';

const Example = () =>{

    return(
        <>
            <CountDownTimer />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Example</div>

                            <div className="card-body">Hello World!</div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )

}
export default Example;