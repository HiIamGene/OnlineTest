import React from "react";
import { withRouter } from "next/router";
import compose from "recompose/compose";
import { withNamespaces } from "../../../lib/i18n";
import Icon from "../../Icon/Icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,Input , FormFeedback } from "reactstrap";
import _ from 'lodash'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown
} from "reactstrap";


class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      imageUrl:"",
      event: "",
      location: "",
      description: "",
      start: "",
      end: "",
      privacy: "",
      addfriend:"",
    },
    
    

    this.toggle = this.toggle.bind(this);
    this.handleChangeEvent = this.handleChangeEvent.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeStart= this.handleChangeStart.bind(this);
    this.handleChangeEnd= this.handleChangeEnd.bind(this);
    this.handleChangePrivacy= this.handleChangePrivacy.bind(this);
    this.handleChangeAdd = this.handleChangeAdd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  onUploadImage(e ) {
    let file =e.target.files[0]
    var reader = new FileReader();
    reader.onload = (upload) => {
        this.setState({
            createNewCoverData : {...this.state.createNewCoverData , imageUrl:upload.target.result}
        })
        
    };
    reader.readAsDataURL(file);
}   

  handleChangeEvent(e) {
    this.setState({ event: e.target.value });
  }
  handleChangeLocation(e) {
    this.setState({ location: e.target.value });
  }
  handleChangeDescription(e) {
    this.setState({ description: e.target.value });
  }
  handleChangeStart(e) {
    this.setState({ start: e.target.value });
  }
  handleChangeEnd(e) {
    this.setState({ end: e.target.value });
  }
  handleChangePrivacy(e) {
    this.setState({ privacy: e.target.value });
  }
  handleChangeAdd(e) {
    this.setState({ addfriend: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { router, t } = this.props;
    const closeBtn = (
      <button
        className="event-modal-btn-close"
        onClick={this.toggle}
      >
        &times;
      </button>
    );
    return (
      <div>
        {/* <Button
          type="button"
          className={"btn-modal"}
          style={{
            backgroundColor: "#171e4a",
            borderColor: "#171e4a",
            color: "#fff",
            padding: "2px 6px 2px 6px",
            marginTop: "10px"
          }}
          onClick={this.toggle}
        >
          +Create Event
        </Button> */}
        
        <Modal isOpen={this.state.modal} style={{ maxWidth: "650px" }}>
          <form onSubmit={this.handleSubmit}>
            <ModalHeader
              toggle={this.toggle}
              close={closeBtn}
              style={{
                borderBottom: "1px solid transparent",
                paddingBottom: 0
              }}
            />
            <ModalBody>
              <div className="row">
                <div className="box">
                  
                    <div className="wrap-camera">
                    <FontAwesomeIcon icon={faCamera} size='3x' color='gray' />
                      <span className="text">Upload Event Cover</span>
                    </div>
                  
                </div>
              
                <div className="form-group row">
                  <label className="col-3 col-form-label">Event Name</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.event}
                      onChange={this.handleChangeEvent}
                      placeholder="add short, clear name"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-3 col-form-label">Location</label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      value={this.state.location}
                      onChange={this.handleChangeLocation}
                      placeholder="Include a place or address"
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-3 col-form-label">Description</label>
                  <div className="col-sm-9">
                    <textarea
                      type="text"
                      className="form-control"
                      value={this.description}
                      onChange={this.handleChangeDescription}
                      placeholder="Tell pepple more about your event"
                      rows="2"
                    />
                  </div>
                </div>

                <div className="form-group row" style={{alignItems: 'center'}}>
                  <label className="col-3 col-form-label" style={{flex: '0 0 14%'}}>Start Date</label>
                  <div className="col-sm-2">
                    <select
                      className="form-control"
                      required
                      value={this.state.start}
                      onChange={this.handleChangeStart}
                    >
                      <option value="2019" selected>
                        2019
                      </option>
                      <option value="2018">2018</option>
                    </select>
                  </div>

                  <div className="col-sm-2">
                    <select
                      className="form-control"
                      required
                      value={this.state.start}
                      onChange={this.handleChangeStart}
                    >
                      <option value="June" selected>
                        June
                      </option>
                      <option value="July">July</option>
                    </select>
                  </div>

                  <div className="col-sm-2" style={{flex: '0 0 13%'}}>
                    <select
                      className="form-control"
          
                      required
                      value={this.state.start}
                      onChange={this.handleChangeStart}
                    >
                      <option value="20" selected>
                        20
                      </option>
                      <option value="19">19</option>
                    </select>
                  </div>
                  
                  <div style={{marginRight: '5px',marginLeft: '10px'}}>
                  <i className="far fa-clock"
                  style={{fontSize: '2em'}}></i>
                  </div>

                  <div className="col-sm-1" style={{paddingLeft: 0}}>
                    <select
                      className="form-control-sm"
                      
                      required
                      value={this.state.start}
                      onChange={this.handleChangeStart}
                    >
                      <option value="08:30" selected>
                        08:30
                      </option>
                      <option value="09:00">09:00</option>
                    </select>
                  </div>

                  <div className="col-sm-1">
                    <select
                      className="form-control-sm"
                      required
                      value={this.state.start}
                      onChange={this.handleChangeStart}
                    >
                      <option value="AM" selected>
                        AM
                      </option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>

                <div className="form-group row" style={{alignItems: 'center'}}>
                  <label className="col-3 col-form-label" style={{flex: '0 0 14%'}}>End Date</label>
                  <div className="col-sm-2">
                    <select
                      className="form-control"
                      required
                      value={this.state.end}
                      onChange={this.handleChangeEnd}
                    >
                      <option value="2019" selected>
                        2019
                      </option>
                      <option value="2018">2018</option>
                    </select>
                  </div>

                  <div className="col-sm-2">
                    <select
                      className="form-control"
                      required
                      value={this.state.end}
                      onChange={this.handleChangeEnd}
                    >
                      <option value="June" selected>
                        June
                      </option>
                      <option value="July">July</option>
                    </select>
                  </div>

                  <div className="col-sm-2" style={{flex: '0 0 13%'}}>
                    <select
                      className="form-control"
          
                      required
                      value={this.state.end}
                      onChange={this.handleChangeEnd}
                    >
                      <option value="20" selected>
                        20
                      </option>
                      <option value="19">19</option>
                    </select>
                  </div>
                  
                  <div style={{marginRight: '5px',marginLeft: '10px'}}>
                  <i className="far fa-clock"
                  style={{fontSize: '2em'}}></i>
                  </div>

                  <div className="col-sm-1" style={{paddingLeft: 0}}>
                    <select
                      className="form-control-sm"
                      
                      required
                      value={this.state.end}
                      onChange={this.handleChangeEnd}
                    >
                      <option value="08:30" selected>
                        08:30
                      </option>
                      <option value="09:00">09:00</option>
                    </select>
                  </div>

                  <div className="col-sm-1">
                    <select
                      className="form-control-sm"
                      required
                      value={this.state.end}
                      onChange={this.handleChangeEnd}
                    >
                      <option value="AM" selected>
                        AM
                      </option>
                      <option value="PM">PM</option>
                    </select>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-3 col-form-label">Privacy</label>
                  <div className="col-sm-9">
                    {/* <input
                      type="text"
                      className="form-control"
                      value={this.state.privacy}
                      onChange={this.handleChangeTeam}
                      placeholder="Public"
                    /> */}
                    <select
                      className="form-control "
                      style={{ width: "25%" }}
                      required
                      value={this.state.privacy}
                      onChange={this.handleChangePrivacy}
                    >
                      <option value="Public" selected>
                        Public
                      </option>
                      <option value="Private">Private</option>
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-3 col-form-label">Add friend</label>
                  <div className="col-sm-9">
                    <textarea
                      type="text"
                      className="form-control"
                      value={this.addfriend}
                      onChange={this.handleChangeAdd}
                      placeholder="Add friend"
                      rows="2"
                    />
                  </div>
                </div>

                <div className="form-group row-checked">
                  <div className="ch-form-reg wrap-checkbox">
                <input
                  id={"styled-checkbox-1"}
                  type="checkbox"
                  className={"ch-checkbox"}
                  
                />
                <label htmlFor="styled-checkbox-1" style={{marginBottom: '0px'}}>
                  <span style={{ fontFamily: "Cloud Light", fontSize: "17px" }}>
                    Guest can invite friend
                  </span>
                </label>
              
                  </div>
                </div>

                <div className="form-group row-checked">
                  <div className="ch-form-reg wrap-checkbox">
                <input
                  id={"styled-checkbox-2"}
                  type="checkbox"
                  className={"ch-checkbox"}
                  
                />
                <label htmlFor="styled-checkbox-2" style={{marginBottom: '0px'}}>
                  <span style={{ fontFamily: "Cloud Light", fontSize: "17px" }}>
                    People can request to join
                  </span>
                </label>
              
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter
              style={{ borderTop: "1px solid transparent", paddingTop: 0 }}
            >
              <input
                type="submit"
                value="create"
                color="primary"
                className="btn btn-primary"
              />
            </ModalFooter>
          </form>
        </Modal>
        <style jsx>{`
          .box {
            background-color: transparent;
            border-radius: 17px;
            padding: 2em;
            margin: 20px;
            border-color: gray;
            border-width: 4px;
            border-style: dashed;
            cursor: pointer;
          }
          .row {
            justify-content: center;
          }
          .form-control-sm{
            padding: .2rem .2rem;
          }
          .col-sm-2 {
            padding-right: 0;
          }
          .form-group {
            width: 100%;
          }
          .col-3 {
            flex: 0 0 18%;
          }
          .col-form-label {
            display: flex;
            font-family: "Cloud";
            padding-right: 0;
            justify-content: flex-end;
          }
          .btn-primary {
            background-color: #171e4a;
            border-color: #171e4a;
            color: #fff;
            padding: 2px 30px 2px 30px;
          }
          .col-sm-8 {
            padding-left: 0;
          }
          .wrap-camera {
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
          }
          .text {
            font-size: 0.5em;
            color: #00000091;
            margin-bottom: 0.2em;
          }
          .row-checked{
            margin-bottom: 0px;
          }
          .wrap-checkbox{
            width: 80% !important;
            padding-left: 10em;
            margin-top: 0px;
          }
          
          .ch-checkbox {
            position: absolute;
            opacity: 0; }
            .ch-checkbox + label {
              position: relative;
              cursor: pointer;
              padding: 0;
              border-radius: 50%; }
            .ch-checkbox + label:before {
              content: '';
              margin-right: 10px;
              display: inline-block;
              vertical-align: text-top;
              width: 20px;
              height: 20px;
              background: white;
              border-radius: 50%;
              box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12); }
            .ch-checkbox:hover + label:before {
              background: #3560a0;
              border-radius: 50%; }
            .ch-checkbox:focus + label:before {
              box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.12);
              border-radius: 50%; }
            .ch-checkbox:checked + label:before {
              background: #3560a0;
              border-radius: 50%; }
            .ch-checkbox:disabled + label {
              color: #b8b8b8;
              cursor: auto;
              border-radius: 50%; }
            .ch-checkbox:disabled + label:before {
              box-shadow: none;
              background: #ddd;
              border-radius: 50%; }
            .ch-checkbox:checked + label:after {
              content: '';
              position: absolute;
              left: 5px;
              top: 9px;
              background: black;
              width: 2px;
              height: 2px;
              box-shadow: 2px 0 0 black, 4px 0 0 black, 4px -2px 0 black, 4px -4px 0 black, 4px -6px 0 black, 4px -8px 0 black;
              transform: rotate(45deg);
              border-radius: 50%; }
        `}</style>
      </div>
    );
  }
}

export default compose(
  withNamespaces("event"),
  withRouter
)(ModalComponent);
