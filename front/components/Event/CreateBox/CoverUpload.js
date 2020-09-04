import {Modal , ModalHeader , ModalBody  ,ModalFooter , Input , FormFeedback  } from 'reactstrap'
import {faTimes , faPlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import _ from 'lodash'
export default ({errorsNew,isOpen , toggle , children , onUploadImage , imageUrl }) => (
    <Modal isOpen={isOpen}  >
        <ModalBody >
            <div  style={{padding : "20px"}} >
                <div style={{textAlign :"right"}}>
                    <FontAwesomeIcon onClick={toggle} style={{cursor : "pointer" , marginBottom : "10px"}} color="rgb(100,100,100)" icon={faTimes} size="lg"/>                
                </div>
                <div style={{textAlign : "center" , margin : "10px 0px"}}>                  
                    {
                        !_.isEmpty(imageUrl) ?
                        <div className="noImageEducation">
                            <img src={imageUrl} width="50" height="50"/> 
                        </div>                           
                        :
                        <div style={{textAlign : "center"}}  className="plusIconEducation" >
                            {
                                _.isEmpty(errorsNew) ?
                                <div>
                                    <Input  onChange={(e) => onUploadImage(e)} style={{opacity : "0" , position : "absolute" , border : "1px solid red"}} type="file" name="pic" accept="image/*"/>
                                    <FontAwesomeIcon style={{textAlign : "center" , }} color={"rgb(60,102,180)"} icon={faPlus} fixedWidth/> 
                                </div>
                                :
                                <div>
                                    <Input invalid onChange={(e) => onUploadImage(e)} style={{opacity : "0" , position : "absolute" , border : "1px solid red"}} type="file" name="pic" accept="image/*"/>
                                    <FormFeedback>{errorsNew.imageUrl}</FormFeedback>
                                </div>

                            }
                         
                        </div>
                    }       
                </div>
                {children}
            </div>
        </ModalBody>
        <style jsx>{`
            .plusIconEducation{
                display : inline-flex;
                justify-content : center;
                align-items : center;
                border : 2px dashed ${ errorsNew ? (errorsNew.imageUrl ? "#DC3545" : "rgb(60,102,180)") : "rgb(60,102,180)" } ;
                border-radius : 10px;
                padding : 15px 15px;
            }
            .noImageEducation{
                display : inline-flex;
                justify-content : center;
                align-items : center;
               ;
                border-radius : 10px;
                padding : 15px 15px;
            }
        `}</style>
    </Modal>
)   