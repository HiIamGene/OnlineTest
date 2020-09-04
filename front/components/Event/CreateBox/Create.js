import React from "react";
import { withRouter } from "next/router";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { withNamespaces } from "../../../lib/i18n";
import ModalComponent from "./Modal.js";
import { DEFAULT_AVATAR_URL } from "../../../constant";
import { imageWithToken } from "../../../utils/image";
import {  API_FEED_EVENT,
          API_USER_PROFILE_FRIEND_LIST,
          API_UPLOAD } from "../../../constant/ENV";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Member from "../ViewEvent/Members";
import DatePicker from "react-datepicker"
import { withToastManager } from "react-toast-notifications"
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Button,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import GoogleMapSearchBar from '../../Util/GoogleMapSearchBar'


class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      data : [],
      event: [],
      isLoading: true,
      isFocus:false,
      isOpen: false,
      searchdata: "",
      currentEvent: {
        id: "",
        message: "",
        images: [],
        createdAt: "",
        privacy: "PUBLIC"
      },
      images: [{
        withURL: "",
        withJSON: ""
      }],
      imageWithBase64: [],
      imageURL: [],
      upload: true,
      inInvitation: [],
      isOpenInvite: false,
      invitationList: [],
      uploading: false,
      startDate: new Date(),
      endDate: new Date(),
      location: "",
      toggleName: true,
      toggleExp: false,
      toggleCert: false,
      isSearchLoading: false
    };
    this.arrayFriends = [];
    this.createEvent = this.createEvent.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
    // this.toggle = this.toggle.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleClose = this.toggleClose.bind(this);
    this._inputFocus = this._inputFocus.bind(this);
    this._onClickcheck - this._onClickcheck.bind(this);
    this._destroyListbox = this._destroyListbox.bind(this);
    this.getBase64 = this.getBase64.bind(this);
    this.getImage = this.getImage.bind(this);

    this.getInitailFriendList();
    
    //// console.log(this.props);
    if(this.props.isEdit) {
      this.toggleModal();
    }

    //console.log("create box ", this.props)
  }

  componentDidMount() {
    if(this.props.created === "true") {
      this.toggleModal()
    }
  }

  getInitailFriendList = () => {
    axios.get(API_USER_PROFILE_FRIEND_LIST).then(response => {
        const data = response.data.payload.listFriends.listFriend;
        data.map(key => {
            this.arrayFriends.push({
                name : `${key.name} ${key.surname}`,
                id: key.id,
                profilePic: key.profilePic
            })
        })
        // console.log(this.arrayFriends);
    })
  }

  _isOpenInvite = (action) => {
    this.setState({
        isOpenInvite: action
    });
  }

  async getBase64(image, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('error: ', error);
    };
  }

  async getImage(result) {
    const res = await axios.post(`${API_UPLOAD}/post`, {
        "file": result,
        "path": "event/post",
        "device": "WWW"
    })
    const {data} = res
    const {payload} = data
    const {url} = payload
    await this.setState({
        imageURL: [...this.state.imageURL, url],
        upload: false,
        uploading: false
    })
  }

  selectImage = event => {
    this.setState({
      upload: true,
      uploading: true
    })
    const images = [...this.state.images, {
        withURL: event.target.files[0] !== undefined ? URL.createObjectURL(event.target.files[0]) : "",
        withJSON: event.target.files[0] !== undefined ? event.target.files[0] : ""
    }]
    if(event.target.files[0] !== undefined) {
        const imageWithJSON = event.target.files[0];
        this.setState({
            images
        })
        let imageToBase64 = ""
        this.getBase64(imageWithJSON, (result) => {
            imageToBase64 = result;
            this.setState({
                imageWithBase64: imageToBase64
            })
            this.getImage(result)
        });
    }
  };

  async createEvent(){
    
    const select = document.getElementsByClassName("form-control title-selected-event");
    const input = document.getElementsByClassName("form-control");
    const checkbox = document.getElementsByClassName("ch-checkbox");
    //const date = document.getElementById("event-datepicker")
    //console.log(input)

    const privacy = select[0].value;
    const startDate = input[5].value;
    const endDate = input[6].value;
    const eventName = input[2].value;
    const location = this.state.location
    const description = input[4].value;
    const guestFriend = checkbox[0].checked
    const publicJoind = checkbox[1].checked

    let array = [];
    this.state.invitationList.forEach(key => {
      array.push(key.id)
    })
    //// console.log(array);

    const createEventData = {
      type: "MEETING",
      privacy: privacy,
      eventName: eventName,
      location: location,
      descript: description,
      startDate: startDate,
      endDate: endDate,
      friendInvite: array,
      guestFriend: guestFriend,
      publicJoin: publicJoind,
      images: [this.state.imageURL[0]]
    }
    
    axios.post(API_FEED_EVENT, createEventData).then(response => {
      //// console.log(response);
      if(response.status == 200) {
        this.toggleClose();
        this.props.isCreated(true);
        this.props.toastManager.add("Create your Event ", {
          appearance: "success",
          autoDismiss: true
        })
        this.setState({
          imageURL: [],
          upload: true,
          invitationList: [],
        })
      }
    }).catch(err => {
      //console.log(err.request)
      if(eventName === "") {
        this.props.toastManager.add("Please Input Event Name", {
          appearance: "warning",
          autoDismiss: true
        })
      }
      if(location === "") {
        this.props.toastManager.add("Please Input Location", {
          appearance: "warning",
          autoDismiss: true
        })
      }
      if(description === "") {
        this.props.toastManager.add("Please Input Description", {
          appearance: "warning",
          autoDismiss: true
        })
      }
    })

    // console.log(createEventData);
  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal
    });
  }

  toggleOpen = () => {
    this.setState({
      modal: true
    });
  }

  toggleClose() {
    this.setState({
      modal: false,
      uploading: false,
      upload: true
    });
  }

  inputHandler(e) {
    const message = e.target.value;
    const currentEvent = {
      id: "",
      message,
      images: [],
      createdAt: "",
      privacy: "PRIVATE"
    };
    this.setState({
      currentEvent
    });
  }

  handleChangeStartDate = (date) => {
    const startTime = date.getTime()
    const endTime = this.state.endDate.getTime()
    if(startTime < new Date().getTime() - 86400000) return false
    this.setState({
      startDate: date
    })
    if(startTime > endTime) {
      this.setState({
        endDate: date
      })
    }
  }

  getLocation = (location) => {
    // console.log("location : ", location)
    /* this.props.toastManager.add(location, {
      appearance: "info",
      autoDismiss: true
    }) */
    this.setState({
      location: location
    })
  }

  handleChangeEndDate = (date) => {
    const endTime = date.getTime()
    const startTime = this.state.startDate.getTime()
    if(endTime < new Date().getTime() - 86400000) return false
    this.setState({
      endDate: date
    })
    if(startTime > endTime) {
      this.setState({
        startDate: date
      })
    }
  }

  handleToggleName = () => {
    this._clearFrienFound();
    this.setState(prevState => ({
            toggleName: true,
            toggleExp: false,
            toggleCert: false,
            clear: true
        })
    );
  }

  handleToggleExp = () => {
    this._clearFrienFound();
    this.setState(prevState => ({
            toggleName: false,
            toggleExp: true,
            toggleCert: false,
            clear: true
        })
    );
  }

  handleToggleCert = () => {
      this._clearFrienFound();
      this.setState(prevState => ({
              toggleName: false,
              toggleExp: false,
              toggleCert: true,
              clear: true
          })
      );
  }

  _clearFrienFound = () => {
    this.setState({
      searchdata: "",
      data: []
    })
    //const element = document.getElementById('search-1')
    //element[0].value = "";
  }

  _searchdata = (e) => {
    const { toggleCert, toggleExp, invitationList } = this.state
    this.setState({
      isLoading: true,
      searchdata: ""
    })
    let key = e.target.value;
    this.setState({
        data: []
    })

    if(key != "" && !this.state.toggleExp && !this.state.toggleCert) {
      this.setState({
        searchdata: key
      })
        let array = [];
        this.arrayFriends.forEach(index => {
            //// console.log(index);
            const found = index.name.includes(key);
            if(found) {
              //// console.log(index.name);
              if(this.state.invitationList.find(e => e.id == index.id) === undefined) {
                //&& this.props.memberList.find(e => e.user.id == index.id) == undefined) {
                    array.push(index);
                }
          }
        })
        this.setState({
            data: array,
            isLoading: false
        })
    }
    else if(key != "") {
      this.setState({
          isSearchLoading: true
      })
      let searchKey = ''
      if(toggleExp) {
          searchKey = '?experienceName='
      }
      if(toggleCert) {
          searchKey = '?certificateName='
      }

      axios.get(API_USER_PROFILE_FRIEND_LIST + searchKey + key).then(response => {
          if(response.status == 200) {
              let array = []
              const friend = response.data.payload.listFriends.listFriend
              friend.forEach((key1, i1) => {
                  const check = invitationList.find((e) => e.id == key1.id) === undefined
                  if(check) {
                      let tmp = key1
                      tmp.name = `${key1.name} ${key1.surname}`
                      array.push(tmp)
                  }
              })
              this.setState({
                data: array
              })
              //console.log('exp-search', array)
          }
          this.setState({
              isSearchLoading: false
          })
      }).catch(error => {
          console.log('invite-event-error', error)
      })
    }
  }
  _inputFocus(situation){
    this.setState({isFocus:this.state.isFocus = situation});
    // console.log("Focus: " + this.state.isFocus);
  }
  _onClickcheck(){
    // console.log("clicked");
  }
  _destroyListbox(){
    this.setState({isFocus:false});
  }

  removeInvitation = (index) => {
    // console.log(index);
    let array = this.state.invitationList;
    array.splice(index, 1);
  }

  clickInvitation = (e) => {
    this.setState({
        data: [],
        searchdata: ""
    })
    const element = document.getElementsByClassName("form-control");
    console.log(element)
    element[5].value = "";
    //this.handleOpenSearch();
    let array = this.state.invitationList;
    array.push(e);
    this.setState({
        invitationList: array
    })
  }

  render() {
    const { router, t, profile } = this.props;
    const { user } = this.props.profile;
    const { upload, isOpenInvite, isFocus, data, invitationList, 
            uploading, searchdata, startDate, endDate,
            location, toggleCert, toggleExp, toggleName, isSearchLoading } = this.state;
    const verified = user.permissions.USER_ACTIVE.action === "YES";
    const closeBtn = (
      <button
        className="close"
        onClick={this.toggleClose}
        style={{fontSize:"30px"}}
      >
        &times;
      </button>
    );
    // const Create = ({ router, t }) => {
    return (
      <div className={"event-wrapper"} onClick={this.toggleOpen}>
        <img
          src={
            profile.user.profilePic
              ? imageWithToken(profile.user.profilePic)
              : DEFAULT_AVATAR_URL
          }
          className={"eventpost-profile"}
        />
        <form className={"event-banner"} onSubmit={e => this.createEvent(e)}>
          {/* <input
            className={"input-eventpost"}
            type="text"
            placeholder={`${t("CREATE.placeholder")}`}
            value={this.state.currentEvent.message}
            onChange={e => this.inputHandler(e)}
          /> */}
          <div className={"input-eventpost"}>
            <span className={"text-create"}>{`${t(
              "CREATE.placeholder"
            )}`}</span>
          </div>
          <div className={"event-wrap-btn"}>
            <Button
              type="button"
              className={"btn-modal"}
              onClick={this.toggleModal}
            >
              + {t('CREATE.create')}
            </Button>
          </div>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            className={this.props.className}
            onClick={!isFocus ? () => this._isOpenInvite(false) : null}
          >
            <ModalHeader
              toggle={this.toggle}
              close={closeBtn}
              className={"modal-event-title modal-header-event"}
            >
              <span>{t('CREATE.create')}</span>
            </ModalHeader>
            <ModalBody className="modal-body-event">
              <div className="wrap-input-img-event">
                <input style={{ display: "none" }} accept="image/*" type={"file"} onChange={e => {this.selectImage(e)}} ref={fileInput => this.fileInput = fileInput}/>
                { uploading ?
                  <span className={"event-cover-uploading"}>{t('CREATE.upload')}</span>
                  :
                  upload ?
                    <div className="box-modal" onClick={() => {this.fileInput.click()}}>
                      <div className="wrap-camera">
                        <FontAwesomeIcon
                          icon={faPlus}
                          size="1x"
                          className="icon-upload"
                        />
                        {/* <span className="text">Upload Event Cover</span> */}
                      </div>
                    </div>
                    :
                    <img
                      src={imageWithToken(this.state.imageURL[0])}
                    />
                }
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label className="title-modal-form">{t('CREATE.privacy')}</label>
                  <select
                    className="form-control title-selected-event"
                    required
                    value={this.state.privacy}
                    onChange={this.handleChangePrivacy}
                    style={{fontSize:"12.8px"}}
                  >
                    <option value="PUBLIC" selected>
                      {t('PRIVACY.public')}
                    </option>
                    <option value="PRIVATE">
                      {t('PRIVACY.private')}
                    </option>
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label className="title-modal-form">{t('CREATE.name')}</label>
                  <input
                    type="text"
                    required={true}
                    className="form-control"
                    id="inputPassword4"
                    placeholder={t('CREATE.name_descript')}
                    maxLength="30"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="title-modal-form">{t('CREATE.location')}</label>
                {/* <textarea
                  type="text"
                  className="form-control"
                  id="inputAddress"
                  placeholder="Include a place or address"
                  maxLength="150"
                  rows="1"
                  onChange={(e) => this.getLocation(e.target)}
                /> */}
                <GoogleMapSearchBar 
                  onChangeLocation={this.getLocation}
                  value={this.getLocation}
                  required={true}
                  id={"location-suggest"}
                  className={"form-control"}
                  placeholder={t('CREATE.location_descript')}
                />
              </div>
              <div className="form-group">
                <label className="title-modal-form">{t('CREATE.description')}</label>
                <textarea
                  type="text"
                  required={true}
                  className="form-control"
                  id="inputAddress"
                  placeholder={t('CREATE.description_descript')}
                  rows="2"
                />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label className="title-modal-form">{t('CREATE.start_date')}</label>
                  <DatePicker
                    selected={startDate}
                    onChange={this.handleChangeStartDate}
                    className={"form-control"}
                    id={"event-start-datepicker"}
                    minDate={new Date()}
                    showMonthDropdown
                    showYearDropdown
                    scrollableMonthYearDropdown={true}
                  />
                </div>
                <div className="form-group col-md-6">
                  <label className="title-modal-form">{t('CREATE.end_date')}</label>
                  <DatePicker
                    selected={endDate}
                    onChange={this.handleChangeEndDate}
                    className={"form-control"}
                    id={"event-end-datepicker"}
                    minDate={new Date(startDate)}
                    showMonthDropdown
                    showYearDropdown
                    scrollableMonthYearDropdown={true}
                  />
                </div>
              </div>  
              <div class="form-group"
                onMouseLeave={() => this._inputFocus(false)}
                onMouseEnter={() => this._inputFocus(true)}
              >
                  <label className="title-modal-form">{t('CREATE.invite_friend')}</label>
                      <input
                          type={"text"}
                          className="form-control"
                          placeholder={t('INVITE.invite_friend')}
                          onClick={() => this._isOpenInvite(true)}
                          onChange={(e) => this._searchdata(e)}
                          id={'search-1'}
                      />
                      <div className={"invite-friend-modal"}>
                          <div className={isOpenInvite ? "modal-search-box-display" : "search-box-none"}>
                              <div className={"search-filter"}>
                                  <div className={toggleName ? "filter-on" : "filter-off"} onClick={this.handleToggleName}>Name</div>
                                  <div className={toggleExp ? "filter-on" : "filter-off"} onClick={this.handleToggleExp}>Experience</div>
                                  <div className={toggleCert ? "filter-on" : "filter-off"} onClick={this.handleToggleCert}>Certificate</div>
                              </div>
                              <div className={"search-box-body"}>
                              {
                                  data.length > 0 ?
                                  data.map(key => (
                                    <div onClick={() => this.clickInvitation(key)}>
                                        <img
                                            src={
                                                  key.profilePic ? 
                                                  imageWithToken(key.profilePic) 
                                                  : 
                                                  "../../../static/images/icon/user_avatar.png"
                                                }
                                        />
                                        <label>{key.name}</label>
                                    </div>
                                  ))
                                  :
                                  !isSearchLoading ?
                                    searchdata !== "" ?
                                      <label>{t('INVITE.not_found')}</label>
                                      :
                                      <label>{t('INVITE.input')}</label>
                                  :
                                    <label>{t('INVITE.loading')}</label>
                                    
                              }
                              </div>
                          </div>
                          <div className={"event-modal-display-invite"}>
                          {
                              invitationList.map((key, index) => (
                                  <Member detail={key} remove={this.removeInvitation} index={index}/>    
                              ))
                          }
                          </div>
                        </div>
                    </div>
              
              <div className="form-group row-checked">
                <div className="ch-form-reg wrap-checkbox-event-modal">
                  <input
                    id={"styled-checkbox-1"}
                    type="checkbox"
                    className={"ch-checkbox"}
                  />
                  <label
                    htmlFor="styled-checkbox-1"
                    style={{ marginBottom: "0px" }}
                  >
                    <span>
                      {t('CREATE.guest_join')}
                    </span>
                  </label>
                </div>
              </div>

              <div className="form-group row-checked">
                <div className="ch-form-reg wrap-checkbox-event-modal">
                  <input
                    id={"styled-checkbox-2"}
                    type="checkbox"
                    className={"ch-checkbox"}
                  />
                  <label
                    htmlFor="styled-checkbox-2"
                    style={{ marginBottom: "0px" }}
                  >
                    <span>
                      {t('CREATE.people_join')}
                    </span>
                  </label>
                </div>
              </div>
            </ModalBody>
            <ModalFooter className="modal-footer modal-footer-event">
              <Button
                color="secondary"
                onClick={this.toggleClose}
                className="btn-modal-event"
              >
                <span>{t('CREATE.cancle')}</span>
              </Button>{" "}
              <Button
                color="primary"
                onClick={(e)=> this.createEvent(e)}
                className="btn-modal-event"
              >
                <span>{t('CREATE.share')}</span>
              </Button>
            </ModalFooter>
          </Modal>
        </form>
      </div>
    );
  }
}
// }

export default compose(
  withNamespaces("event"),
  connect(store => {
    return {
      profile: store.profileReducer,
      event: store.eventReducer
    };
  }),
  withToastManager,
  withRouter
)(Create);
