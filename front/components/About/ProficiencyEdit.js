
import {Form , FormGroup , Label , Col ,Row ,Input , Button , FormFeedback} from 'reactstrap'
import {faTimes , faPlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DropdownInput from './DropdownInput'
import dayjs from 'dayjs'
import cookies from 'js-cookie'
import DatePicker from "react-datepicker"; 
const LicenseEdit = ({countries,onChangeDate ,t,editMode,errors,onSubmit,openModal,setLicense,licenses,licenseData , onEditMode , onChange,onSelect , onUploadImageForProfile}) => (
    <div className="about-compete-container-licens-edit cr-bg-gray-3-background">
        <Form onSubmit={(e)=> onSubmit(e)}>
            <div className="about-compete-container-exit-license-edit">
                <FontAwesomeIcon onClick={onEditMode} className="about-compete-fontawe" color="rgb(100,100,100)" icon={faTimes} size="lg"/>
            </div>
            {
            editMode == 1 ? 
            <div className={"cr-flex"}>
                <div className="master-logo-container1 mr-20">
                    <img src={"/static/images/icon/AW_CrewHitz_ICON-77.png"}
                            alt={licenseData.imageUrl}/>
                </div>
                <div>
                    <h3 className={"about-font-sm-header cloud"}>{licenseData.title}</h3>
                    {licenseData.localName && <h4 className={"about-font-sm-header cloud"}>{licenseData.localName}</h4>}
                </div>
            </div>
            :
            <FormGroup row >
                <Label  md={4} sm={4}>{t("licenseName")}</Label>
                <Col md={8} sm={4}>
                    <DropdownInput
                        onChange={(e)=>setLicense(e) }
                        errors={errors}      
                        isEditMode={editMode}              
                        attribute="englishName"
                        data={licenseData}
                        items={licenses}
                        certificate={true}
                        onSelect={(val) =>onSelect(val)}
                        openModal={openModal}
                    />                                       
                </Col>
            </FormGroup>
            }
              <Row form className="about-compete-edit-position">
                {/* <Col md={6}>
                    <FormGroup>
                    <Label >{t("levelLicense")}</Label>
            
                        <Input defaultValue={licenseData.firstSubtitle}  style={{color : "#171e4a" , fontWeight : "bolder"}} className="about-ch-form"  type="select" name="firstSubtitle" value={licenseData.firstSubtitle} onChange={(e)=>onChange(e)}>
                            
                            <option value="Class 1">Class 1</option>
                            <option value="Class 2">Class 2</option>
                            <option value="Class 3">Class 3</option>
                            <option value="Class 4">Class 4</option>                     
                        </Input>
                    </FormGroup>
                </Col> */}
                <Col md={6}>
                    <FormGroup>
                    <Label className="about-font-sm">{t("certificateNumber")}</Label>
                    {
                        !_.isEmpty(errors.certificateNumber) ? <div>
                            <Input maxLength={27} required invalid className="about-ch-form about-font-sm-light" type="text" name="certificateNumber" value={licenseData.certificateNumber} onChange={(e)=>onChange(e)}  />
                            <FormFeedback>{errors.certificateNumber}</FormFeedback>
                        </div> 
                        :
                        <Input maxLength={27} required className="about-ch-form about-font-sm-light" type="text" name="certificateNumber" value={licenseData.certificateNumber} onChange={(e)=>onChange(e)}  />
                    }                   
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                    <Label className="about-font-sm">Country</Label>
                        <Input 
                            type="select"
                            className="about-ch-form about-font-sm-light"
                            onChange={(e)=>onChange(e)}
                            name="country" value={licenseData.country}
                        >
                            {countries.map((country,countryKey)=>{
                                return <option key={countryKey} value={country.country}>{country.country}</option>
                            })}
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
            <Row form>
                <Col md={6}>
                    <FormGroup className="about-compete-edit-form">
                    <Label className="about-font-sm">{t("issueDateLicense")}</Label>
                    {
                        !_.isEmpty(errors.issueDate) ? 
                        <div>
                            <DatePicker
                                className="about-ch-form form-control about-font-sm-light"
                                dateFormat="d/MM/yyyy"                             
                                selected={licenseData.issueDate === ""  || licenseData.issueDate == null  ? null : new Date(licenseData.issueDate)}
                                onChange={val=>onChangeDate("issueDate" , val )}    
                                maxDate={licenseData.expiryDate === ""  || licenseData.expiryDate == null  ? null : new Date(licenseData.expiryDate)}
                                showDisabledMonthNavigation    
                            />
                            <Input invalid className="about-compete-edit-hide"/>                                                           
                            <FormFeedback>{errors.issueDate}</FormFeedback>
                        </div>
                        :
                        <DatePicker
                            className="about-ch-form form-control about-font-sm-light"
                            dateFormat="d/MM/yyyy"                             
                            selected={licenseData.issueDate === ""  || licenseData.issueDate == null  ? null : new Date(licenseData.issueDate)}
                            onChange={val=>onChangeDate("issueDate" , val )} 
                            maxDate={licenseData.expiryDate === ""  || licenseData.expiryDate == null  ? null : new Date(licenseData.expiryDate)}
                            showDisabledMonthNavigation  
                        />                        
                          
                    }                                      
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup  className="about-compete-edit-form">
                    <Label className="about-font-sm">{t("expiryDateLicense")}</Label>
                    {
                        !_.isEmpty(errors.issueDate) ? 
                        <div>
                            <DatePicker
                                className="about-ch-form form-control about-font-sm-light"
                                dateFormat="d/MM/yyyy"                             
                                selected={licenseData.expiryDate === ""  || licenseData.expiryDate == null  ? null : new Date(licenseData.expiryDate)}
                                onChange={val=>onChangeDate("expiryDate" , val )}    
                                minDate={licenseData.issueDate === ""  || licenseData.issueDate == null  ? null : new Date(licenseData.issueDate)}
                                showDisabledMonthNavigation    
                            />
                            <Input invalid className="about-compete-edit-hide"/>                                                           
                            <FormFeedback>{errors.expiryDate}</FormFeedback>
                        </div>
                        :
                        <DatePicker
                            className="about-ch-form form-control about-font-sm-light"
                            dateFormat="d/MM/yyyy"                             
                            selected={licenseData.expiryDate === ""  || licenseData.expiryDate == null  ? null : new Date(licenseData.expiryDate)}
                            onChange={val=>onChangeDate("expiryDate" , val )} 
                            minDate={licenseData.issueDate === ""  || licenseData.issueDate == null  ? null : new Date(licenseData.issueDate)}
                            showDisabledMonthNavigation  
                        />                        
                          
                    }                                  
                    </FormGroup>
                </Col>
            </Row>
            {/* <Row form>
                <Col md={8}>
                    <FormGroup>
                    <Label >{t("limitationLicense")}</Label>
                    <Input className="about-ch-form" type="text" name="limitation" value={licenseData.limitation} onChange={(e)=>onChange(e)}     />
                    </FormGroup>
                </Col>
            </Row> */}
            <Row form>
                <Col md={10}>
                    <FormGroup>
                    <Label className="about-font-sm">Issue By</Label>
                    <Input maxLength={80} required className="about-ch-form about-font-sm-light" type="text" name="issueBy" value={licenseData.issueBy} onChange={(e)=>onChange(e)}     />
                    </FormGroup>
                </Col>
            </Row>
            <Row form>
                <Col md={8}>
                    <FormGroup>
                    <Label className="about-font-sm">Attach Document</Label>
                    <div className="about-compete-attact-document-license">
                        <div className="about-compete-edit-doc-display">
                          
                            <Input multiple onChange={(e) => onUploadImageForProfile(e)} className="edit-pic-upload" type="file" name="attachDocument" />
                            <FontAwesomeIcon className="edit-fontawe" color={"rgb(60,102,180)"} icon={faPlus} fixedWidth/> 
                        </div>
                        <div className="edit-wrap">  
                        {
                            !_.isEmpty(licenseData.attachDocument) ? licenseData.attachDocument.map((data , key) => 
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
                <Col md={4} sm={6} className="about-btn-wrapper">
                    <Button  onClick={onEditMode} className="about-btn-cancel" block>{t("cancelButtonLicense")}</Button>
                </Col>
                <Col md={4} sm={6} className="about-btn-wrapper">
                    <Button type="submit" className="about-btn-save" block >{t("saveButtonLicense")}</Button>
                </Col>
            </Row>
    
            
        </Form>
    </div>
)

export default LicenseEdit