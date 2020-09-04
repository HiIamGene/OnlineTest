import React, { Component } from 'react'

class CompanyInformation extends Component {
    render() {
        return(
            <div className="friend-information-wrapper">
                <div className="image-state">
                    <img className = "friend-img" src="../static/images/friend/ship-company.png" alt="companies"/>
                </div>
                <div className="text">
                    <div className="information-state">
                        <p className="p-name">Company Name</p>
                        <p className = "p-content">Ship</p>
                    </div>
                    <div className="connection-state">
                        <div className="button-state">
                            <button className="button-connected"><i className="fas fa-check"/> Following</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CompanyInformation