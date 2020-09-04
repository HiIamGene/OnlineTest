import React from "react";
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
  UncontrolledDropdown,
  Badge
} from "reactstrap";
import { InputGroup, InputGroupAddon } from "reactstrap";
import NavLink from "../../components/Navbar/nav-link";
import Icon from "../Icon/Icon";
import { WIDTH_BREAKPOINT } from "../../constant/responsive";
import {logout} from "../../redux/actions/authAction";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { withNamespaces } from "../../lib/i18n";
import AlertConfirmEmail from "./AlertConfirmEmail";
import { DEFAULT_AVATAR_URL } from "../../constant";
import { withRouter } from "next/router";
import { imageWithToken } from "../../utils/image";
import Notification from "../Notification/Notification"
import MessageLog from "../MessageLog/MessageLog"
import {getUser} from '../../services/searchService';
import { Router } from "next/dist/lib/router";

class WarpNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this._inputFocus = this._inputFocus.bind(this);
    this._onClickcheck - this._onClickcheck.bind(this);
    this._destroyListbox = this._destroyListbox.bind(this);
    this.state = {
      isLoading: false,
      isFocus:false,
      isOpen: false,
      searchdata: "",
      data : [],
      countNewNotic: 0,
      iconNotic: "bell"
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  async _searchdata(e){
    this.setState({isLoading:this.state.isLoading = true});
    // console.log("Loading : " + this.state.isLoading);
    this.setState({searchdata: this.state.searchdata = e.target.value});
    let temp = await getUser(this.state.searchdata);
    this.setState({isLoading: this.state.isLoading = false});
    // console.log("Loading : " + this.state.isLoading);
    this.setState({data:temp});
    // console.log(this.state.data);
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
  userFormatName(user) {

      if(user.displayName !== null) {
          if(user.displayName.length > 20) return user.displayName.substring(0, 20)
          return user.displayName
      }
      if(user.name !== null) {
        if(user.name.length > 20) return user.name.substring(0, 20)
        return user.name
    }
  }

  receivNewNotic = (callback) => {
    const count = this.state.countNewNotic
    if(callback) {
      this.setState({
        countNewNotic: count+1,
        iconNotic: "AW_CrewHitz_ICON-12"
      }, this.setNoticIcon)
    }
  }

  setNoticIcon = () => {
    const count = this.state.countNewNotic
    console.log(count)
  }
  
  render() {
    const { user } = this.props.profile;
    const verified = user.permissions.USER_ACTIVE.action === "YES";
    const { t, router } = this.props;
    const baba = [1,2,3,4]
    const { iconNotic, countNewNotic } = this.state
    
    return (
      <div>
        <Navbar dark expand="md" className={"warp-navbar hide-mobile "}>
          <NavbarBrand onClick = {()=>{
            router.push('/feed');
          }}>
            <img
              src={`/static/images/icon/icon_wh.png`}
              alt=""
              width={130}
              className={"mb-1 mr-1"}
            />
          </NavbarBrand>

          <div className={"wrap-nav-mobile"}>
            <NavLink noLine link={"/"}>
              <Icon icon={"home"} size={"1.2"} className={"mr-1"} />
            </NavLink>
            <NavLink noLine link={"event"}>
              <Icon icon={"calendar"} size={"1.2"} />
            </NavLink>
            <NavLink noLine link={"#"}>
              <Icon icon={"store"} size={"1.2"} />
            </NavLink>
            <NavLink noLine link={"timeline"}>
              <Icon icon={"person"} size={"1.2"} />
            </NavLink>
            <NavLink noLine link={"#"}>
              <Icon icon={"message"} size={"1.2"} />
            </NavLink>
            <NavLink noLine link={"notification"}>
              <Icon icon={"bell"} size={"1.2"} />
            </NavLink>
            <NavLink noLine link={"setting"}>
              <Icon icon={"more"} size={"1"}/>
            </NavLink>
          </div>

          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <InputGroup size={"sm"}>
                  <input
                    placeholder={"Search"}
                    className={"input-search form-control"}
                    onChange = {
                      this._searchdata.bind(this)
                    }
                    onClick = {()=>{
                      this._inputFocus(true)
                    }}
                  />
                  <div className ={this.state.isFocus&&this.state.searchdata ? "search-box-list" : "search-box-list hide" }>
                    {
                      this.state.isLoading ? 
                        (this.state.searchdata == "" ? <div/> : <p className = "search-name">Loading...</p> )
                      : 
                        (this.state.data.map((data)=>{
                           const {name,surname,profilePic,id} = data;
                           return(
                            <div className = "search-box-container" onClick = {()=>{
                              this._onClickcheck();
                            }}>
                              <img src ={profilePic? imageWithToken(profilePic) :
                                DEFAULT_AVATAR_URL
                              } className = "mini-img-profile"/>
                              <p className = "search-name" onClick={() => {
                                if(user.name === name && user.id === id){
                                  router.push('/timeline');
                                  this._destroyListbox();
                                }
                                else{
                                  router.push('/timeline?search=' + id);
                                  this._destroyListbox();
                                }
                              }}>{name +" "+ surname}</p>
                            </div>
                           );
                        }))
                    }
                    {this.state.isLoading ? "" : <div className = "search-list-footer"><p className = "search-list-footer-text">Search all results for {this.state.searchdata}</p></div>}
                  </div>
                  <div className = {this.state.isFocus&&this.state.searchdata ? "zero-opacity-box" : "zero-opacity-box hide" } 
                  onClick={()=>{
                    this._destroyListbox();
                  }}></div>
                  <InputGroupAddon addonType="append">
                    <button className={"btn btn-search"} onClick={() => {router.push('/advance-search')}}>
                      <i className="fa fa-search" />
                    </button>
                  </InputGroupAddon>
                </InputGroup>
              </NavItem>
            </Nav>

            <Nav className="ml-auto" navbar>
              <NavLink noLine link={"/timeline"}>
                <img
                  src={
                    user.profilePic
                      ? imageWithToken(user.profilePic)
                      : DEFAULT_AVATAR_URL
                  }
                  alt=""
                  className={"mini-img-profile"}
                />
              </NavLink>
              <NavLink style={{ paddingLeft: 0 }} link={"/timeline"} onClick={()=> router.push("/timeline")}>
                  {this.userFormatName(user)}
              </NavLink>
              <NavLink link={"/"}>
                <Icon icon={"home"} size={"1.2"} className={"mr-1"} />
                <span className={"mr-1"}>{t("NAVBAR.home")}</span>
              </NavLink>

              <NavLink noLine className={"ml-2"} link={"/event?action=all-events"}>
                <Icon icon={"calendar"} size={"1.2"} />
                {/*<i className={"fas fa-calendar-alt nav-icon"}></i>*/}
              </NavLink>

              <NavLink noLine className={"mr-0"}>
                <Icon icon={"store"} size={"1.2"} />
              </NavLink>

              {/* <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav>
                <Icon icon={"message"} size={"1.2"} />
                </DropdownToggle>
                <MessageLog/>
              </UncontrolledDropdown> */}

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav onClick={() => {
                  this.setState({
                    countNewNotic: 0
                  })
                }}>
                  <Icon icon={"bell"} size={"1.2"}/>
                  { countNewNotic > 0 ?
                    <Badge pill color={"danger"} badgeContent={4} className={"navbar-badge-notic"}>{countNewNotic}</Badge>
                    :
                    null
                  }
                </DropdownToggle>
                <Notification token={this.props.auth.token} notic={this.receivNewNotic}/>
              </UncontrolledDropdown>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav>
                  <i
                    style={{ color: "white" }}
                    className={"fas fa-angle-down nav-icon ml-3"}
                  />
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem
                    onClick={() => {
                      router.push("/setting");
                    }}
                  >
                    Setting
                  </DropdownItem>
                  
                  <DropdownItem divider />
                  <DropdownItem
                    onClick={() => {
                      this.props.logout();
                    }}
                  >
                    <i className={"fas fa-sign-out-alt mr-2"} />
                    {t("NAVBAR.logout")}
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        {!verified && <AlertConfirmEmail email={user.email} />}
        <style>
          {`

                        .show-cfm-email{
                            top:44px !important;
                        }

                        .nav-item{
                            display: flex !important;
                            align-items: center !important;
                            cursor:pointer;
                        }

                        .warp-navbar{
                            background-color: #171e4a !important;
                            position:fixed !important;
                            top:0 !important;
                            width:100% !important;
                            z-index:1000;
                        }
                        @media only screen and (min-width: ${WIDTH_BREAKPOINT}px)  {
                           
                            .wrap-nav-mobile{
                                display: none;
                            }
                        }
                        @media only screen and (max-width: ${WIDTH_BREAKPOINT -
                          1}px)  {
                            .navbar-toggler{
                                display: none;
                            }
                           .mb-1{
                               display: none;
                           }
                           .wrap-nav-mobile{
                                display: flex;
                                justify-content: space-between;
                                width: 100%;
                                margin-bottom: 8px ;
                           }
                           .warp-navbar{
                               align-items: center;
                               position:fixed !important;
                               top:0 !important;
                               width:100% !important;
                               z-index:1000;
                           } 
                        }
                    `}
        </style>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    profile: state.profileReducer,
    auth: state.authReducer
  };
};

export default compose(
  connect(mapStateToProps,{logout}),
  withNamespaces("timeline"),
  withRouter
)(WarpNavbar);
