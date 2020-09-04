import React, { Component } from "react";
import axios from "axios";
import { API_UPLOAD } from "../../constant/ENV";
import { imageWithToken } from "../../utils/image";
export default class ChatInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            images: [
                {
                    withURL: "",
                    withJSON: ""
                }
            ],
            file: [
                {
                    withURL: "",
                    withJSON: ""
                }
            ],
            filename: ""
        };
        this._isClick = this._isClick.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.selectImage = this.selectImage.bind(this);
        this.getBase64 = this.getBase64.bind(this);
    }
    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.props.isAddclick(false);
        }
    }
    async _isEnter(e) {
        let key = e.keyCode || e.which;
        if (key === 13) {
            await this.props.sendmessage(this.state.message);
            this.setState({
                message: ""
            });
        }
    }
    _isType(e) {
        this.setState({
            message: e.target.value
        });
    }
    async _isClick() {
        await this.props.sendmessage(this.state.message);
        await this.setState({
            message: ""
        });
    }
    setWrapperRef(node) {
        this.wrapperRef = node;
    }
    selectImage = event => {
        // console.log("event",event);
        const images = [
            ...this.state.images,
            {
                withURL: event.target.files[0] !== undefined ? URL.createObjectURL(event.target.files[0]) : "",
                withJSON: event.target.files[0] !== undefined ? event.target.files[0] : ""
            }
        ];
        // console.log("const images : ",images);
        if (event.target.files[0] !== undefined) {
            const imageWithJSON = event.target.files[0];
            this.setState({
                images
            });
            let imageToBase64 = "";
            this.getBase64(imageWithJSON, result => {
                imageToBase64 = result;
                // console.log("Result : ",result);
                this.setState({
                    imageWithBase64: imageToBase64
                });
                this.getImage(result);
            });
        }
    };
    selectFile = event => {
        // console.log("event",event);
        const file = [
            ...this.state.file,
            {
                withURL: event.target.files[0] !== undefined ? URL.createObjectURL(event.target.files[0]) : "",
                withJSON: event.target.files[0] !== undefined ? event.target.files[0] : ""
            }
        ];
        // console.log("const file : ",file);
        if (event.target.files[0] !== undefined) {
            const imageWithJSON = event.target.files[0];
            this.setState({
                file,
                filename: event.target.files[0]
            });
            let imageToBase64 = "";
            this.getBase64(imageWithJSON, result => {
                imageToBase64 = result;
                // console.log("Result : ",result);
                this.setState({
                    imageWithBase64: imageToBase64
                });
                this.getFile(result);
            });
        }
    };
    async getBase64(image, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
            cb(reader.result);
        };
        reader.onerror = function(error) {
            console.log("error: ", error);
        };
    }
    async getImage(result) {
        try {
            const res = await axios.post(`${API_UPLOAD}/image`, {
                file: result,
                path: "chat/image",
                device: "WWW"
            });
            const { data } = res;
            const { payload } = data;
            const { url } = payload;
            this.props.sendPhoto(url);
        } catch (e) {
            console.log(e);
        }
    }
    async getFile(result) {
        try {
            const res = await axios.post(`${API_UPLOAD}/file`, {
                file: result,
                path: "chat/image",
                device: "WWW"
            });
            const { data } = res;
            const { payload } = data;
            const { url } = payload;
            this.props.sendFile(url, this.state.filename);
        } catch (e) {
            console.log(e);
        }
    }
    render() {
        return (
            <div>
                {/* <div className = "chat-input-file">
                    {this.state.imageURL? this.state.imageURL.map((image,index)=>{
                        // console.log("image : ",image)
                        return(
                            <div>
                                <img src = {imageWithToken(image)} className = "img-preview-in-input" onClick = {()=>{this.deleteImage(index)}}/>
                            </div>
                        )
                    }) : ""
                    }
                </div> */}
                <div className="type-text">
                    <div className="type-text-left">
                        <input
                            style={{ display: "none" }}
                            accept="image/*"
                            type={"file"}
                            onChange={e => {
                                this.selectImage(e);
                            }}
                            ref={fileInput => (this.fileInput = fileInput)}
                            required
                            multiple
                        />
                        <input
                            style={{ display: "none" }}
                            accept="*"
                            type={"file"}
                            onChange={e => {
                                this.selectFile(e);
                            }}
                            ref={fileInput => (this.fileInput2 = fileInput)}
                            required
                            multiple
                        />
                        {this.props.addClick ? (
                            <div>
                                {/* <div className = "illusion-div-click" onClick = {this.props.isAddclick(false)}></div> */}
                                <div className="chat-add-button-menu">
                                    <ul ref={this.setWrapperRef}>
                                        <li
                                            onClick={() => {
                                                this.props.isAddclick(false);
                                                this.fileInput.click();
                                            }}
                                        >
                                            <div className={"chat-add-button-menu-button-image"}>
                                                <img src="../../static/images/icon/AW_CrewHitz_ICON-19.png" />
                                            </div>
                                            Add Photo/Video
                                        </li>
                                        <li
                                            onClick={() => {
                                                this.props.isAddclick(false);
                                                this.fileInput2.click();
                                            }}
                                        >
                                            <div className={"chat-add-button-menu-button-image"}>
                                                <img src="../../static/images/icon/AW_CrewHitz_ICON-50.png" />
                                            </div>
                                            Add File
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            ""
                        )}
                        <div
                            onClick={() => {
                                this.props.isAddclick();
                            }}
                        >
                            <div className={"chatlist-button-image"}>
                                <img src="/static/images/icon/AW_CrewHitz_ICON-69.png" />
                            </div>
                        </div>
                    </div>
                    <div className="type-text-center">
                        <input
                            className="typing-area"
                            type="text"
                            placeholder=" Write message ..."
                            onKeyPress={this._isEnter.bind(this)}
                            onChange={this._isType.bind(this)}
                            value={this.state.message}
                        />
                    </div>
                    <div className="type-text-right">
                        <div>
                            <div className={"chatlist-button-image"}>
                                <img
                                    src="/static/images/icon/AW_CrewHitz_ICON-70.png"
                                    onClick={() => {
                                        this._isClick(this.state.message);
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
