import React from 'react';
import IdentityDetailElement from './IdentityDetailElement'
import _ from 'lodash'
export default ({title , data, isExpire}) => (
    <div className="about-identity-detail-container">
        <div className={"cr-header-title"}>{title} {isExpire && <span className="about-identity-badge-orange">Expire</span>}</div>
        <hr/>
        {
            data.map((value, index) =>        
               _.isEmpty(value.text) || _.isNull(value.text) ? "" :  <IdentityDetailElement key={index} label={value.label} value={value.text}/>                            
            )
        }  
    </div>
)