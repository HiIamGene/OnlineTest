import React, { Component } from 'react'

class CompanyInformation extends Component {
    render() {
        return(
            <div className="friend-information-wrapper">
                <div className="image-state">
                    <img src="../static/images/friend/ship-company.png" alt="companies"/>
                </div>
                <div className="information-state">
                    <p className="p-name">Company Name</p>
                    <p>Ship</p>
                </div>
                <div className="connection-state">
                    <div className="button-state">
                        <button className="button-connected"><i className="fas fa-check"/> Following</button>
                    </div>
                </div>
                <style jsx>{`
                    .friend-information-wrapper {
                        display: absolute;
                        position: relative;
                        margin: 7px 0 7px 10px;
                    }
                    .image-state {
                        position: absolute;
                        border: 2px solid #E5E5E5;
                        border-radius: 50%;
                    }
                    img {
                        width: 80px;
                        height: 80px;
                        border: 2px solid white;
                        border-radius: 50%;
                    }
                    .information-state {
                        position: absolute;
                        left: 100px;
                        margin: 25px 0;
                    }
                    p {
                        line-height: 2px;
                        color: gray;
                    }
                    .p-name {
                        color: #02395E;
                        font-weight: bold;
                    }
                    .connection-state {
                        position: absolute;
                        right: 0;
                    }
                    .button-connected {
                        font-size: 10px;
                        border-radius: 4px;
                        background: #A7D4F2;
                        color: #085F9A;
                        margin-top: 27px;
                        margin-right: 10px;
                        border: 1px solid #085F9A;
                        outline: none;
                        transition: all .3s ease-out;
                    }
                    .button-connected:hover {
                        background: #085F9A;
                        color: #A7D4F2;
                    }
                `}</style>
            </div>
        )
    }
}

export default CompanyInformation