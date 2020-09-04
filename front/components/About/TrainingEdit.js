import { Col, Row, Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import {faTimes , faLink} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DropdownInput from './DropdownInput'
import _ from 'lodash'
import DatePicker from "react-datepicker"; 
import cookies from 'js-cookie'
export default ({countries, onChangeDate,t,editMode,onSelect,errors,openModal, trainings,setTraining,onChange,onEditMode , onSubmit , trainingData , onUploadImageForProfile}) => (
    <div className="about-compete-container-licens-edit cr-bg-gray-3-background">
        <Form onSubmit={(e)=> onSubmit(e)}>
            <div className="about-compete-container-exit-license-edit">
                <FontAwesomeIcon onClick={onEditMode} className="about-compete-fontawe" color="rgb(100,100,100)" icon={faTimes} size="lg"/>
            </div>
            {
            editMode == 1 ? 
            <div className={"cr-flex"}>
                <div className="master-logo-container1 mr-20">
                    <img src={"/static/images/icon/AW_CrewHitz_ICON-78.png"}
                            alt={trainingData.imageUrl}/>
                </div>
                <div>
                    <h3 className={"about-font-sm-header cloud"}>{trainingData.title}</h3>
                    {trainingData.localName && <h4 className={"about-font-sm-header cloud"}>{trainingData.localName}</h4>}
                </div>
            </div>
            :
            <FormGroup row >
                <Label  for="ShipInput" md={4} sm={4}>{t("certificateNameTraining")}</Label>
                <Col md={8} sm={4}>
                    <DropdownInput
                        onChange={(val) =>setTraining(val)}
                        errors={errors}
                        isEditMode={editMode}
                        attribute="englishName"
                        data={trainingData}
                        items={trainings}
                        certificate={true}
                        onSelect={(val) =>onSelect(val)}
                        openModal={openModal}
                    />                  
                </Col>
            </FormGroup>
            }
              <Row form className="about-compete-edit-position">
                <Col md={6}>
                    <FormGroup>
                    <Label className="about-font-sm">{t("certificateNumberTraining")}</Label>
                    {
                        !_.isEmpty(errors.certificateNumber) ? 
                        <div>
                            <Input maxLength={27} required invalid className="about-ch-form about-font-sm-light" type="text" name="certificateNumber" value={trainingData.certificateNumber} onChange={(e)=>onChange(e)}   />
                            <FormFeedback>{errors.certificateNumber}</FormFeedback>
                        </div>
                        :
                        <Input maxLength={27} required className="about-ch-form about-font-sm-light" type="text" name="certificateNumber" value={trainingData.certificateNumber}  onChange={(e)=>onChange(e)}   />
                    }                    
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                    <Label className="about-font-sm">{t("IssueAuthorityTraining")}</Label>
                    <Input maxLength={32} className="about-ch-form about-font-sm-light" type="text" name="issueAuthority" value={trainingData.issueAuthority}   onChange={(e)=>onChange(e)}   />
                    </FormGroup>
                </Col>
                {/* <Col md={6}>
                    <FormGroup>
                    <Label >Issue Authority</Label>
                    {
                        !_.isEmpty(errors.issueAuthority) ? 
                        <div>
                            <Input invalid className="about-ch-form" type="text" name="issueAuthority" value={trainingData.issueAuthority} onChange={(e)=>onChange(e)}   />
                            <FormFeedback>{errors.issueAuthority}</FormFeedback>
                        </div>
                        :
                        <Input className="about-ch-form" type="text" name="issueAuthority" value={trainingData.issueAuthority}   onChange={(e)=>onChange(e)}   />
                    }                    
                    </FormGroup>
                </Col> */}
            </Row>
            <Row form>
                <Col md={6}>
                <FormGroup className="about-compete-edit-form">
                    <Label className="about-font-sm">{t('issueDateTraining')}</Label>
                    {
                        
                        !_.isEmpty(errors.issueDate) ? 
                        <div>
                            <DatePicker
                                className="about-ch-form form-control about-font-sm-light"
                                dateFormat="d/MM/yyyy"                             
                                selected={trainingData.issueDate === ""  || trainingData.issueDate == null  ? null : new Date(trainingData.issueDate)}
                                onChange={val=>onChangeDate("issueDate" , val )}    
                                maxDate={trainingData.expiryDate === ""  || trainingData.expiryDate == null  ? null : new Date(trainingData.expiryDate)}
                                showDisabledMonthNavigation    
                            />
                            <Input invalid className="about-compete-edit-hide"/>                                                           
                            <FormFeedback>{errors.issueDate}</FormFeedback>
                        </div>
                        :
                        <DatePicker
                            className="about-ch-form form-control about-font-sm-light"
                            dateFormat="d/MM/yyyy"                             
                            selected={trainingData.issueDate === ""  || trainingData.issueDate == null  ? null : new Date(trainingData.issueDate)}
                            onChange={val=>onChangeDate("issueDate" , val )} 
                            maxDate={trainingData.expiryDate === ""  || trainingData.expiryDate == null  ? null : new Date(trainingData.expiryDate)}
                            showDisabledMonthNavigation  
                        />
                    }                                           
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup className="about-compete-edit-form">
                    <Label className="about-font-sm">{t("expiryDateTraining")}</Label>
                    {
                        
                        !_.isEmpty(errors.issueDate) ? 
                        <div>
                            <DatePicker
                                className="about-ch-form form-control about-font-sm-light"
                                dateFormat="d/MM/yyyy"                             
                                selected={trainingData.expiryDate === ""  || trainingData.expiryDate == null  ? null : new Date(trainingData.expiryDate)}
                                onChange={val=>onChangeDate("expiryDate" , val )}    
                                minDate={trainingData.issueDate === "" || trainingData.issueDate == null  ? null : new Date(trainingData.issueDate)}
                                showDisabledMonthNavigation    
                            />
                            <Input invalid className="about-compete-edit-hide"/>                                                           
                            <FormFeedback>{errors.expiryDate}</FormFeedback>
                        </div>
                        :
                        <DatePicker
                            className="about-ch-form form-control about-font-sm-light"
                            dateFormat="d/MM/yyyy"                             
                            selected={trainingData.expiryDate === ""  || trainingData.expiryDate == null  ? null : new Date(trainingData.expiryDate)}
                            onChange={val=>onChangeDate("expiryDate" , val )} 
                            minDate={trainingData.issueDate === ""  || trainingData.issueDate == null  ? null : new Date(trainingData.issueDate)}
                            showDisabledMonthNavigation  
                        />
                    }       
              
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <FormGroup>
                    <Label className="about-font-sm">Country</Label>
                        <Input 
                            type="select"
                            className="about-ch-form about-font-sm-light"
                            onChange={(e)=>onChange(e)}
                            name="country" value={trainingData.country}
                        >
                            {countries.map((country,countryKey)=>{
                                return <option key={countryKey} value={country.country}>{country.country}</option>
                            })}
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
            <Row form>
                <Col md={10}>
                    <FormGroup>
                    <Label className="about-font-sm">{"Remark"}</Label>
                    {
                        !_.isEmpty(errors.remark) ? 
                        <div>
                            <Input maxLength={80} invalid className="about-ch-form about-font-sm-light" type="text" name="remark" value={trainingData.remark} onChange={(e)=>onChange(e)}   />
                            <FormFeedback>{errors.remark}</FormFeedback>
                        </div>
                        :
                        <Input maxLength={80} className="about-ch-form about-font-sm-light" type="text" name="remark" value={trainingData.remark}  onChange={(e)=>onChange(e)}   />
                    }                    
                    </FormGroup>
                </Col>
            </Row>           
            <Row form>
                <Col md={8}>
                    <FormGroup>
                    <Label className="about-font-sm">Attach Document</Label>
                    <div className="about-compete-attact-document-license">                        
                        <div className="about-compete-edit-doc-display">
                          
                            <Input multiple  onChange={(e) => onUploadImageForProfile(e)} className="edit-pic-upload" type="file" name="attachDocument" />
                            <FontAwesomeIcon className="edit-fontawe" color={"rgb(60,102,180)"} icon={faLink} fixedWidth/> 
                        </div>
                        <div className="edit-wrap" >  
                        {
                            !_.isEmpty(trainingData.attachDocument) ? trainingData.attachDocument.map((data , key) => 
                            <div className="edit-border"  key={key} >                         
                                <img className="edit-pic" src={(!_.isUndefined(data.imageUrl) ? (data.imageUrl + "?token=" + cookies.get("token") ) :"" ) || ( !_.isUndefined(data.url) ? (data.url + "?token=" + cookies.get("token")) : "") || (!_.isUndefined(data) ? (data + "?token=" + cookies.get("token")) :"") } />                         
                            </div>
                            ) 
                            : 
                            ""
                        }
                        </div>
                    </div>
                    <p className="about-font-sm-light ">(ขนาดไม่เกิน 2 MB)</p>
                    </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={3} sm={3} className="about-btn-wrapper">
                    <Button className="about-btn-cancel" onClick={onEditMode}  block>{t("cancelButtonTraining")}</Button>
                </Col>
                <Col md={3} sm={3} className="about-btn-wrapper">
                    <Button className="about-btn-save" type="submit"  block >{t("saveButtonTraining")}</Button>
                </Col>
            </Row>
        </Form>
    </div>
)