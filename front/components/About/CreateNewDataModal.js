import {Modal , ModalHeader , ModalBody  ,ModalFooter , Input , FormFeedback  } from 'reactstrap'
import {faTimes , faPlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import _ from 'lodash'
export default ({errorsNew,isOpen , toggle , children , onUploadImage , imageUrl }) => (
    <Modal isOpen={isOpen} className="about-edu-modal-position">
        <ModalBody >
            <div  className="about-edu-modal-body" >
                <div className="edu-align">
                    <FontAwesomeIcon onClick={toggle} className="edu-fotawe-cursor" color="rgb(100,100,100)" icon={faTimes} size="lg"/>
                </div>
                {
                    onUploadImage ? <div className="about-edu-modal-body-upload-img">
                        {
                            !_.isEmpty(imageUrl) ?
                                <div className="about-edu-modal-no-image">
                                    <img src={imageUrl} width="50" height="50"/>
                                </div>
                                :
                                <div className="about-edu-modal-text-center"  className="about-edu-modal-plus-icon" >
                                    {
                                        _.isEmpty(errorsNew) ?
                                            <div>
                                                <Input onChange={(e) => onUploadImage(e)} className="about-edu-modal-img-edit" type="file" name="pic" accept="image/*"/>
                                                <FontAwesomeIcon className="about-edu-modal-text-center" color={"rgb(60,102,180)"} icon={faPlus} fixedWidth/>
                                            </div>
                                            :
                                            <div>
                                                <Input invalid onChange={(e) => onUploadImage(e)} className="about-edu-modal-img-edit" type="file" name="pic" accept="image/*"/>
                                                <FormFeedback>{errorsNew.imageUrl}</FormFeedback>
                                            </div>

                                    }

                                </div>
                        }
                    </div> : null
                }

                {children}
            </div>
        </ModalBody>
        {/* <style jsx>{`
            .plusIconEducation{
                display : inline-flex;
                justify-content : center;
                align-items : center;
                border : 2px dashed ${ errorsNew ? (errorsNew.imageUrl ? "#DC3545" : "rgb(60,102,180)") : "rgb(60,102,180)" } ;
                border-radius : 10px;
                padding : 15px 17px;
            }

        `}</style> */}
    </Modal>
)   