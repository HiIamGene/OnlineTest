import React, {Component} from 'react';

const MessageLog1 =({t}) =>{
    return(
        <div className="notice-log">
            <div className={"notice-pic"}>
                    <img src="https://pm1.narvii.com/6096/2c4691d02a17fe6216515a39bb1621ebe7c85e4e_hq.jpg" alt="friend-icon"/>
            </div>
            <div className={"n-detail"}>
                    <span>Draco Malfoy</span>
                    <div>:Hello How Are You?</div>
                    <small>18 mimnute ago</small>
            </div>
            <div className={"notice-detail"}>
                    <img src="https://pm1.narvii.com/6096/2c4691d02a17fe6216515a39bb1621ebe7c85e4e_hq.jpg" alt="friend-icon"/>
            </div>
        </div>
    )
}

