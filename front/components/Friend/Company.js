import React, { Component } from 'react'
import CompanyInformation from './CompanyInformation'

class Company extends Component {
    render() {
        return (
            <div className="wrapper">
                <div className="container">
                    <div className="item-friend"><CompanyInformation/></div>
                    <div className="item-friend"><CompanyInformation/></div>
                    <div className="item-friend"><CompanyInformation/></div>
                    
                </div>
            </div>
        )
    }
}

export default Company