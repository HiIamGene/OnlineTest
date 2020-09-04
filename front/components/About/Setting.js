import React from 'react'
import {Row , Col, Label , Input , FormGroup} from 'reactstrap'
import ChangeLangButton from '../Login/ChangeLangButton';
import {changeLanguage} from "../../utils/multi-lang/changeLanguage"
export default class Setting extends React.Component{
    render(){
        return (
            <div>                         
                <FormGroup>
                    <div className="containerSetting">        
                        <Label sm={10} md={9} style={{fontWeight : "bold" , padding : 0 , margin : 0}}>Location</Label>
                        <Col md={3}>
                            <Input type="select" name="select">
                                <option>On</option>
                                <option>Off</option>
                            </Input>
                        </Col >
                    </div>
                </FormGroup>
                <FormGroup>
                    <div className="containerSetting">        
                        <Label sm={10} md={9} style={{fontWeight : "bold" , padding : 0 , margin : 0}}>Language</Label>
                        <Col md={3}>
                            <Input type="select" name="language" onChange={e=>changeLanguage(e.target.value)}>
                                <option value="th">th</option>                 
                                <option value="en">en</option>                                             
                            </Input>
                        </Col >
                    </div>
                </FormGroup>
                <style jsx>{`
                    .containerSetting{
                        display : flex;
                        justify-content : space-between;
                        align-items : center;
                    }
                `}</style>
            </div>
        )
    }
}
    
