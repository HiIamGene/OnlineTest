
import {Form , FormGroup , Label , Col ,Row ,Input , Button , FormFeedback} from 'reactstrap'
import {faTimes , faLink} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DropdownInput from './DropdownInput'
import DatePicker from "react-datepicker"; 
import {imageWithToken} from "../../utils/image";
import cookies from 'js-cookie'
const EducationEdit = ({ onChangeDate, t,editMode,onTyping,onSubmit,errors,educationData , onEditMode , onUploadImageForProfile, onChange ,onSelect, universitys ,setUniversity , openModal}) => (
    <div className="cr-card cr-bg-gray-3-background">
        <Form onSubmit={(e)=>onSubmit(e)}>
            <div className="about-edu-container-exit-edit">
                <FontAwesomeIcon onClick={onEditMode} className="about-edu-fontawesome" color="rgb(100,100,100)" icon={faTimes} size="lg"/>
            </div>
            {
            editMode == 1 ? 
            <div className={"cr-flex"}>
                <div className="master-logo-container1 mr-20">
                    <img src={imageWithToken(educationData.imageUrl)}
                            alt={educationData.imageUrl}/>
                </div>
                <div>
                    <h3 className={"cloud"}>{educationData.title}</h3>
                    {educationData.localName && <h4>{educationData.localName}</h4>}
                </div>
            </div>
            :
            <FormGroup row >
                <Label className="about-education-font-sm about-education-location-padding-l" for="ShipInput" md={4} sm={4}>{t("editEducationName")}</Label>
                <Col md={8} sm={4}>
                    <div>                       
                        <DropdownInput
                            onChange={(val) =>setUniversity(val)}
                            errors={errors}
                            isEditMode={editMode}                            
                            attribute="englishName"
                            data={educationData}
                            items={universitys}
                            certificate={false}
                            onSelect={(val) =>onSelect(val)}
                            openModal={openModal}
                        />
                    </div>                    
                </Col>
            </FormGroup>
            
            }
            <Row form>
                <Col md={5} sm={5} className="about-edu-column">
                    <FormGroup>
                        <Label className="about-edu-fontw" for="exampleEmail">{t("editTimePeriodEducation")}</Label>
                        <Row form>
                            <Col md={12} sm={12} className="about-edu-column">
                                {
                                    !_.isEmpty(errors.startWorked) ?
                                    <div>
                                    <DatePicker
                                        className="about-ch-form about-education-font-sm-light form-control"
                                        dateFormat="d/MM/yyyy"                             
                                        selected={educationData.startWorked === "" ? null : new Date(educationData.startWorked)}
                                        onChange={val=>onChangeDate('startWorked' , val )}    
                                        maxDate={educationData.endWorked === "" ? null : new Date(educationData.endWorked)}
                                        showDisabledMonthNavigation
                                        showYearDropdown
                                        scrollableYearDropdown
                                        showMonthDropdown
                                    />
                                    <Input invalid className="about-edu-hide"/>                                                           
                                    <FormFeedback>{errors.startWorked}</FormFeedback>
                                    </div>
                                    :
                                    <DatePicker
                                        className="about-ch-form about-education-font-sm-light form-control"
                                        dateFormat="d/MM/yyyy"                             
                                        selected={educationData.startWorked === "" ? null : new Date(educationData.startWorked)}
                                        onChange={val=>onChangeDate('startWorked' , val )}    
                                        maxDate={educationData.endWorked === "" ? null : new Date(educationData.endWorked)}
                                        showDisabledMonthNavigation
                                        showYearDropdown
                                        scrollableYearDropdown
                                        showMonthDropdown
                                    />                                       
                                }                   
                            </Col>
                        </Row>
                    </FormGroup>
                </Col>
                <Col className="about-edu-column2" md={2} sm={2}>
                    <p ></p>
                    <p className="about-p">{t("toPeriodEducation")}</p>
                </Col>
                <Col md={5} sm={5} className="about-edu-column">
                    <FormGroup>
                          
                            <Label></Label>
                           
                            <Row form>
                                <Col md={12} sm={12} >
                                <div className="about-edu-label-end-worked">
                                {
                                    !_.isEmpty(errors.endWorked) ?
                                    <div>
                                    <DatePicker
                                        className="about-ch-form about-education-font-sm-light form-control"
                                        dateFormat="d/MM/yyyy"
                                        selected={educationData.endWorked === "" ? null : new Date(educationData.endWorked)}
                                        onChange={val=>onChangeDate('endWorked' , val )}
                                        minDate={educationData.startWorked === "" ? null : new Date(educationData.startWorked)}
                                        showDisabledMonthNavigation
                                        showYearDropdown
                                        scrollableYearDropdown
                                        showMonthDropdown
                                    />
                                    <Input invalid className="about-edu-hide"/>
                                    <FormFeedback>{errors.endWorked}</FormFeedback>
                                    </div>
                                    :
                                    <DatePicker
                                        className="about-ch-form about-education-font-sm-light form-control"
                                        dateFormat="d/MM/yyyy"
                                        selected={educationData.endWorked === "" ? null : new Date(educationData.endWorked)}
                                        onChange={val=>onChangeDate('endWorked' , val )}
                                        minDate={educationData.startWorked === "" ? null : new Date(educationData.startWorked)}
                                        showDisabledMonthNavigation
                                        showYearDropdown
                                        scrollableYearDropdown
                                        showMonthDropdown
                                    />
                                }
                                </div>
                                </Col>
                            </Row>
                        </FormGroup>
                </Col>
            </Row>
            <Row>
                <Col md={6} sm={6}>
                    <FormGroup>
                        <Label className=" about-edu-column about-edu-fontw" for="Rank">Position</Label>
                        {
                            !_.isEmpty(errors.firstSubtitle)  ?
                            <div>
                                <Input maxLength={40} invalid className="about-ch-form about-education-font-sm-light" onChange={(e) => onChange(e)} value={educationData.firstSubtitle} name="firstSubtitle"/>
                                <FormFeedback>{errors.firstSubtitle}</FormFeedback>
                            </div>
                            :
                            <Input  maxLength={40} required className="about-ch-form about-education-font-sm-light" onChange={(e) => onChange(e)}  value={educationData.firstSubtitle} name="firstSubtitle"/>
                        }
                        
                    </FormGroup>
                </Col>
            </Row>
            {/* <Row  > 
                <Col  md={6} sm={6}>
                    <FormGroup>
                        <Label style={{fontWeight : "bold"}} for="Rank">Major Oil Chateter (If any)</Label>
                        <Input style={{fontWeight :"bold" , color : "#171e4a"}} className="about-ch-form" type="select" name="majorOillChateter" onChange={(e)=>onChange(e)}>
                            <option value="Chevron">Chevron</option>
                        </Input>
                    </FormGroup>
                </Col>
            </Row> */}
             <Row form>
                <Col md={8}>
                    <FormGroup>
                    <Label className="about-education-font-sm">Attach Document</Label>
                    <div className="about-edu-attact-document">                        
                        <div className="about-edu-attach">
                            <Input multiple  onChange={(e) => onUploadImageForProfile(e)} className="edu-input" type="file" name="attachDocument" />     
                            <FontAwesomeIcon className="edu-fontawe" color={"rgb(60,102,180)"} icon={faLink} fixedWidth/> 
                        </div><div className="about-education-font-sm-light">Maximum size is 2 MB</div>
                        <div className="about-edu-attach2" >  
                        {
                            !_.isEmpty(educationData.attachDocument) ? educationData.attachDocument.map((data , key) => 
                            <div className="edu-1"key={key} >                         
                                <img className="edu-2" src={(!_.isUndefined(data.imageUrl) ? (data.imageUrl + "?token=" + cookies.get("token") ) :"" ) || ( !_.isUndefined(data.url) ? (data.url + "?token=" + cookies.get("token")) : "") || (!_.isUndefined(data) ? (data + "?token=" + cookies.get("token")) :"") } />                         
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
                <Col md={3} sm={3}>
                    <Button className="about-btn-cancel" onClick={onEditMode}  block>{t("cancelButtonEducation")}</Button>
                </Col>
                <Col md={3} sm={3}>
                    <Button type="submit" block className="about-btn-save" >{t("saveButtonEducation")}</Button>
                </Col>
            </Row>
    
            
        </Form>
    </div>
)

export default EducationEdit