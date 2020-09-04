import { Component } from "react";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { ADD_ROOM, ADD_CURRENT_ROOM } from "../../redux/reducers/chatReducer";
import { API_MESSAGE_CHAT_ROOM, API_MESSAGE_ROOM_DELETE } from "../../constant/ENV";
import axios from "axios";
import Option from "./Option";
import router, { withRouter } from "next/dist/lib/router";
import { friendList } from "../../services/userService";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import AddFriendModal from "./AddFriendModal";
import Member from "./Member";
import ModalKick from "./ModalKick";
var moment = require("moment");

class ListMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            members: [],
            isImageOver: false,
            friendList: [],
            creatorData: {},
            isShowAddFriendModal: false,
            friendListHasNoJoin: [],
            membersUser: [],
            isKickModal: false,
            member: {},
            kickPeople: [],
            isChatMemberLoaded: true,
            isFriend: false,
            statusFriend: ""
        };
        this.showAddFriendModal = this.showAddFriendModal.bind(this);
        this.kickToggle = this.kickToggle.bind(this);
    }

    async componentWillMount() {
        const { chatRoomId } = this.props;
        // const { friendList } = this.state;
        await axios
            .get(`${API_MESSAGE_CHAT_ROOM}/${chatRoomId}`)
            .then(res => {
                res.data.payload.member.map(member => {
                    if (member.type === "CREATOR") {
                        this.setState({
                            creatorData: member,
                            member
                        });
                    }
                });
                this.setState({
                    members: res.data.payload.member,
                    isChatMemberLoaded: false
                });
            })
            .then(() => {
                this.setState({
                    isChatMemberLoaded: true
                });
            });
        await friendList().then(listFriends => {
            this.setState({
                friendList: listFriends.listFriends.listFriend
            });
        });
        this.filterFriendHasNoJoin();
    }

    showAddFriendModal(isShowAddFriendModal) {
        this.setState({
            isShowAddFriendModal
        });
    }

    async filterFriendHasNoJoin() {
        const { friendList, members } = this.state;
        let friendListHasNoJoin = [];

        members.map((member, i) => {
            // console.log(member, i);
            friendList.filter((friend, j) => {
                if (friend.id === member.user.id) {
                    console.log("Match");
                    // console.log(friend)
                    // console.log(friend, j, i);
                    // if (!friendListHasNoJoin.includes(friend)) {
                    //     friendListHasNoJoin.push(friend);
                    // }
                }
            });
        });
        this.setState({
            friendListHasNoJoin
        });
    }

    kickToggle() {
        this.setState(prev => ({
            isKickModal: !prev.isKickModal
        }));
    }

    addChatRoom(member) {
        const { chatRoomId } = this.props;
        console.log("Member", member.id);
        this.props.addRoom({
            name: member.user.name.concat(` ${member.user.surname}`),
            status: member.user.status,
            profilePic: member.user.profilePic,
            id: member.user.id,
            chatRoom: chatRoomId,
            type: "PRIVATE"
        });
        this.props.addCurrentRoom({
            name: member.user.name.concat(` ${member.user.surname}`),
            status: member.user.status,
            profilePic: member.user.profilePic,
            id: member.user.id,
            chatRoom: chatRoomId,
            type: "PRIVATE"
        });
    }

    render() {
        const { profile, chatRoomId } = this.props;
        const {
            members,
            friendListHasNoJoin,
            creatorData,
            isShowAddFriendModal,
            isKickModal,
            member,
            isChatMemberLoaded
        } = this.state;
        return (
            <div>
                <div className="group-member mt-3">
                    {isChatMemberLoaded ? (
                        <ListGroup>
                            {members.map((member, index) => {
                                return (
                                    <Member
                                        member={member}
                                        profile={profile}
                                        creatorData={creatorData}
                                        kickToggle={this.kickToggle}
                                        isKickModal={isKickModal}
                                        key={index}
                                    />
                                );
                            })}
                        </ListGroup>
                    ) : (
                        <div className="image-loading">
                            <img src="../../static/images/image-loader/spinner-loader.gif" />
                        </div>
                    )}
                    {/* <div className="add-people">
                        <Button color="primary" onClick={() => this.showAddFriendModal(true)}>
                            + Add People
                        </Button>
                    </div>
                    <AddFriendModal
                        modalShow={this.showAddFriendModal}
                        isShow={isShowAddFriendModal}
                        friendList={friendListHasNoJoin}
                    /> */}
                    {isKickModal ? <ModalKick kickToggle={this.kickToggle} chatRoomId={chatRoomId} /> : null}
                </div>
            </div>
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
)(ListMember);
