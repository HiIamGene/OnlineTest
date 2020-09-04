import React, {Component} from 'react';
import {
    DropdownItem,
    DropdownMenu,
  } from "reactstrap";
  
class MessageLog extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <DropdownMenu right>
                <h>Coming Soon </h>
            </DropdownMenu>
        );
    }
}

export default MessageLog