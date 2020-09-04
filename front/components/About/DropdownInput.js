import React,{Component} from 'react';
import {Input , FormFeedback} from 'reactstrap'
import _ from 'lodash'
import Autocomplete from 'react-autocomplete'
import {withNamespaces} from "../../lib/i18n"
import cookies from 'js-cookie'

const DropdownInput = ({t,isEditMode,errors,data , items, attribute , onSelect , openModal , onTyping , onChange, certificate,name,dataType }) => {  console.log('data',items); return (
     <div>
        <Autocomplete
                getItemValue={ dataType === "single" ? (item) => item[attribute] : (item) => item["id"]}
                shouldItemRender={(item, value) => {        
                    return item[attribute] ? item[attribute].toLowerCase().indexOf(value.toLowerCase()) !== -1  :  false
                }}
                items={items}
                renderInput={props => {
                    const { ref, ...rest } = props;
                  
                    return <div>
                        {errors && !_.isEmpty(errors.title) ?
                        <div>
                            <Input name={name}  invalid className="about-education-font-sm about-ch-form about-autocomplete-position1"   {...rest} innerRef={ref} />
                            <FormFeedback>{errors.title}</FormFeedback>
                        </div>
                            :
                            <div className="about-autocomplete-display1 ">
                                {!_.isEmpty(data.imageUrl)  && !certificate ?
                                    <div>
                                        <img className="display1-img" src={data.imageUrl + "?token=" + cookies.get("token")} width="40" height="40" />
                                        <p className="display1-p">{data.localName ? data.localName : data}</p>
                                    </div>
                                    :
                                    ""
                                }
                                <div className="about-autocomplete-display2">

                                    {
                                        isEditMode == 1 && !certificate  ?  <img className="display2-img" src={data.imageUrl + "?token=" + cookies.get("token")} width="40" height="40" /> : ""
                                    }
                                    <Input maxLength={41} disabled={isEditMode==1 ? true : false} required className="about-ch-form"  {...rest} style={{width : "100%" , padding : !_.isEmpty(data.imageUrl)   && !certificate  ? "20px 50px 35px 60px" : (isEditMode==1  &&!certificate  ? "20px 55px" : "20px 20px")}} innerRef={ref} />
                                </div>
                            </div>
                            }
                    </div>

                }}
                renderMenu={(items, value, style)=>{

                    return (
                        <div style={{
                            position : "absolute",
                            zIndex : 20,
                            width :"92%"
                        }}>
                            <div className="position2-modal1"
                                children={items}/>
                            {!openModal ? null : 
                            <div onClick={openModal} className="about-autocomplete-container-dropdown-query position2-openmodal">
                                <div className={!_.isEmpty(data.title) ? "about-autocomplete-display1" : "none-display" }>
                                   <label className={"display1-p2"}> 
                                        <i className={"fas fa-plus"}></i>
                                        <label className={"p1"}> {t("createText")} {`"${!_.isEmpty(data.title) ? data.title : ""}"`} </label>
                                    </label>
                                </div>
                            </div>}
                        </div>
                    )
                }}
                inputProps={{ style: { width: "100%" , position : "relative"} }}
                wrapperStyle={{width: "100%" }}

                renderItem={(item, isHighlighted  ) =>
                    <div style={{display : "flex"  ,background: isHighlighted ? 'rgb(230,230,230)' : 'white' , padding : '20px' , borderBottom : "1px solid rgb(200,200,200)"}}>
                        {item["imageUrl"] && <div style={{marginRight : "10px"}}><img src={item["imageUrl"] + "?token=" + cookies.get("token")} width="40" height="40"/></div>}
                        {dataType === "single" ? <div>
                            <p className="about-autocomplete-font-item">{item[attribute]}    </p>
                        </div> : <div>
                            <p className="about-autocomplete-font-item">{item["englishName"]}    </p>
                            <p className="about-autocomplete-font-item">{item["localName"]}    </p>
                        </div>   }

                    </div>
                }
                value={dataType !== "single" ? data.title :  data[attribute] }
                onChange={dataType !== "single" ? (e) => {onChange(e);} : (e) => {
                    onChange({
                        ...e,
                        target:{
                            ...e.target,
                            name: name,
                        }
                    })
                } }
                onSelect={dataType !== "single" ? val => onSelect(val) : (val) => {
                    onSelect({
                        target:{
                            name: name,
                            value: val
                        }
                    })
                }}
        />
        {/* <style jsx>{`
        .containerDropdownQuery{
            cursor:pointer;
        }
        .addPaddingLeft{
            padding-left : 40px;
            -webkit-box-sizing: border-box; 
            -moz-box-sizing: border-box;   
            box-sizing: border-box;        
        }
        `}</style> */}
    </div>
)}

export default withNamespaces("common")(DropdownInput)