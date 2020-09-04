export const ENV = process.env.ENV
// export const API_DOMAIN_NAME = "https://api-dev.freespacex.com"
export const API_DOMAIN_NAME = `${process.env.API_DOMAIN_NAME}`;
export const DOMAIN = `${process.env.DOMAIN}`;

export const API_USER = `${process.env.API_DOMAIN_NAME}/user`;
export const API_MASTER = `${process.env.API_DOMAIN_NAME}/master`;
export const API_SERVICE = `${process.env.API_DOMAIN_NAME}/service`;
export const API_MARKET = `${process.env.API_DOMAIN_NAME}/market`;
export const API_WALLET = `${process.env.API_DOMAIN_NAME}/wallet`;
export const API_RECRUIT = `${process.env.API_DOMAIN_NAME}/recruit`;
export const API_MESSAGE = `${process.env.API_DOMAIN_NAME}/message`;
export const API_FEED = `${process.env.API_DOMAIN_NAME}/feed`;

const API_VERSION = "v1";
const API_V010001 = "v1.0.1";
const API_V020000 = "v2.0.0";
/************************** API USER ******************************************************/
export const API_USER_LOGIN = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/login`
export const API_USER_LOGOUT = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/logout`
export const API_USER_REGISTER = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/register`
export const API_USER_SEND_VERIFY = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/sendmail-vertify`
export const API_USER_VERIFY = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/verify`
export const API_USER_LOGIN_FACEBOOK = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/login/facebook`
export const API_USER_LOGIN_GOOGLE = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/login/google`
export const API_USER_PROFILE = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/profile`
export const API_USER_PROFILE_AVAILABLE = `${API_DOMAIN_NAME}/user/client/${API_V010001}/profile/available`
export const API_USER_PROFILE_ANOTHER_PROFILE = `${API_DOMAIN_NAME}/user/client/${API_V010001}/profile/another-profile/`
export const API_USER_PROFILE_V010001 = `${API_DOMAIN_NAME}/user/client/${API_V010001}/profile`
export const API_USER_ANOTHERPROFILE_V010001 = `${API_DOMAIN_NAME}/user/client/${API_V010001}/profile/another-profile/`
export const API_USER_PROFILE_PICTURE = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/profile/picture`
export const API_USER_PROFILE_UPLOAD = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/profile/upload`
export const API_USER_PROFILE_PASSPORT = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/profile/passport`
export const API_USER_PROFILE_SEAMANBOOK = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/profile/seamanbook`
export const API_USER_PROFILE_VISA = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/profile/visa`
export const API_USER_PROFILE_EDUCATION = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/profile/education`
export const API_USER_PROFILE_LICENSE = `${API_DOMAIN_NAME}/user/client/${API_V010001}/profile/certificate/competency`
export const API_USER_PROFILE_PROFICIENCY = `${API_DOMAIN_NAME}/user/client/${API_V010001}/profile/certificate/proficiency`
export const API_USER_PROFILE_HEALTH = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/profile/certificate/health`
export const API_USER_FORGOT_PASSWORD = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/forgotpassword`
export const API_USER_PROFILE_EXPERIENCE = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/profile/experience`
export const API_USER_PROFILE_EXPERIENCE_V010001 = `${API_DOMAIN_NAME}/user/client/${API_V010001}/profile/experience`
export const API_USER_PROFILE_IDCARD = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/profile/id-card`
export const API_USER_PROFILE_IDENTITY = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/profile/ident-document`
export const API_USER_PROFILE_TRAINING = `${API_DOMAIN_NAME}/user/client/${API_V010001}/profile/certificate/training`
export const API_USER_PROFILE_SKILL_ENGLISH_TEST = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/profile/skill/english-test`
export const API_USER_PROFILE_SKILL_LANGUAGE = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/profile/skill/language`
export const API_USER_PROFILE_SKILL_LANGUAGE_V010001 = `${API_DOMAIN_NAME}/user/client/${API_V010001}/profile/skill/language`
export const API_USER_PROFILE_SKILL_MARLIN_TEST = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/profile/skill/marlin-test`
export const API_USER_PROFILE_SKILL_SOFT_SKILL = `${API_DOMAIN_NAME}/user/client/${API_V010001}/profile/skill/soft-skill`
export const API_USER_PROFILE_SKILL_COMPUTER_SKILL = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/profile/skill/computer`
export const API_USER_PROFILE_CALENDAR = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/profile/calendar`
export const API_USER_PROFILE_DP_V010001 = `${API_DOMAIN_NAME}/user/client/${API_V010001}/profile/dp`
export const API_USER_PROFILE_SKILL_SOFT_SKILL_V020000 = `${API_DOMAIN_NAME}/user/client/${API_V020000}/profile/skill/soft-skill`
export const API_USER_SEARCH_FRIENDS_V010001 = `${API_DOMAIN_NAME}/user/client/${API_V010001}/profile/user`
export const API_USER_PROFILE_SKILL_HARD_SKILL_V010000 = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/profile/skill/hard-skill`
export const API_USER_PROFILE_ADD_ANOTHER_PROFILE = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/friend/add-friend`
export const API_USER_PROFILE_REQUEST_LIST = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/friend/request-list`
export const API_USER_PROFILE_REACT_REQUEST = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/friend/action-request`
export const API_USER_PROFILE_FRIEND_LIST = `${API_DOMAIN_NAME}/user/client/${API_V010001}/friend/list`
export const API_USER_PROFILE_FRIEND_LIST_V1 = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/friend/list`
export const API_USER_PROFILE_ANOTHER_FRIEND_LIST = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/friend/another-list?userId=`

export const API_USER_SUGGUEST_FIEND = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/friend/suggestion`
export const API_USER_FRIEND_UNFRIEND = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/friend/unfriend`
export const API_USER_ENDORSE = `${API_DOMAIN_NAME}/user/client/${API_V010001}/profile/endorse`
export const API_USER_FRIEND_CHECK = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/friend/check?userId=`


export const API_USER_PROFILE_FRIEND_UNFRIEND = `${API_DOMAIN_NAME}/user/client/${API_VERSION}/friend/unfriend`
// export const API_USER_PROFILE_LICENSE =`${API_DOMAIN_NAME}/user/client/${API_VERSION}/profile/certificate/competency`


/************************** API Master Data ******************************************************/
export const API_MASTER_COMPANY = `${API_DOMAIN_NAME}/master/client/${API_V010001}/company`
export const API_MASTER_DPQUALIFICATION = `${API_DOMAIN_NAME}/master/client/${API_V010001}/dpqualification`
export const API_MASTER_EDUCATION = `${API_DOMAIN_NAME}/master/client/${API_V010001}/education`
export const API_MASTER_LANGUAGE = `${API_DOMAIN_NAME}/master/client/${API_V010001}/language`
export const API_MASTER_LICENSE = `${API_DOMAIN_NAME}/master/client/${API_V010001}/certificate/competency`
export const API_MASTER_PROFICIENCY = `${API_DOMAIN_NAME}/master/client/${API_V010001}/certificate/proficiency`
export const API_MASTER_SOFT_SKILL = `${API_DOMAIN_NAME}/master/client/${API_V010001}/softskill`
export const API_MASTER_TRAINING = `${API_DOMAIN_NAME}/master/client/${API_V010001}/certificate/training`
export const API_MASTER_COMPUTER_SKILL = `${API_DOMAIN_NAME}/master/client/${API_V010001}/computer-skill`
export const API_GET_CATEGORY = `${API_DOMAIN_NAME}/master/client/${API_V010001}/category`
export const API_MASTER_RANK_V010001 = `${API_DOMAIN_NAME}/master/client/${API_V010001}/rank`;
export const API_MASTER_MAJOR_V010001 = `${API_DOMAIN_NAME}/master/client/${API_V010001}/major`;
export const API_MASTER_WORKSCORE_V010001 = `${API_DOMAIN_NAME}/master/client/${API_V010001}/workscore`;
export const API_MASTER_COUNTRY_V010001 = `${API_DOMAIN_NAME}/master/client/${API_V010001}/country`;
export const API_MASTER_NATIONALITY_V010001 = `${API_DOMAIN_NAME}/master/client/${API_V010001}/nationality`;
export const API_MASTER_CHAT_LIST = `${API_DOMAIN_NAME}/message/${API_VERSION}/message`;

/************************** API Service Data ******************************************************/
export const API_UPLOAD = `${API_DOMAIN_NAME}/service/client/${API_VERSION}/file`
export const API_GET_FILE = `${API_DOMAIN_NAME}/service/${API_VERSION}`
export const API_ALL_NOTIFICATION = `${API_DOMAIN_NAME}/service/client/${API_VERSION}/noti-inapp/history`

/************************** API Feed Data ******************************************************/
export const API_FEED_COMMENT = `${API_DOMAIN_NAME}/feed/client/${API_VERSION}/comment`
export const API_FEED_EMOTION = `${API_DOMAIN_NAME}/feed/client/${API_VERSION}/emotion`
export const API_FEED_EVENT = `${API_DOMAIN_NAME}/feed/client/${API_VERSION}/event`
export const API_FEED_EVENT_REPORT = `${API_DOMAIN_NAME}/feed/client/${API_VERSION}/event/report`
export const API_FEED_EVENT_MEMBER = `${API_DOMAIN_NAME}/feed/client/${API_VERSION}/event/member/`
export const API_FEED_EVENT_KICK = `${API_DOMAIN_NAME}/feed/client/${API_VERSION}/event/kick/`
export const API_FEED_EVENT_LEAVE = `${API_DOMAIN_NAME}/feed/client/${API_VERSION}/event/leave/{eventId}`
export const API_FEED_EVENT_LIST = `${API_DOMAIN_NAME}/feed/client/${API_VERSION}/event/list`
export const API_FEED_EVENT_INVITE = `${API_DOMAIN_NAME}/feed/client/${API_VERSION}/event/invite`
export const API_FEED_EVENT_INVITATION = `${API_DOMAIN_NAME}/feed/client/${API_VERSION}/event/invitation`
export const API_FEED_EVENT_INVITATION_ACTION = `${API_DOMAIN_NAME}/feed/client/${API_VERSION}/event/invitation/action/`
export const API_FEED_EVENT_REQUEST_ACTION = `${API_DOMAIN_NAME}/feed/client/${API_VERSION}/event/request/action`
export const API_FEED_EVENT_ID_SUGGESTION = `${API_DOMAIN_NAME}/feed/client/${API_VERSION}/event/suggestion/friend/`
export const API_FEED_EVENT_SUGGESTION = `${API_DOMAIN_NAME}/feed/client/${API_VERSION}/event/suggestion`
export const API_FEED_EVENT_REQUEST = `${API_DOMAIN_NAME}/feed/client/${API_VERSION}/event/request`
export const API_FEED_EVENT_REQUEST_LIST = `${API_DOMAIN_NAME}/feed/client/${API_VERSION}/event/request/list`
export const API_FEED_FEED = `${API_DOMAIN_NAME}/feed/client/${API_V010001}/feed`
export const API_FEED_EVENT_BOOKMARK = `${API_DOMAIN_NAME}/feed/client/${API_VERSION}/bookmark`
export const API_FEED_MY_FEED = `${API_DOMAIN_NAME}/feed/client/${API_V010001}/myfeed`
export const API_FEED_GET_EVENT = `${API_DOMAIN_NAME}/feed/client/${API_VERSION}/myevent`
export const API_FEED_GET_POST = `${API_DOMAIN_NAME}/feed/client/${API_VERSION}/mypost`
export const API_FEED_NEAR_ME = `${API_DOMAIN_NAME}/feed/client/${API_VERSION}/nearme`
export const API_FEED_POST = `${API_DOMAIN_NAME}/feed/client/${API_VERSION}/post`
export const API_FEED_REPORT = `${API_DOMAIN_NAME}/feed/client/${API_VERSION}/report`
export const API_FEED_SHARE = `${API_DOMAIN_NAME}/feed/client/${API_VERSION}/share`
export const API_FEED_SHARE_EVENT = `${API_DOMAIN_NAME}/feed/client/${API_VERSION}/share/event`
export const API_FEED_ANOTHER_PROFILE = `${API_DOMAIN_NAME}/feed/client/${API_V010001}/anothorFeed`

/************************** API Message Data ******************************************************/
export const API_MESSAGE_HISTORY = `${API_DOMAIN_NAME}/message/${API_VERSION}/message/history`;
export const API_MESSAGE_LIST = `${API_DOMAIN_NAME}/message/${API_VERSION}/message/list`;
export const API_MESSAGE_PRIVATE = `${API_DOMAIN_NAME}/message/${API_VERSION}/message/private`;
export const API_MESSAGE_GROUP = `${API_DOMAIN_NAME}/message/${API_VERSION}/message/group`;
export const API_MESSAGE_CHAT_ROOM = `${API_DOMAIN_NAME}/message/${API_VERSION}/message/chat-room`;
export const API_MESSAGE_ROOM_DELETE = `${API_DOMAIN_NAME}/message/${API_VERSION}/message/deleteRoom`;
export const API_MESSAGE_GROUP_REMOVE = `${API_DOMAIN_NAME}/message/${API_VERSION}/message/group/remove-friends`;


export const SOCKET_MESSAGE="https://api-message-dev.crewhitz.com"
export const SOCKET_FEED="https://api-feed-dev.crewhitz.com"
export const SOCKET_USER="https://api-user-dev.crewhitz.com"
export const SOCKET_SERVICE="https://api-service-dev.crewhitz.com"
export default {
    ENV,
    V010000: API_VERSION,
    V010001: API_V010001,
    USER: {
        LOGIN_V010000: API_USER_LOGIN,
        LOGOUT_V010000: API_USER_LOGOUT,
        REGISTER_V010000: API_USER_REGISTER,
        SEND_VERIFY_V010000: API_USER_SEND_VERIFY,
        VERIFY_V010000: API_USER_VERIFY,
        LOGIN_FACEBOOK_V010000: API_USER_LOGIN_FACEBOOK,
        LOGIN_GOOGLE_V010000: API_USER_LOGIN_GOOGLE,
        FORGOT_PASSWORD_V010000: API_USER_FORGOT_PASSWORD,
        FRIEND_SUGGESTION_V010000: API_USER_SUGGUEST_FIEND,
        PROFILE: {
            INDEX_010000: API_USER_PROFILE,
            AVAILABLE_010001: API_USER_PROFILE_AVAILABLE,
            ANOTHER_010001: API_USER_PROFILE_ANOTHER_PROFILE,
            INDEX_010001: API_USER_PROFILE_V010001,
            PICTURE_V010000: API_USER_PROFILE_PICTURE,
            UPLOAD_V010000: API_USER_PROFILE_UPLOAD,
            PASSPORT_V010000: API_USER_PROFILE_PASSPORT,
            SEAMAN_BOOK_V010000: API_USER_PROFILE_SEAMANBOOK,
            VISA_V010000: API_USER_PROFILE_VISA,
            EDUCATION_V010000: API_USER_PROFILE_EDUCATION,
            LICENSE_V010000: API_USER_PROFILE_LICENSE,
            PROFICIENCY_V010000: API_USER_PROFILE_PROFICIENCY,
            HEALTH_V010000: API_USER_PROFILE_HEALTH,
            EXPERIENCE_V010000: API_USER_PROFILE_EXPERIENCE,
            EXPERIENCE_V010001: API_USER_PROFILE_EXPERIENCE_V010001,
            IDCARD_V010000: API_USER_PROFILE_IDCARD,
            IDENTITY_V010000: API_USER_PROFILE_IDENTITY,
            TRAINING_V010000: API_USER_PROFILE_TRAINING,
            CALENDAR_V010000: API_USER_PROFILE_CALENDAR,
            DP_V010001: API_USER_PROFILE_DP_V010001,
            SKILL: {
                ENGLISH_TEST_V010000: API_USER_PROFILE_SKILL_ENGLISH_TEST,
                LANGUAGE_V010000: API_USER_PROFILE_SKILL_LANGUAGE,
                LANGUAGE_V010001:API_USER_PROFILE_SKILL_LANGUAGE_V010001,
                MARLIN_TEST_V010000: API_USER_PROFILE_SKILL_MARLIN_TEST,
                SOFT_SKILL_V010000: API_USER_PROFILE_SKILL_SOFT_SKILL,
                COMPUTER_SKILL_V010000: API_USER_PROFILE_SKILL_COMPUTER_SKILL,
                SOFT_SKILL_V020000: API_USER_PROFILE_SKILL_SOFT_SKILL_V020000,
                HARD_SKILL_V010000: API_USER_PROFILE_SKILL_HARD_SKILL_V010000,
            },
            SEARCH: {
                USER_V010001: API_USER_SEARCH_FRIENDS_V010001,
                ADD_V010000: API_USER_PROFILE_ADD_ANOTHER_PROFILE,
            },
            FRIEND:{
                REQUEST_LIST_V010000: API_USER_PROFILE_REQUEST_LIST,
                REACT_REQUEST_V010000: API_USER_PROFILE_REACT_REQUEST,
                FRIEND_LIST_V010000: API_USER_PROFILE_FRIEND_LIST,
                ADD_V010000: API_USER_PROFILE_ADD_ANOTHER_PROFILE,
                DELETE_V010000: API_USER+"/client/v1/friend/unfriend/",
            },
            PHOTO:{
                YOUR_PHOTO: API_USER+"/client/v1/profile/photo",
                POST_PHOTO: API_USER+"/client/v1/profile/photo/post",
                POST_ANOTHERPHOTO: API_USER+"/client/v1/profile/another/photos?userId=", 
            }
        }
    },
    MASTER: {
        COMPANY_V010000: API_MASTER_COMPANY,
        COMPANY_V020000: `${API_DOMAIN_NAME}/master/client/v2.0.0/company`,
        SHIP_V020000: `${API_DOMAIN_NAME}/master/client/v2.0.0/ship`,
        DP_QUALIFICATION_V010000: API_MASTER_DPQUALIFICATION,
        EDUCATION_V010000: API_MASTER_EDUCATION,
        LANGUAGE_V010000: API_MASTER_LANGUAGE,
        LICENSE_V010000: API_MASTER_LICENSE,
        PROFICIENCY_V010000: API_MASTER_PROFICIENCY,
        SOFT_SKILL_V010000: API_MASTER_SOFT_SKILL,
        TRAINING_V010000: API_MASTER_TRAINING,
        COMPUTER_SKILL_V010000: API_MASTER_COMPUTER_SKILL,
        CATEGORY_V010000: API_GET_CATEGORY,
        RANK_V010001: API_MASTER_RANK_V010001,
        RANK_V020000: `${API_DOMAIN_NAME}/master/client/v2.0.0/rank`,
        MAJOR_V010001: API_MASTER_MAJOR_V010001,
        MAJOR_V020000: `${API_DOMAIN_NAME}/master/client/v2.0.0/major`,
        WORKSCORE_V010001: API_MASTER_WORKSCORE_V010001,
        WORKSCORE_V020000: `${API_DOMAIN_NAME}/master/client/v2.0.0/workscore`,
        COUNTRY_V010001: API_MASTER_COUNTRY_V010001,
        NATIONALITY_V010001: API_MASTER_NATIONALITY_V010001,
        CHAT_LIST_V010000 : API_MASTER_CHAT_LIST,
    },
    SERVICE: {
        UPLOAD_V010000: API_UPLOAD,
        FILE_V010000: API_GET_FILE,
        ALL_NOTIFICATION: API_ALL_NOTIFICATION
    },
    FEED: {
        COMMENT_V010000: API_FEED_COMMENT,
        EMOTION_V010000: API_FEED_EMOTION,
        EVENT_V010000: API_FEED_EVENT,
        EVENT_MEMBER_V010000: API_FEED_EVENT_MEMBER,
        EVENT_REPORT_V010000: API_FEED_EVENT_REPORT,
        EVENT_KICK_V010000: API_FEED_EVENT_KICK,
        EVENT_LEAVE_V010000: API_FEED_EVENT_LEAVE,
        EVENT_BOOKMARK_V010000: API_FEED_EVENT_BOOKMARK,
        EVENT_LIST_V010000: API_FEED_EVENT_LIST,
        EVENT_INVITE_V010000: API_FEED_EVENT_INVITE,
        EVENT_INVITATION_V010000: API_FEED_EVENT_INVITATION,
        EVENT_INVITATION_ACTION_V010000: API_FEED_EVENT_INVITATION_ACTION,
        EVENT_REQUEST_ACTION_V010000: API_FEED_EVENT_REQUEST_ACTION,
        EVENT_REQUEST_V010000: API_FEED_EVENT_REQUEST,
        EVENT_ID_SUGGESTION_V010000: API_FEED_EVENT_ID_SUGGESTION,
        EVENT_SUGGESTION_V010000: API_FEED_EVENT_SUGGESTION,
        EVENT_REQUEST_LIST_V010000: API_FEED_EVENT_REQUEST_LIST,
        FEED_V010001: API_FEED_FEED,
        FEED_MY_FEED_V010001: API_FEED_MY_FEED,
        GET_EVENT_V010000: API_FEED_GET_EVENT,
        GET_POST_V010000: API_FEED_GET_POST,
        NEAR_ME_V010000: API_FEED_NEAR_ME,
        POST_V010000: API_FEED_POST,
        REPORT_V010000: API_FEED_REPORT,
        SHARE_V010000: API_FEED_SHARE,
        ANOTHER_FEED_V010001 : API_FEED_ANOTHER_PROFILE
    },
    SOCKET: {
        MESSAGE: process.env.SOCKET_MESSAGE,
        FEED: process.env.SOCKET_FEED,
        USER: process.env.SOCKET_USER,
        SOCKET_SERVICE: process.env.SOCKET_SERVICE,
    },
    MESSAGE: {
        LIST: API_MESSAGE+"/v1/message/list",
        HISTORY : API_MESSAGE+"/v1/message/history",
        NEW: {
            PRIVATE: API_MESSAGE+"/v1/message/private",
            GROUP: API_MESSAGE+"/v1/message/group",
        }
    }
};
