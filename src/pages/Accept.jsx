import React from 'react';
import { Result, Button } from 'antd';
import axios from 'axios'
import API from "../constants/api.jsx";
import queryString from 'query-string';

class Accept extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            status: "error",
            title: "Error",
            subTitle: "Please try again or contract your class inductor"
        }
    }

    componentWillMount() {
        //let params = queryString.parse(this.props.location.search)
        //new URLSearchParams(this.props.location.search).get("studentid")
        //console.log(URLSearchParams)
        const query = new URLSearchParams(this.props.location.search);
        if (query.get('studentid') && query.get('coursecode')) {
            axios.get(API.V1.ALERT,  {
                params: {
                    studentid: query.get('studentid')
                    ,
                    coursecode: query.get('coursecode')
                }
            }).then(res => { })
                .catch(err => {
                    console.warn(err);
                })
                
               this.setState({
                    status: "success",
                    title: "Success",
                    subTitle: "Successfully Added Course!"
               })
        }

    }


    render() {
        return (
            <Result
                status={this.state.status}
                title={this.state.title}
                subTitle={this.state.subTitle}
            />
        );
    }
}
export default Accept;