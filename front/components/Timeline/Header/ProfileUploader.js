import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPlus} from "@fortawesome/free-solid-svg-icons"
import AvatarEditor from "react-avatar-editor"
import { API_USER_PROFILE_UPLOAD , API_UPLOAD } from './../../../constant/ENV';
import {withToastManager} from "react-toast-notifications";
import axios from "axios"
import compose from 'recompose/compose';
import { connect } from 'react-redux'
import { fetchProfile } from '../../../redux/actions/profileAction';
import { bindActionCreators } from 'redux'
import {withNamespaces} from "../../../lib/i18n";
import {withRouter} from "next/dist/lib/router";
import cookies from 'js-cookie'


class ProfileUploader extends Component {
    constructor(props){
        super(props);
        this.state = {
            imageUrl:"",
            scaledImg:"",
            imgSize:1,
        }
    }

    _changeImgSize = (e) =>{
        this.setState({imgSize:e.target.value})
    }

    onClickSave = () => {
        if (this.editor) {
          const canvasScaled = this.editor.getImageScaledToCanvas()
          const img = canvasScaled.toDataURL()
          const data = {
            "profilePicture": img,
            "device": "string"
          }
          axios.post(API_USER_PROFILE_UPLOAD,data)
            .then(res=>{
              this.props.toastManager.add(res.data.message, { appearance: 'success',autoDismiss:true });
              this.props.fetchProfile()
              this._toggle()
            }).catch(err=>{
                this.props.toastManager.add(err.response.data.message, { appearance: 'error',autoDismiss:true });
                if(err.response && err.response.data.payload){
                    Object.keys(err.response.data.payload).map(key=>{
                        this.props.toastManager.add(err.response.data.payload[key], { appearance: 'error',autoDismiss:true });
                    })
                }
                console.error(err.response)
            })
        }
      }

      

    onUploadImage = (e) =>{
     
        let file =e.target.files[0]
        if(file){
            let reader = new FileReader();
            reader.onload = (upload) => {
                this.setState({
                    imageUrl:upload.target.result
                })

            };
            reader.readAsDataURL(file);
        }
        
    }

    _toggle = () =>{
        this.setState({imageUrl:""});
        this.props.toggle()
    }

    setEditorRef = (editor) => this.editor = editor

    render(){
        const {t} = this.props
        return (
            <Modal isOpen={this.props.isOpen} toggle={this._toggle} >
                <ModalHeader toggle={this.toggle}>{t('UPLOAD.upload_your_profile')}</ModalHeader>
                <ModalBody>
                    { this.state.imageUrl&& 
                        <div className="previewImg mx-auto">
                            <AvatarEditor
                                ref={this.setEditorRef}
                                image={this.state.imageUrl}
                                width={250}
                                borderRadius={1000}
                                height={250}
                                scale={this.state.imgSize}
                                rotate={0}
                                />

                            <input className="my-3" type="range" step="0.01" min="1" max="2" name="scale" value={this.state.imgSize} onChange={this._changeImgSize} />
                        </div>
                    }

                    <div style={{textAlign : "center"}}  className="uploadProfile" >
                        <input onChange={(e) => this.onUploadImage(e)} className={"inputfile"} type="file" id="profileUpload" name="pic" accept="image/*"/>
                        <label htmlFor="profileUpload" ><i className={"fas fa-plus mr-2"}></i>{t('UPLOAD.choose_photo')}</label>
                    </div>





                </ModalBody>
                <ModalFooter style={{ alignItems: 'stretch'}}>
                    <Button color="secondary" onClick={this._toggle}>{t('UPLOAD.cancel')}</Button>

                    {this.state.imageUrl&& <Button color="success" style={{ marginBottom: 0}} onClick={this.onClickSave}>{t('UPLOAD.save')}</Button> }
                </ModalFooter>

                <style jsx>{`
                    .previewImg{
                        display: flex;
                        flex-direction: column;
                        align-content: center;
                        width: 60%;
                    }
                    .inputfile{
                        width: 0.1px;
                        height: 0.1px;
                        opacity: 0;
                        overflow: hidden;
                        position: absolute;
                        z-index: -1;
                    }

                    .inputfile + label {
                        font-size: .8em;
                        font-weight: 700;
                        color: white;
                        background-color: #171e4a;
                        display: inline-block;
                        padding: 10px;
                        border-radius: 3px;
                    }

                    .inputfile:focus + label,
                    .inputfile + label:hover {
                        background-color: #3d436d;
                        cursor: pointer;
                    }


                    input[type=range] {
  height: 23px;
  -webkit-appearance: none;
  margin: 10px 0;
  width: 100%;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 3px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0px 0px 0px #FFFFFF;
  background: #171e4a;
  border-radius: 0px;
  border: 0px solid #000000;
}
input[type=range]::-webkit-slider-thumb {
  box-shadow: 0px 0px 0px #171E4A;
  border: 2px solid #171E4A;
  height: 15px;
  width: 15px;
  border-radius: 50px;
  background: #171E4A;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -7px;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: #171e4a;
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: 3px;
  cursor: pointer;
  animate: 0.2s;
  box-shadow: 0px 0px 0px #FFFFFF;
  background: #171e4a;
  border-radius: 0px;
  border: 0px solid #000000;
}
input[type=range]::-moz-range-thumb {
  box-shadow: 0px 0px 0px #171E4A;
  border: 2px solid #171E4A;
  height: 15px;
  width: 15px;
  border-radius: 50px;
  background: #171E4A;
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 100%;
  height: 3px;
  cursor: pointer;
  animate: 0.2s;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: #171e4a;
  border: 0px solid #000000;
  border-radius: 0px;
  box-shadow: 0px 0px 0px #FFFFFF;
}
input[type=range]::-ms-fill-upper {
  background: #171e4a;
  border: 0px solid #000000;
  border-radius: 0px;
  box-shadow: 0px 0px 0px #FFFFFF;
}
input[type=range]::-ms-thumb {
  margin-top: 1px;
  box-shadow: 0px 0px 0px #171E4A;
  border: 2px solid #171E4A;
  height: 15px;
  width: 15px;
  border-radius: 50px;
  background: #171E4A;
  cursor: pointer;
}
input[type=range]:focus::-ms-fill-lower {
  background: #171e4a;
}
input[type=range]:focus::-ms-fill-upper {
  background: #171e4a;
}
                `}</style>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchProfile: bindActionCreators(fetchProfile, dispatch),
    }
}
export default compose(
    withNamespaces('timeline'),
    withToastManager,
    connect(null,mapDispatchToProps)
    )(ProfileUploader);