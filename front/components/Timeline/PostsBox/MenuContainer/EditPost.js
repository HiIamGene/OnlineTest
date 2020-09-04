import React, { Component } from 'react';
import compose from "recompose/compose";
import {connect} from "react-redux"
import {setOptionOpen, setEditPostOptionOpen, setPostInfiniteScroll, editFeedPost} from "../../../../redux/actions/feedAction";
import {withNamespaces} from "../../../../lib/i18n";
import Card from '../../Card';
import { imageWithToken } from '../../../../utils/image';
import axios from 'axios'
import { API_UPLOAD, API_FEED_POST, API_FEED_FEED } from '../../../../constant/ENV';
import { DEFAULT_AVATAR_URL } from "../../../../constant";

class EditPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            posts: [],
            editImageURL: this.props.feed.post.images.map(image => { return image.url }),
            editMessage: this.props.feed.post.message,
            currentPost: {
                id: "",
                message: "",
                postImages: [],
                createdAt: "",
                user: {
                    profilePic: "",
                    id: "",
                    name: "",
                    surName: ""
                }
            },
            imageWithBase64: [],
            imageURL: [],
            isShowClass: false,
            isImageLoaded: true
        }
        this.editPost = this.editPost.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.selectImage = this.selectImage.bind(this);
        this.getBase64 = this.getBase64.bind(this);
    }

    async editPostSubmit(e) {
        e.preventDefault();
        const { editMessage, editImageURL } = this.state
        let inputData = {
            "message" : "",
            "images": []
        };
        editMessage !== null ? editImageURL === undefined ? 
        inputData = {
            message: editMessage
        } : 
        inputData = {
            message: editMessage,
            images: editImageURL
        }  : 
        inputData = {
            images: editImageURL
        }
        const res = await axios.put(`${API_FEED_POST}/${this.props.feed.post.id}`, {...inputData})
        const {data} = res
        const {payload} = data
        const {post} = payload
        this.props.editFeedPost({
            id: this.props.feed.post.id,
            data: post,
        });
    }

    inputHandler(e) {
        const message = e.target.value
        const editMessage = message !== null ? message : "";
        this.setState({
            editMessage
        })
    }

    deleteImage(getIndex) {
        const filterImage = this.state.imageURL.filter((item, index) => {
            return index !== getIndex
        })
        this.setState({
            imageURL: filterImage
        })
        // console.log(filterImage)
    }

    selectImage = event => {
        this.state.imageURL.push({
            url:"",
            isLoad:true
        })
        let file = event.target.files
        if(file !== undefined) {
            // for(let image in file) {
            //     
            // }
            Object.values(file).map((image, index) => {
                // console.log(image)
                let imageToBase64 = ""
                this.getBase64(image, (result) => {
                    imageToBase64 = result;
                    this.setState({
                        imageWithBase64: [...this.state.imageWithBase64, imageToBase64]
                    })
                    this.getImage(result, index)
                });
            })
        }
        else{
            this.setState({
                isImageLoaded: true
            })
        }
    };

    getImage(result, index) {
        let imageURL = this.state.imageURL;
        imageURL[index] = {
            isLoad: true
        };
        this.setState({
            imageURL
        })
        axios.post(`${API_UPLOAD}/post`, {
            "file": result,
            "path": "feed/post",
            "device": "WWW"
        })
        .then(res => {
            imageURL[index] = {
                url: res.data.payload.url,
                isLoad: false
            };

            this.setState({
                imageURL
            })
        })
    }

    async getBase64(image, cb) {
        // console.log(image)
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('error: ', error);
        };
    }

    confirmToExit() {
        const {t} = this.props
        const res = confirm(t('OPTION.confirm text'))
        if(res) {
            this.props.setOptionOpen(true)
            this.props.setEditPostOptionOpen(false)
        }
    }

    editPost() {
        const {t, profile} = this.props
        return (
            <div>
                <Card>
                    <div className={"post-wrapper"}>
                        <img src={profile.user.profilePic ? imageWithToken(profile.user.profilePic) : DEFAULT_AVATAR_URL} className={"post-profile"}/>
                        <form className={"input-wrapper"} onSubmit={e => this.editPostSubmit(e)}>
                            <input className={"input-post"} type="text" placeholder={`${t('POSTS.placeholder')}, ${profile.user.name}`}
                                value={this.state.editMessage} onChange={e => this.inputHandler(e)}/>
                        </form>
                    </div>
                    <div className="image-wrapper">
                        <div className={"image-state"}>
                            <div className={"image-post"}>
                                {this.state.imageURL.map((item, index) => {
                                    if(item.url !== "") {
                                        return item.isLoad ?
                                        <div key={item.id} className="image" style={{ backgroundImage: `url('../../../static/images/image-loader/spinner-loader.gif')`, backgroundSize: "cover", backgroundPosition: "center" }}/> :
                                        <div key={index} className="image" style={{ backgroundImage: `url(${item.url}?token=${this.props.auth.token})`, backgroundSize: "cover", backgroundPosition: "center" }} onClick={() => {this.deleteImage(index)}}/>
                                    }
                                })}
                                {this.state.imageURL.length > 0 ?
                                <div className="image-upload" onClick={() => {this.fileInput.click()}}>
                                    <i className="fas fa-plus click-upload"/>
                                </div> : ""}
                            </div>
                        </div>
                    </div>
                    <div className={"post-focus-option show-option"}>
                        <div className={"post-focus-wrapper"}>
                            <div className={"media-options"}>
                                <input style={{ display: "none" }} accept="image/x-png,image/gif,image/jpeg" type={"file"} onChange={e => this.selectImage(e)} ref={fileInput => this.fileInput = fileInput}/>
                                <i className={" click-animation fas fa-camera border-right pr-2 mx-1"} onClick={() => {
                                    this.fileInput.setAttribute("multiple","multiple");
                                    this.fileInput.click();
                                }}/>
                                <i className={" click-animation fas fa-video mx-1"}/>
                            </div>
                            <div className={"post-option"}>
                                <span className={(this.state.editMessage !== "" && this.state.isImageLoaded) || (this.state.editImageURL.length !== 0 && this.state.isImageLoaded) ? "share-option" : "share-option disable-btn"} onClick={ e => {
                                    if((this.state.editMessage !== "" && this.state.isImageLoaded) || (this.state.editImageURL.length !== 0 && this.state.isImageLoaded)) {
                                        this.editPostSubmit(e)
                                        this.props.setEditPostOptionOpen(false)
                                    }
                                } }>{t('POST_MENU.Edit Post')}</span>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
    render() {
        const { optionName } = this.props
        return(
            !this.props.feed.isOptionClose ? 
                <div className="option-post-wrapper">
                    <div className="option-header">
                        <div className="option-name-header">{optionName}</div>
                        <div className="option-name-close" onClick={() => {
                            this.confirmToExit()
                        }}><i className="fas fa-times"/></div>
                    </div>
                    <div className="option-edit-post-wrapper">
                        {this.editPost()}
                    </div>
                </div> : ""
        )
    }
}

const mapStateToProps = (store) => {
    return {
        feed: store.feedReducer
    }
};

export default compose(
    withNamespaces('timeline'),
    connect(mapStateToProps,{setOptionOpen, setEditPostOptionOpen, editFeedPost, setPostInfiniteScroll}),
)(EditPost)