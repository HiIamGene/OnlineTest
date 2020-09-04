import React, { Component } from 'react'
import CompanyInformation from './CompanyInformation'

class Company extends Component {
    render() {
        return (
            <div className="wrapper">
                <div className="container">
                    <div className="item"><CompanyInformation/></div>
                    <div className="item"><CompanyInformation/></div>
                    <div className="item"><CompanyInformation/></div>
                    <style jsx>{`
                    .wrapper {
                        width: 100%;
                        height: 100%;
                        border: 1px solid black;
                    }
                    .container {
                        display: flex;
                        flex-wrap: wrap;
                        width: 100%;
                    }
                    .container>div {
                        border: 1px solid #E5E5E5;
                        margin: 10px 10px 10px 10px;
                        flex: 40%;
                        height: 100px;
                        border-radius: 10px;
                        color: black;
                        display: relative;
                        overflow: hidden;
                    }
                `}</style>
                </div>
            </div>
        )
    }
}

export default Company