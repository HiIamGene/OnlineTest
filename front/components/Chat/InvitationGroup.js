import { Component } from "react";
import { imageWithToken } from "../../utils/image";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { ADD_ROOM, ADD_CURRENT_ROOM } from "../../redux/reducers/chatReducer";
import router, { withRouter } from "next/dist/lib/router";
import { Form, FormGroup, Input, FormFeedback, FormText } from "reactstrap";

var moment = require("moment");

class InvitationGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: true,
            friendInput: null,
            friendList: [],
            friendSearchFilter: [],
            isFocus: false,
            toggleOpenSearch: false,
            msgOut: "../../static/images/icon/AW_CrewHitz_ICON-04.png",
            msgIn: "../../static/images/icon/AW_CrewHitz_ICON-11.png",
            isValid: null,
            friendSearchText: "",
            friendHasInvite: []
        };
    }

    componentWillMount() {
        this.getInitialFriendList();
    }

    getInitialFriendList() {
        const { friendList } = this.props;
        console.log(friendList);
        let array = [];
        friendList.forEach(index => {
            array.push({
                id: index.id,
                profilePic: index.profilePic,
                name:
                    index.name.concat(` ${index.surname}`).length > 20
                        ? index.name
                              .concat(` ${index.surname}`)
                              .substring(0, 20)
                              .concat("...")
                        : index.name.concat(` ${index.surname}`)
            });
        });
        this.setState({
            friendList: array
        });
    }

    _isFocus(e, isFocus) {
        e.target.value = "";
        this.setState({
            isFocus,
            toggleOpenSearch: isFocus
        });
    }

    searchFriend(type) {
        const { friendList } = this.state;
        let friendSearchFilter = [];
        let isValid = true;
        let friendSearchText = "";
        friendList.map(friend => {
            if (friend.name.includes(type)) {
                if (!friendSearchFilter.includes(type)) {
                    friendSearchFilter.push(friend);
                }
            } else if (friendSearchFilter.length === 0) {
                friendSearchText = "Not found anyone";
            }
        });
        this.setState({
            friendSearchFilter,
            isValid,
            friendSearchText
        });
    }

    _inputHandler(e) {
        const friendInput = e.target.value;
        if (friendInput === "") {
            this.setState({
                friendSearchFilter: [],
                friendInput: ""
            });
        } else {
            this.setState(
                {
                    friendInput
                },
                () => {
                    this.searchFriend(friendInput);
                }
            );
        }
    }

    clickInvitation(friend) {
        let {friendHasInvite, friendList} = this.state;
        friendHasInvite.push(friendHasInvite);
        friendList.map(friend => {
            if(friend.id === friendHasInvite.id) {
                return friendList.slice(friendList.indexOf(friend.id), friendList.indexOf(friend.id) + 1);
            }
        })
        // console.log("Friend list", friendList);
        this.setState({
            friendHasInvite
        });
    }

    render() {
        const {
            friendInput,
            isFocus,
            friendSearchFilter,
            msgOut,
            msgIn,
            friendSearchText,
            friendHasInvite
        } = this.state;
        return (
            <Form>
                <FormGroup>
                    <Input
                        type="email"
                        name="email"
                        value={friendInput}
                        id="exampleEmail"
                        placeholder="Name..."
                        onChange={e => this._inputHandler(e)}
                        onFocus={e => this._isFocus(e, true)}
                        // onBlur={e => this._isFocus(e, false)}
                        autoComplete="off"
                    />
                    <FormText>{friendSearchText}</FormText>
                </FormGroup>
                <div className={isFocus ? "search-box-friend-filter" : "search-box-none"}>
                    {friendSearchFilter.length > 0
                        ? friendSearchFilter.map((friend, index) => (
                              <div className="friend-item-search" onClick={() => this.clickInvitation(friend)} key={index}>
                                  <div>
                                      <img
                                          className="friend-image-box"
                                          src={
                                              friend.profilePic
                                                  ? imageWithToken(friend.profilePic)
                                                  : "../../../static/images/icon/user_avatar.png"
                                          }
                                      />
                                      <label className={"ml-5 search-box-name"}>{friend.name}</label>
                                  </div>
                                  <img
                                      className={"img-msg"}
                                      src={msgOut}
                                      onMouseEnter={e => (e.target.src = msgIn)}
                                      onMouseOut={e => (e.target.src = msgOut)}
                                  />
                              </div>
                          ))
                        : null}
                </div>
                <div className={isFocus ? "search-box-friend-filter" : "search-box-none"}>
                    {friendHasInvite.length > 0
                        ? friendHasInvite.map((friend, index) => (
                              <div className="friend-item-search" key={index}>
                                  <div>
                                      <img
                                          className="friend-image-box"
                                          src={
                                              friend.profilePic
                                                  ? imageWithToken(friend.profilePic)
                                                  : "../../../static/images/icon/user_avatar.png"
                                          }
                                      />
                                      <label className={"ml-5 search-box-name"}>{friend.name}</label>
                                  </div>
                                  <div>
                                      <img
                                          className={"img-msg"}
                                          src={msgOut}
                                          onMouseEnter={e => (e.target.src = msgIn)}
                                          onMouseOut={e => (e.target.src = msgOut)}
                                      />
                                      <p>Kick</p>
                                  </div>
                              </div>
                          ))
                        : null}
                </div>
            </Form>
        );
    }
}
const mapStateToProps = state => {
    return {
        chatlist: state.chatReducer
    };
};
const mapDispatchToProps = dispatch => {
    return {
        addRoom: component => {
            dispatch({
                type: ADD_ROOM,
                payload: component
            });
        },
        addCurrentRoom: component => {
            dispatch({
                type: ADD_CURRENT_ROOM,
                payload: component
            });
        }
    };
};
export default compose(
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    withRouter
)(InvitationGroup);
