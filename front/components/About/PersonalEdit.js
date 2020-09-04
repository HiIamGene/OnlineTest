import { Col, Row, Button, Form, FormGroup, Label, Input  , FormFeedback , Collapse} from 'reactstrap';
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import _ from 'lodash'
import GoogleMapSearchBar from '../Util/GoogleMapSearchBar'
import DatePicker from "react-datepicker"; 


export default ({anotherProfile,onEditMode , editData ,onChange , onSubmit , errors , labelText , onChangeDate , onChangeLocation, nationalities}) => (
    <div className="cr-card personal-font-sm cr-bg-gray-3-background">
        <div className="about-personal-container-exit-edit">
            <FontAwesomeIcon onClick={onEditMode} className={"personal-fonawesome-cursor"}  color="rgb(100,100,100)" icon={faTimes} size="lg"/>
        </div>
        <Form onSubmit={(e)=>onSubmit(e)} >
            <Row form>
                <Col md={5}>
                    <FormGroup>
                    <Label >{labelText("editName")}</Label>
                    { 
                        !_.isEmpty(errors) &&!_.isEmpty(errors.name) ?  
                        <div>
                            <Input maxLength={40} invalid className="about-ch-form"  type="text" name="name" value={editData.name} onChange={e=>onChange(e)} />
                            <FormFeedback>{errors.name}</FormFeedback>
                        </div>
                        
                        :
                        <Input maxLength={40} className="personal-font-sm about-ch-form"  type="text" name="name"  value={editData.name} onChange={e=>onChange(e)} />
                    }  
                    
                    </FormGroup>
                </Col>
                <Col md={5}>
                    <FormGroup>
                    <Label >{labelText("editSurname")}</Label>
                    { 
                        !_.isEmpty(errors.surname) ?  
                        <div>
                            <Input maxLength={40} invalid className="about-ch-form"  type="text" name="surname"  value={editData.surname} onChange={e=>onChange(e)} />
                            <FormFeedback>{errors.surname}</FormFeedback>
                        </div>
                        
                        :
                        <Input maxLength={40} className="personal-font-sm about-ch-form"  type="text" name="surname"  value={editData.surname} onChange={e=>onChange(e)} />
                    }                                
                    </FormGroup>
                </Col>
            </Row>
            <Row form>
                <Col md={10}>
                    <FormGroup>
                        <Label >{labelText("displayName")}</Label>
                        { 
                            !_.isEmpty(errors.displayName) ?  
                            <div>
                                <Input maxLength={80} invalid className="about-ch-form"  type="text" name="displayName"  value={editData.displayName} onChange={e=>onChange(e)} />
                                <FormFeedback>{errors.displayName}</FormFeedback>
                            </div>
                            
                            :
                            <Input maxLength={80} className="personal-font-sm about-ch-form"  type="text" name="displayName"  value={editData.displayName} onChange={e=>onChange(e)} />
                        }                        
                    </FormGroup>
                </Col>
            </Row>
            <Row form>
                <Col md={10}>
                    <FormGroup>
                        <Label >{labelText("editEmailAccount")}</Label>
                        { 
                            !_.isEmpty(errors.emailAccount) ?  
                            <div>
                                <Input maxLength={80} invalid className="about-ch-form"  type="text" name="emailAccount"  value={editData.emailAccount} onChange={e=>onChange(e)} />
                                <FormFeedback>{errors.emailAccount}</FormFeedback>
                            </div>
                            
                            :
                            <Input maxLength={80} className="personal-font-sm about-ch-form"  type="text" name="emailAccount"  value={editData.emailAccount} onChange={e=>onChange(e)} />
                        }                        
                    </FormGroup>
                </Col>
            </Row>
            {/*<Row form>*/}
                {/*<Col md={10}>*/}
                    {/*<FormGroup>*/}
                    {/*<Label >{labelText("editPassword")}</Label>*/}
                    {/*{ */}
                        {/*!_.isEmpty(errors.password) ?  */}
                        {/*<div>*/}
                            {/*<Input invalid className="about-ch-form"  type="password" name="password" value={editData.password} onChange={e=>onChange(e)} />*/}
                            {/*<FormFeedback>{errors.password}</FormFeedback>*/}
                        {/*</div>*/}
                        {/**/}
                        {/*:*/}
                        {/*<Input className="about-ch-form"  type="password" name="password" value={editData.password} onChange={e=>onChange(e)} />*/}
                    {/*}                     */}
                    {/*</FormGroup>*/}
                {/*</Col>*/}
            {/*</Row>*/}
            <Row form>
                <Col md={5}>
                <FormGroup>
                    
                    <Label >{labelText("editNationality")}</Label>
                    { 
                            !_.isEmpty(errors.nationality) ?  
                            <div>
                                 <Input defaultValue={editData.nationality ? editData.nationality : "Thai"} invalid className="personal-nation-edit1 about-ch-form"  type="select"  name="nationality" value={editData.nationality} onChange={e=>onChange(e)} >
                                     {nationalities.map((nationality,nationalityKey)=>{
                                         return <option key={nationalityKey} value={nationality.nationality}>{nationality.nationality}</option>
                                     })}
                                </Input>
                                <FormFeedback>{errors.nationality}</FormFeedback>
                            </div>
                          
                            :
                            <Input defaultValue={editData.nationality ? editData.nationality : "Thai"} className="personal-nation-edit2 about-ch-form"  type="select"  name="nationality" value={editData.nationality} onChange={e=>onChange(e)} >
                                {nationalities.map((nationality,nationalityKey)=>{
                                    return <option key={nationalityKey} value={nationality.nationality}>{nationality.nationality}</option>
                                })}
                            </Input>
                        }                      
                    
                </FormGroup>
                </Col>
                <Col md={5}>
                    <FormGroup className={"personal-formgroup-d"}>
                        <Label >{labelText("editDateOfBirth")}</Label>
                        { 
                            !_.isEmpty(errors.dateOfBirth) ?  
                            <div>
                                
                                <DatePicker
                                     className="personal-font-sm about-ch-form form-control"
                                     dateFormat={!_.isObject(editData.dateOfBirth) ? " d/MM/yyyy ":"d/MM/yyyy"}
                                     selected={!_.isObject(editData.dateOfBirth) ? new Date() : new Date(editData.dateOfBirth)}
                                     onChange={val=>onChangeDate("dateOfBirth" , val )}
                                     maxDate={!_.isObject(editData.currentDate) ? new Date() : new Date(editData.currentDate)}
                                     showDisabledMonthNavigation
                                />
                                <Input invalid className="personal-font-sm personal-display-none"/>
                                <FormFeedback>{errors.dateOfBirth}</FormFeedback>
                            </div>                                                                          
                            :
                            <DatePicker
                                className="personal-font-sm about-ch-form form-control"
                                dateFormat={!_.isObject(editData.dateOfBirth) ? " d/MM/yyyy " : "d/MM/yyyy"}
                                selected={!_.isObject(editData.dateOfBirth) ? new Date() : new Date(editData.dateOfBirth)}
                                onChange={val=>onChangeDate("dateOfBirth" , val )}
                                maxDate={!_.isObject(editData.currentDate) ? new Date() : new Date(editData.currentDate)}
                                showDisabledMonthNavigation
                            />
                            
                        }                       
                    </FormGroup>
                </Col>
            </Row>
            <hr/>
            <Row form>
                <Col md={5}>
                <FormGroup>
                    <Label >{labelText("editCurrentLocation")}</Label>    
                    <GoogleMapSearchBar
                        onChangeLocation={onChangeLocation}
                        value={editData.currentLocation}
                        onHandleChange={onChangeLocation}
                        className={'personal-font-sm about-ch-form form-control'}
                        maxLength={40}
                    />     
                    <Input maxLength={40} className="personal-edit-hiding about-ch-form" onChange={(e)=>onChange(e)}  type="select" name="currentLocation" value={editData.currentLocation}  >                    
                    </Input>                   
                </FormGroup>
                </Col>
                <Col md={5}>
                    <FormGroup>
                        <Label >{labelText("editContactNumber")}</Label>
                        {
                            !_.isEmpty(errors.contactNumber) ?
                                <div>
                                    <Input maxLength={10} invalid className="about-ch-form" type="text" name="contactNumber"  value={editData.contactNumber}   placeholder="Number Only" onChange={(e)=>onChange(e)}/>
                                    <FormFeedback>{errors.contactNumber}</FormFeedback>
                                </div>

                                :
                                <Input maxLength={10} className="personal-font-sm  about-ch-form" type="text" name="contactNumber"  value={editData.contactNumber}   placeholder="Number Only" onChange={(e)=>onChange(e)}/>
                        }

                    </FormGroup>
                </Col>
            </Row>
            <Row form>
                {/*<Col md={5}>*/}
                    {/*<FormGroup>*/}
                        {/*<Label >{labelText("editContactNumber")}</Label>*/}
                        {/*{ */}
                            {/*!_.isEmpty(errors.contactNumber) ?  */}
                            {/*<div>*/}
                                 {/*<Input invalid className="about-ch-form" type="text" name="contactNumber"  value={editData.contactNumber}   placeholder="0800818292" onChange={(e)=>onChange(e)}/>*/}
                                {/*<FormFeedback>{errors.contactNumber}</FormFeedback>*/}
                            {/*</div>*/}
                          {/**/}
                            {/*:*/}
                            {/*<Input  className="about-ch-form" type="text" name="contactNumber"  value={editData.contactNumber}   placeholder="0800818292" onChange={(e)=>onChange(e)}/>*/}
                        {/*}       */}
                       {/**/}
                    {/*</FormGroup>*/}
                {/*</Col>*/}
                {/*<Col md={5}>*/}
                    {/*<FormGroup style={{display : "flex" , flexDirection  :"column"}}>                      */}
                        {/*<Label >{labelText("editCalendar")}</Label>*/}
                       {/**/}
                        {/*{ */}
                            {/*!_.isEmpty(errors.calendar) ?  */}
                            {/*<div>*/}
                                {/*<DatePicker*/}
                                    {/*className="about-ch-form form-control"*/}
                                    {/*dateFormat="d/MM/yyyy"                             */}
                                    {/*selected={editData.calendar}*/}
                                    {/*onChange={val=>onChangeDate("calendar" , val )}*/}
                                {/*/>*/}
                                {/*<Input invalid style={{display : "none"}}/>*/}
                                {/*<FormFeedback>{errors.calendar}</FormFeedback>*/}
                            {/*</div>*/}
                          {/**/}
                            {/*:*/}
                            {/*<DatePicker*/}
                                {/*className="about-ch-form form-control"*/}
                                {/*dateFormat="d/MM/yyyy"                             */}
                                {/*selected={editData.calendar}*/}
                                {/*onChange={val=>onChangeDate("calendar" , val )}*/}
                            {/*/>*/}
                        {/*}                       */}
                    {/*</FormGroup>*/}
                {/*</Col>*/}
            </Row>
            <Row>
                <Col md={4} sm={4} className="personal-btn-design">
                    <Button  onClick={onEditMode}  block className="personal-btn-design-cancel">{labelText("cancelPersonalButton")}</Button>
                </Col>
                <Col md={4} sm={4} className="personal-btn-design">
                    <Button type="submit"  block className="personal-btn-design-save">{labelText("savePersonalButton")}</Button>
                </Col>
            </Row>
        </Form>
    </div>
)