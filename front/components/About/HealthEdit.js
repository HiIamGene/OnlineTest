import { Col, Row, Button, Form, FormGroup, Label, Input, FormText , FormFeedback } from 'reactstrap';
import {faTimes , faLink} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import _ from 'lodash'
import DatePicker from "react-datepicker"; 
import cookies from 'js-cookie'
export default ({onUploadImageForProfile,onChangeDate,t,onDelete,onChange,editMode,onEditMode,onSubmit, healthData , errors}) => (
    <div className="cr-card cr-bg-gray-2">
        <Form onSubmit={(e)=>onSubmit(e)}>
            <div className="about-health-container-exit">
                <FontAwesomeIcon onClick={onEditMode} className="about-identity-edit-fontawesome" color="rgb(100,100,100)" icon={faTimes} size="lg"/>
            </div>
            <FormGroup row >
                <Label className="about-font-sm" for="ShipInput" md={4} sm={4}>{t("medicalNumberHealth")}</Label>
                <Col md={8} sm={4}>
                    <div>
                        {
                            !_.isEmpty(errors.medicalNo) ? 
                            <div>
                                <Input required maxLength={43} invalid className="about-ch-form" input= "text" onChange={(e) => onChange(e)} value={healthData.medicalNo} name="medicalNo"/>
                                <FormFeedback>{errors.medicalNo}</FormFeedback>
                            </div>
                            :                            
                        <Input required className="about-ch-form" maxLength={43} input= "text" onChange={(e) => onChange(e)} value={healthData.medicalNo} name="medicalNo"/>
                        }
                    </div>
                    
                </Col>
            </FormGroup>
            <FormGroup row >
                <Label className="about-font-sm" for="ShipInput" md={4} sm={4}>{t("issueByHealth")}</Label>
                <Col md={8} sm={4}>
                    <div>
                        {
                            !_.isEmpty(errors.issueBy) ?
                            <div>
                                 <Input required maxLength={50} invalid className="about-ch-form" type="text" onChange={(e) => onChange(e)} value={healthData.issueBy} name="issueBy"/>
                                 <FormFeedback>{errors.issueBy}</FormFeedback>
                            </div>
                            :
                            <Input required maxLength={50} className="about-ch-form" type="text" onChange={(e) => onChange(e)} value={healthData.issueBy} name="issueBy"/>
                        }
                       
                        
                    </div>
                    
                </Col>
            </FormGroup>
            <Row form>
                <Col md={6}>
                    <FormGroup>
                    <Label className="about-font-sm">{t("issueDateHealth")}</Label>
                    <div>
                        {
                            
                            !_.isEmpty(errors.issueDate) ? 
                            <div>
                                <DatePicker
                                    className="about-ch-form form-control"
                                    dateFormat="d/MM/yyyy"                             
                                    selected={healthData.issueDate === "" ? null : new Date(healthData.issueDate)}
                                    onChange={val=>onChangeDate("issueDate" , val )}    
                                    maxDate={healthData.expDate === "" ? null : new Date(healthData.expDate)}
                                    showDisabledMonthNavigation  
                                    showYearDropdown
                                    scrollableYearDropdown
                                    showMonthDropdown  
                                />
                                <Input invalid className="about-compete-edit-hide"/>                                                           
                                <FormFeedback>{errors.issueDate}</FormFeedback>
                            </div>
                            :
                            <DatePicker
                                className="about-ch-form form-control"
                                dateFormat="d/MM/yyyy"                             
                                selected={healthData.issueDate === "" ? null : new Date(healthData.issueDate)}
                                onChange={val=>onChangeDate("issueDate" , val )} 
                                maxDate={healthData.expDate === "" ? null : new Date(healthData.expDate)}
                                showDisabledMonthNavigation  
                                showYearDropdown
                                scrollableYearDropdown
                                showMonthDropdown
                            />
                        }                                                                          
                    </div>
                  
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                    <Label className="about-font-sm">{t("expiryDateHealth")}</Label>
                    <div>
                        {
                            
                            !_.isEmpty(errors.expDate) ? 
                            <div>
                                <DatePicker
                                    className="about-ch-form form-control"
                                    dateFormat="d/MM/yyyy"                             
                                    selected={healthData.expDate === "" ? null : new Date(healthData.expDate)}
                                    onChange={val=>onChangeDate("expDate" , val )}    
                                    minDate={healthData.issueDate === "" ? null : new Date(healthData.issueDate)}
                                    showDisabledMonthNavigation 
                                    showYearDropdown
                                    scrollableYearDropdown
                                    showMonthDropdown   
                                />
                                <Input invalid className="about-compete-edit-hide"/>                                                           
                                <FormFeedback>{errors.expDate}</FormFeedback>
                            </div>
                            :
                            <DatePicker
                                className="about-ch-form form-control"
                                dateFormat="d/MM/yyyy"                             
                                selected={healthData.expDate === "" ? null : new Date(healthData.expDate)}
                                onChange={val=>onChangeDate("expDate" , val )} 
                                minDate={healthData.issueDate === "" ? null : new Date(healthData.issueDate)}
                                showDisabledMonthNavigation  
                                showYearDropdown
                                scrollableYearDropdown
                                showMonthDropdown
                            />
                        }                     
                    </div>                                            
                    </FormGroup>
                </Col>
            </Row>
            <Row form>
                <Col md={8}>
                    <FormGroup>
                    <Label className="about-font-sm">Attach Document</Label>
                    <div className="about-health-attact-document">                        
                        <div className="about-compete-edit-doc-display">
                          
                            <Input multiple  onChange={(e) => onUploadImageForProfile(e)} className="edit-pic-upload" type="file" name="attachDocument" />
                            <FontAwesomeIcon className="edit-fontawe" color={"rgb(60,102,180)"} icon={faLink} fixedWidth/> 
                        </div>
                        <div className="about-health-edit-doc" >  
                        {
                            !_.isEmpty(healthData.attachDocument) ? healthData.attachDocument.map((data , key) => 
                            <div className="edit-doc1"  key={key} >                         
                                <img className="edit-doc2" src={(!_.isUndefined(data.imageUrl) ? (data.imageUrl + "?token=" + cookies.get("token") ) :"" ) || ( !_.isUndefined(data.url) ? (data.url + "?token=" + cookies.get("token")) : "") || (!_.isUndefined(data) ? (data + "?token=" + cookies.get("token")) :"") } />                         
                            </div>
                            ) 
                            : 
                            ""
                        }
                        </div>
                    </div>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                 <Col md={4} sm={6} className="about-btn-wrapper">
                   
                        <Button className="about-btn-cancel" onClick={onEditMode}  block>{t("cancelButtonHealth")}</Button>
                     
                </Col> 
              
                
                    <Col md={4} sm={6} className="about-btn-wrapper">
                        
                        <Button className="about-btn-save" type="submit" block >{t("saveButtonHealth")}</Button>
                    </Col>
                  
                
            </Row>
        </Form>
    </div>
)