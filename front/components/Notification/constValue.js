import { Button, ButtonGroup } from "reactstrap"

export const ACCEPT = "ACCEPT"
export const DECLINE = "DECLINE"

export const ICON = {
    AVATAR: "../../static/images/icon/user_avatar.png",
    ACCEPT: "../../static/images/icon/AW_CrewHitz_ICON-37.png",
    DECLINE: "../../static/images/icon/AW_CrewHitz_ICON-38.png",
    SCHOOL: "../../static/images/icon/AW_CrewHitz_ICON-23.png",
    EDUCATION: "../../static/images/icon/AW_CrewHitz_ICON-23.png",
    WORKSTATION: "../../static/images/icon/AW_CrewHitz_ICON-22.png",
    EXPERIENCE: "../../static/images/icon/AW_CrewHitz_ICON-22.png",
    CHECKED: "../../static/images/icon/AW_CrewHitz_ICON-35.png",
    HOME: "../../static/images/icon/home-s.png",
    LIKE: "../static/images/icon/like-icon/001.png",
    LOVE: "../static/images/icon/like-icon/002.png",
    LAUGH: "../static/images/icon/like-icon/003.png",
    TEAST: "../static/images/icon/like-icon/004.png",
    SAD: "../static/images/icon/like-icon/005.png",
    ANGRY: "../static/images/icon/like-icon/006.png",
    LOCATION: "../static/images/icon/AW_CrewHitz_ICON-02.png",
    EVENT: "../static/images/icon/AW_CrewHitz_ICON-09.png",
    FRIEND: "../static/images/icon/AW_CrewHitz_ICON-13.png",
    CONNECTION_ACCEPT: "../../static/images/icon/AW_CrewHitz_ICON-50.png",
    CONNECTION_DECLINE: "../../static/images/icon/AW_CrewHitz_ICON-36.png",
    MESSAGE: "../../static/images/icon/AW_CrewHitz_ICON-04.png",
    MESSAGE_2: "../../static/images/icon/AW_CrewHitz_ICON-11.png",
    APPROVE: "../../static/images/icon/AW_CrewHitz_ICON-50.png",
    DECLINE_2: "../../static/images/icon/AW_CrewHitz_ICON-36.png"
};

export const MY_ACTION = {
    ENDORSE: "Are you endrose me?",
    JOIN_EVENT: "to your event",
    VIEW_SKILL: "Do you see yet?"
};

export const FRIEND_ACTION = {
    ATTEND: "Attended",
    WORK: "Works at",
    COMMENT: "comment on your post",
    LIKE_COMMENT: "like your comment",
    INVITE: "invite you to",
    JOIN_EVENT: "other People Accept",
    LIKE_POST: "like your post",
    REQUEST_JOIN: "request to join your",
    ACCEPT_REQUEST: "accept your request to join",
    ACCEPT: "Accept",
    FRIEND_REQUEST: "request to your connection",
    FRIEND_ACCEPT: "accept your connection",
    SKILL: "add new Skill",
    ENDORSEMENT: "endorse your"
};

export const BTN_MSG = (funct, msgToggle, _msgToggle) => {
    return (
        <img 
            className={"notification-page-deatail-btn-img-msg"} 
            src={msgToggle ? ICON.MESSAGE_2 : ICON.MESSAGE}
            onMouseEnter={() => _msgToggle(true)}
            onMouseOut={() => _msgToggle(false)}
            onClick={funct !== undefined ? () => funct(true) : null}
        />
    )
}

export const BTN = (funct, msgToggle, _msgToggle) => {
    return (
        {
            ENDORSE: (
                <div className={"notification-page-deatail-btn-endrose"}>
                    <Button 
                        color={"secondary"}
                        size={"sm"}
                        outline
                        onClick={funct !== undefined ? () => funct(ACCEPT) : null}
                    >
                        <div>Endorse</div>
                        <div className={'red-circle-checked'}>
                            <img src={ICON.CHECKED} />
                        </div>
                    </Button>
                </div>
            ),
            NO_ENDORSE: (
                <div className={"notification-page-deatail-btn-endrose"}>
                    <Button 
                        color={"secondary"}
                        size={"sm"}
                        outline
                        onClick={funct !== undefined ? () => funct(ACCEPT) : null}
                    >
                        <div>Endorse</div>
                        <img src={ICON.CHECKED} />
                    </Button>
                </div>
            ),
            EVENT: (
                <div className={"notification-page-deatail-btn-event"}>
                    {BTN_MSG(funct, msgToggle, _msgToggle)}
                    <img className={"notification-page-deatail-btn-img-event"} 
                        src={ICON.ACCEPT} 
                        onClick={funct !== undefined ? () => funct(ACCEPT) : null}
                    />
                    <img className={"notification-page-deatail-btn-img-event"} 
                        src={ICON.DECLINE} 
                        onClick={funct !== undefined ? () => funct(DECLINE) : null}
                    />
                </div>
            ),
            CONNECTION: (
                <div className={"notification-page-deatail-btn-connection"}>
                     <img className={"notification-page-deatail-btn-img-event"} 
                        src={ICON.ACCEPT} 
                        onClick={funct !== undefined ? () => funct(ACCEPT) : null}
                    />
                     <img className={"notification-page-deatail-btn-img-event"} 
                        src={ICON.DECLINE} 
                        onClick={funct !== undefined ? () => funct(DECLINE) : null}
                    />
                </div>
            ),
            APPROVE: (
                <div className={"centerY"}>
                    {BTN_MSG(funct, msgToggle, _msgToggle)}
                    <img className={"notification-page-deatail-btn-img-event"} src={ICON.APPROVE} />
                </div>
            ),
            DECLINE: (
                <div className={"centerY"}>
                    {BTN_MSG(funct, msgToggle, _msgToggle)}
                    {/* <img className={"notification-page-deatail-btn-img-event"} src={ICON.DECLINE} /> */}
                </div>
            )
        }
    )
};