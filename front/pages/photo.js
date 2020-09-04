import React, { Component } from "react";
import TimelineLayout from "../containers/app/timelineLayout";
import { Desktop, Mobile } from "../components/Responsive";
import compose from "recompose/compose";
import { withAuthSync } from "../utils/auth";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import { withNamespaces } from "../lib/i18n";
// import PhotoChild from "../components/Photo/photoitem";
import PostPhoto from "../components/Photo/postPhoto";
import YourPhoto from "../components/Photo/yourPhoto";
import Card from "../components/Feed/Card";
import axios from "axios";
import { API_UPLOAD, API_FEED_POST } from "../constant/ENV";
import API from "../constant/ENV";
import { imageWithToken } from "../utils/image";
import { DEFAULT_AVATAR_URL } from "../constant";
import {
    API_USER_PROFILE_EDUCATION,
    API_USER_PROFILE_EXPERIENCE_V010001,
    API_USER_PROFILE_SKILL_SOFT_SKILL,
    API_USER_PROFILE_ANOTHER_PROFILE
} from "../constant/ENV"
import { bindActionCreators } from "redux"
import { setProfile } from "../redux/actions/profileAction"
import { setAboutProfile } from "../redux/actions/aboutProfileAction"
import Router from "next/router"
import Navbar from '../components/Navbar'
class photo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            yourPhoto: true,
            timelinePhoto: false,
            addPhoto: false,
            isImageLoaded: true,
            imageWithBase64: [],
            imageURL: [],
            postMessage: "",
            isShowClass: false,
            privacy: "PUBLIC",
            privacyText: "Public",
            loading: true,
            success: false,
            anotherProfile: [],
            anotherProfilePage: false
        };
        this.props.setAboutProfile(this.props.profile)
        this._getData();
        this._chooseMenu = this._chooseMenu.bind(this);
        this.selectImage = this.selectImage.bind(this);
        this.getBase64 = this.getBase64.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
    }
    static async getInitialProps(ctx) {
        let aboutInfo = {}
        try {
            const exp = await axios.get(API_USER_PROFILE_EXPERIENCE_V010001)
            const edu = await axios.get(API_USER_PROFILE_EDUCATION)
            const softSkill = await axios.get(API_USER_PROFILE_SKILL_SOFT_SKILL)
            aboutInfo = {
                exp: exp.data.payload.experiences,
                edu: edu.data.payload,
                softSkill: softSkill.data.payload
            }

        } catch (e) {
            console.log(e)
        }
        return {
            aboutInfo,
            namespacesRequired: ['timeline'],
        }
    }


    componentDidMount() {
        this._getData();
    }

    componentDidUpdate() {
        if (this.props.router.query.search === undefined && this.state.anotherProfilePage) {
            this.setState({
                anotherProfilePage: false
            }, this.forceUpdate)
        }

        else if (this.props.router.query.search !== undefined && !this.state.anotherProfilePage) {
            this._getData()
        }
    }

    componentWillUpdate() {
        console.log("timeline-update", this.state)
    }

    _getData() {

        const profileData = this.props.router.query//window.location.href.split("=");
        //        console.log("timeline-router", this.props)

        if (profileData.search !== undefined) {

            const url = API_USER_PROFILE_ANOTHER_PROFILE + profileData.search
            axios.get(url).then(response => {
                if (response.status == 200) {
                    const getData = response.data.payload
                    this.setState({
                        anotherProfile: {
                            user: {
                                ...getData,
                                proficiency: []
                            },
                            edu: getData.educations,
                            exp: getData.experiences,
                            softSkill: getData.softSkills,
                            router: this.props.router,
                        },
                        ...this.props,
                        loading: false,
                        success: true,
                        anotherProfilePage: true
                    }, this._setAboutAnotherData)
                }
            })
        }
        else {
            this.setState({
                loading: false,
                success: true,
                ...this.props,
                anotherProfilePage: false
            });
        }
    }

    _setAboutAnotherData = () => {
        const { anotherProfile } = this.state
        const url = `${API_USER_PROFILE_ANOTHER_PROFILE}about/${anotherProfile.user.id}`
        axios.get(url).then(response => {
            if (response.status == 200) {
                const data = {
                    user: {
                        ...anotherProfile.user
                    },
                    ...response.data.payload
                }
                this.props.setAboutProfile(data)
            }
        })
    }
    _chooseMenu(option) {
        if (option == "Y") {
            if (this.state.yourPhoto != true) {
                this.setState({
                    yourPhoto: true,
                    timelinePhoto: false
                });
            }
        } else if (option == "T") {
            if (this.state.timelinePhoto != true) {
                this.setState({
                    yourPhoto: false,
                    timelinePhoto: true
                });
            }
        } else if (option == "A") {
            if (this.state.addPhoto != true) {
                this.setState({
                    addPhoto: true
                });
            }
        } else if (option == "C") {
            if (this.state.addPhoto != false) {
                this.setState({
                    addPhoto: false
                });
            }
        }
    }
    selectImage = event => {
        this.setState({
            isImageLoaded: false
        });
        if (event.target.files[0] !== undefined) {
            const imageWithJSON = event.target.files[0];
            let imageToBase64 = "";
            this.getBase64(imageWithJSON, result => {
                imageToBase64 = result;
                this.setState({
                    imageWithBase64: imageToBase64
                });
                this.getImage(result);
            });
        } else {
            this.setState({
                isImageLoaded: true
            });
        }
    };

    async getImage(result) {
        await axios
            .post(`${API_UPLOAD}/photo`, {
                file: result,
                path: "photo",
                device: "WWW"
            })
            .then(res => {
                this.setState({
                    imageURL: [...this.state.imageURL, res.data.payload.url],
                    isImageLoaded: true
                });
            });
    }

    async getBase64(image, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = () => {
            cb(reader.result);
        };
        reader.onerror = function (error) {
            console.log("error: ", error);
        };
    }
    deleteImage(getIndex) {
        const filterImage = this.state.imageURL.filter((item, index) => {
            return index !== getIndex;
        });
        this.setState({
            imageURL: filterImage
        });
    }
    async _sendPhoto() {
        let message = this.state.postMessage;
        if (this.state.postMessage !== "" || this.state.imageURL !== undefined) {
            let inputData;
            try {
                this.state.postMessage !== ""
                    ? (inputData = {
                        message: message,
                        images: this.state.imageURL,
                        privacy: this.state.privacy
                    })
                    : (inputData = {
                        images: this.state.imageURL,
                        privacy: this.state.privacy
                    });
                await axios.post(API_FEED_POST, { ...inputData });
            } catch (err) {
                console.log(err);
            }
            this.child._fetchPhoto();
            this.setState({
                addPhoto: false
            });
        }
    }
    inputHandler(e) {
        const message = e.target.value;
        this.setState({
            postMessage: message
        });
    }
    setToggleClass() {
        const toggleClass = this.state.isShowClass;
        this.setState({
            isShowClass: !toggleClass
        });
    }
    render() {
        let profile = this.props.profile
        
        let { user, profileStrength } = this.props.profile
        let { t } = this.props;
        let data = this.state;
        console.log(data)
        const anotherProfile = this.state.anotherProfilePage
        return (
            !this.state.loading ? (
                this.state.success ? (

                    <TimelineLayout profile={data}>
                        <input
                            style={{ display: "none" }}
                            accept="image/*"
                            type={"file"}
                            onChange={e => {
                                this.selectImage(e);
                            }}
                            multiple
                            ref={fileInput => (this.fileInput = fileInput)}
                        />
                        {this.state.addPhoto ? (
                            <div>
                                <div
                                    className="add-photo-modal-background"
                                    onClick={() => {
                                        this._chooseMenu("C");
                                    }}
                                />
                                <div className="add-photo-modal">
                                    <Card
                                        title="ADD PHOTO"
                                        topRight={
                                            <i
                                                className="fas fa-times-circle"
                                                onClick={() => {
                                                    this._chooseMenu("C");
                                                }}
                                            />
                                        }
                                    >
                                        {this.state.imageURL.length == 0 ? (
                                            <div
                                                className="add-photo-content"
                                                onClick={() => {
                                                    this.fileInput.click();
                                                }}
                                            >
                                                Add Photo here
                                        </div>
                                        ) : (
                                                <div>
                                                    <div className={"post-wrapper"}>
                                                        <img
                                                            src={
                                                                profile.user.profilePic
                                                                    ? imageWithToken(profile.user.profilePic)
                                                                    : DEFAULT_AVATAR_URL
                                                            }
                                                            className={"post-profile"}
                                                        />
                                                        <form
                                                            className={"input-wrapper"}
                                                            onSubmit={
                                                                this.state.postMessage !== ""
                                                                    ? e => this.selectImage(e)
                                                                    : e => {
                                                                        e.preventDefault();
                                                                    }
                                                            }
                                                        >
                                                            <textarea
                                                                className={"input-post"}
                                                                type="text"
                                                                placeholder={`${t("POSTS.placeholder")}, ${profile.user.name}`}
                                                                value={this.state.postMessage}
                                                                onChange={e => this.inputHandler(e)}
                                                                style={{
                                                                    resize: "none",
                                                                    overflow: "auto",
                                                                    whiteSpace: "pre-line",
                                                                    fontSize:
                                                                        this.state.postMessage.length < 50 ? "20px" : "15px"
                                                                }}
                                                                rows="1"
                                                                cols="62"
                                                                wrap="hard"
                                                            />
                                                        </form>
                                                    </div>
                                                    <div className={"image-post-photo"}>
                                                        {this.state.imageURL.map((item, index) => {
                                                            return item === "" ? (
                                                                ""
                                                            ) : (
                                                                    <div
                                                                        key={index}
                                                                        className="image"
                                                                        style={{
                                                                            backgroundImage: `url(${item}?token=${
                                                                                this.props.auth.token
                                                                                })`,
                                                                            backgroundSize: "cover",
                                                                            backgroundPosition: "center"
                                                                        }}
                                                                        onClick={() => {
                                                                            this.deleteImage(index);
                                                                        }}
                                                                    />
                                                                );
                                                        })}
                                                        {!this.state.isImageLoaded ? (
                                                            <div>
                                                                <div
                                                                    className="image"
                                                                    style={{
                                                                        backgroundImage: `url('../../../static/images/image-loader/spinner-loader.gif')`,
                                                                        backgroundSize: "cover",
                                                                        backgroundPosition: "center"
                                                                    }}
                                                                />
                                                            </div>
                                                        ) : (
                                                                ""
                                                            )}
                                                        {this.state.imageURL.length > 0 ? (
                                                            <div
                                                                className="image-upload-photo"
                                                                onClick={() => {
                                                                    this.fileInput.click();
                                                                }}
                                                            >
                                                                <i className="fas fa-plus click-upload" />
                                                            </div>
                                                        ) : (
                                                                ""
                                                            )}
                                                    </div>
                                                    <div className="photo-submit-button">
                                                        <div className="privacy-option">
                                                            <div
                                                                className="privacy-dropdown-click"
                                                                onClick={() => this.setToggleClass()}
                                                            >
                                                                {this.state.privacyText}{" "}
                                                                <i className="arrow fas fa-chevron-down" />
                                                            </div>
                                                            <ul
                                                                className={
                                                                    this.state.isShowClass
                                                                        ? "dropdown-option dropdown-show"
                                                                        : "dropdown-option"
                                                                }
                                                            >
                                                                <li
                                                                    className="privacy-sub-option"
                                                                    onClick={() => {
                                                                        this.setState({
                                                                            isShowClass: false,
                                                                            privacy: "PUBLIC",
                                                                            privacyText: "Public"
                                                                        });
                                                                    }}
                                                                >
                                                                    Public
                                                        </li>
                                                                <li
                                                                    className="privacy-sub-option"
                                                                    onClick={() => {
                                                                        this.setState({
                                                                            isShowClass: false,
                                                                            privacy: "FRIENDED",
                                                                            privacyText: "Friends Only"
                                                                        });
                                                                    }}
                                                                >
                                                                    Friends Only
                                                        </li>
                                                            </ul>
                                                        </div>
                                                        <span
                                                            className={
                                                                this.state.isImageLoaded ||
                                                                    (this.state.imageURL.length !== 0 && this.state.isImageLoaded)
                                                                    ? "share-option-photo"
                                                                    : "share-option-photo disable-btn-photo"
                                                            }
                                                            onClick={() => {
                                                                if (
                                                                    this.state.isImageLoaded ||
                                                                    (this.state.imageURL.length !== 0 &&
                                                                        this.state.isImageLoaded)
                                                                ) {
                                                                    this._sendPhoto();
                                                                }
                                                            }}
                                                        >
                                                            Share
                                                </span>
                                                    </div>
                                                </div>
                                            )}
                                    </Card>
                                </div>
                            </div>
                        ) : (
                                ""
                            )}
                        <div className="photo-session">
                            <div className="photo-header">
                                <h3 className="connection-header photos">Photo</h3>
                            </div>
                            <div className="photo-sub-header">
                                {/* <div className = "photo-sub-menu" onClick = {()=>{this._chooseMenu("Y")}}><p>Your Photo</p></div> */}
                                <div
                                    className="photo-sub-menu"
                                    onClick={() => {
                                        this._chooseMenu("T");
                                    }}
                                >{anotherProfile ?
                                    <p>{data.anotherProfile.user.name}'s Photo</p>
                                    :
                                    <p>Your Photo</p>
                                    }

                                </div>
                                {anotherProfile ?
                                    ""
                                    :
                                    <div
                                        className="photo-sub-menu add-photo-menu"
                                        onClick={() => {
                                            this._chooseMenu("A");
                                        }}
                                    >
                                        <p>+ Add Photo</p>
                                    </div>}
                            </div>
                            {data.yourPhoto ? <div className="photo-mini-pointer your-photos-pointer" /> : ""}
                            {data.timelinePhoto ? <div className="photo-mini-pointer post-photos-pointer" /> : ""}
                            {/* {data.yourPhoto?<YourPhoto onRef ={ ref =>(this.child = ref)}/> : ""} */}
                            {/* {data.timelinePhoto?<PostPhoto onRef ={ ref =>(this.child = ref)}/> : ""} */}
                            <PostPhoto onRef={ref => (this.child = ref)} anotherProfile={anotherProfile} anotherProfileId={this.props.router.query.search} />
                            {/* <PhotoChild src = "https://pm1.narvii.com/7212/92cf44b983eeec35af7926295f6a69f0513bfa45r1-433-682v2_hq.jpg"/>
                            <PhotoChild src = "https://pm1.narvii.com/7213/f5389637524e5c501ed2c3c7dcbe83c04e803f2fr1-640-480v2_hq.jpg"/>
                            <PhotoChild src = "https://pm1.narvii.com/7222/8b06af5e78c37d9c5f23cc7a2eb503ee1e302482r1-1242-1534v2_hq.jpg"/>
                            <PhotoChild src = "https://pm1.narvii.com/7214/477de6cb3d483c04613a4ec04c2b6b5154f0e0e3r1-1440-1440v2_hq.jpg"/>
                            <PhotoChild src = "https://pm1.narvii.com/7219/af0c9618beb3b095de384f7f736b95439e88c35cr1-480-323v2_hq.jpg"/>

                            <PhotoChild src = "https://pm1.narvii.com/7218/0acabea3ae4ee294d7d58b6ebe06808fee77e8d6r1-736-920v2_hq.jpg"/>
                            <PhotoChild src = "https://images.pexels.com/photos/2404843/pexels-photo-2404843.jpeg"/>
                            <PhotoChild src = "https://images.pexels.com/photos/2410327/pexels-photo-2410327.jpeg"/>
                            <PhotoChild src = "https://images.pexels.com/photos/89625/pexels-photo-89625.jpeg"/>
                            <PhotoChild src = "https://images.pexels.com/photos/1919337/pexels-photo-1919337.jpeg"/>

                            <PhotoChild src = "https://images.pexels.com/photos/325045/pexels-photo-325045.jpeg"/>
                            <PhotoChild src = "https://images.pexels.com/photos/248280/pexels-photo-248280.jpeg"/>
                            <PhotoChild src = "https://images.pexels.com/photos/2464638/pexels-photo-2464638.jpeg"/>
                            <PhotoChild src = "https://images.pexels.com/photos/2406776/pexels-photo-2406776.jpeg"/>
                            <PhotoChild src = "https://images.pexels.com/photos/2405644/pexels-photo-2405644.jpeg"/> */}
                        </div>
                        <div className="chatlist-position" />

                    </TimelineLayout>
                ) :
                    (<div>
                        <Navbar />
                        <div style={{
                            marginTop: '25%',
                            marginLeft: '25%',
                            fontSize: '72px'
                        }}>
                            <span>404: User Not Found</span>
                        </div>
                    </div>)) :
                (<div>
                    <Navbar />
                    <div style={{
                        marginTop: '25%',
                        marginLeft: '35%',
                        fontSize: '72px'
                    }}>
                        <div className={"loading-event center-loading"}>
                            <img
                                className={"loading-event-gif"}
                                src={"static/images/image-loader/spinner-loader.gif"}
                            />
                        </div>
                    </div>
                </div>)

        )

    }
}
const mapDispatchToProps = dispatch => {
    return {
        setProfile: bindActionCreators(setProfile, dispatch),
        setAboutProfile: bindActionCreators(setAboutProfile, dispatch)
    }
}
const mapStateToProps = state => {
    return {
        profile: state.profileReducer,
        auth: state.authReducer,
        aboutProfile: state.aboutProfileRedu
    };
};

export default compose(
    withNamespaces("photo"),
    connect(mapStateToProps, mapDispatchToProps),
    withAuthSync,
    withRouter
)(photo);
