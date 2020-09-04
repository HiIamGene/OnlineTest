export const SET_INPUT_FOCUS = "SET_INPUT_FOCUS";
export const SET_FEEDS = "SET_FEEDS";
export const SET_POST_STAY = "SET_POST_STAY";
export const SET_ID_AUTH = "SET_ID_AUTH";
export const SET_POST_INFINITE_SCROLL = "SET_POST_INFINITE_SCROLL"
export const DELETE_FEED_POST = "DELETE_FEED_POST"
export const ADD_POST = "ADD_POST"
export const SET_OPTION_OPEN = "SET_OPTION_OPEN"
export const SET_EDIT_POST_OPEN = "SET_EDIT_POST_OPEN"
export const SET_DELETE_POST_OPEN = "SET_DELETE_POST_OPEN"
export const SET_CHANGE_PRIVACY_POST_OPEN = "SET_CHANGE_PRIVACY_POST_OPEN"
export const SET_REPORT_POST_OPEN = "SET_REPORT_POST_OPEN"
export const SET_POST_FOR_OPTOPN = "SET_POST_FOR_OPTOPN"
export const EDIT_FEED_POST = "EDIT_FEED_POST"
export const SET_POST_POPUP = "SET_POST_POPUP"
export const SET_CREATE_POST = "SET_CREATE_POST"
export const SET_CREATE_COMMENT = "SET_CREATE_COMMENT"
export const SET_POST_COMMENT_POPUP = "SET_POST_COMMENT_POPUP"
export const SET_POST_IMAGE_POPUP = "SET_POST_IMAGE_POPUP"
export const SET_POST_MESSAGE = "SET_POST_MESSAGE"
export const SET_POST_COMMENT = "SET_POST_COMMENT"
export const SET_POST_EMOTION = "SET_POST_EMOTION"
export const SET_POST_IMAGE = "SET_POST_IMAGE"
export const SET_POST_USER = "SET_POST_USER"
export const SET_IMAGE_INDEX = "SET_IMAGE_INDEX"
export const CLEAR_FEED_POST = "CLEAR_FEED_POST"
export const SET_CREATE_POST_HAS_POST = "SET_CREATE_POST_HAS_POST"
export const SET_DELETE_FOR_YOUTUBE = "SET_DELETE_FOR_YOUTUBE"
export const SET_BODY_BLOCK_OVERFLOW = "SET_BODY_BLOCK_OVERFLOW"
export const SET_YOUTUBE_UPLOAD = "SET_YOUTUBE_UPLOAD"
export const SET_SHARE = "SET_SHARE"
export const SET_NEARME_SHOW = "SET_NEARME_SHOW"
export const SET_SUGGEST_FRIEND_SHOW = "SET_SUGGEST_FRIEND_SHOW"
export const SET_PRIVACY_TEXT = "SET_PRIVACY_TEXT"
export const SET_EDIT_COMMENT = "SET_EDIT_COMMENT"
export const SET_DELETE_COMMENT = "SET_DELETE_COMMENT"

const initElementstate = {
    inputFocus: false,
    idAuth: "",
    postStay: false,
    feeds: [],
    posts: [],
    isOptionClose: false,
    isEditHasClick: false,
    isDeleteHasClick: false,
    isChangePrivacyHasClick: false,
    isReportHasClick: false,
    post: {},
    isPostPopup: false,
    isPostCommentPopup: false,
    isPostImagePopup: false,
    postMessage: "",
    comments: [],
    commentMessage: "",
    postIdForOption: "",
    postIdForPopup: "",
    imageIndex: -1,
    isYoutubeUpload: false,
    isCreatePostHasPost: false,
    isDelete: false,
    isBlock: false,
    isShare: false,
    isNearmeShow: true,
    isSuggestFriendShow: true,
    privacy: '',
    isEditComment: false,
    isDeleteComment: false,
    currentComment: {}
}

export default (state = initElementstate,action) =>{
    switch(action.type){
        case SET_INPUT_FOCUS :
            return {
                ...state,
                inputFocus: action.payload
            }
        case SET_FEEDS :
            return {
                ...state,
                feeds: action.payload
            }
        case SET_POST_STAY :
            return {
                ...state,
                postStay: action.payload
            }
        case SET_POST_INFINITE_SCROLL :
            const postArray = Object.values(state.posts)
            return {
                ...state,
                posts: postArray.concat(action.payload)
            }
        case ADD_POST :
            return {
                ...state,
                posts: [action.payload,...state.posts]
            }
        case DELETE_FEED_POST :
            for(let i = 0;i<state.posts.length; i++){
                if(state.posts[i].id == action.payload){
                    state.posts.splice(i,1);
                }
            } 
            return {
                ...state,
            }
        case EDIT_FEED_POST :
            // console.log("data : ",action.payload.data);
            for(let i = 0;i<state.posts.length; i++){
                if(state.posts[i].id == action.payload.id){
                    state.posts[i].message = action.payload.data.message;
                    state.posts[i].images = action.payload.data.images;
                }
            }
            return {
                ...state,
            }
        case SET_OPTION_OPEN :
            return {
                ...state,
                isOptionClose: action.payload
            }
        case SET_EDIT_POST_OPEN :
            // console.log("data", action.payload)
            return {
                ...state,
                isEditHasClick: action.payload.isClick,
                postIdForOption: action.payload.id
            }
        case SET_DELETE_POST_OPEN :
            return {
                ...state,
                isDeleteHasClick: action.payload.isClick,
                postIdForOption: action.payload.id
            }
        case SET_CHANGE_PRIVACY_POST_OPEN :
            return {
                ...state,
                isChangePrivacyHasClick: action.payload.isClick,
                postIdForOption: action.payload.id
            }
        case SET_REPORT_POST_OPEN :
            return {
                ...state,
                isReportHasClick: action.payload.isClick,
                postIdForOption: action.payload.id
            }
        case SET_POST_FOR_OPTOPN :
            return {
                ...state,
                post: action.payload
            }
        case SET_POST_POPUP :
            return {
                ...state,
                isPostPopup: action.payload.isPostPopup,
                postIdForPopup: action.payload.id
            }
        case SET_CREATE_POST :
            return {
                ...state,
                postMessage: action.payload
            }
        case SET_CREATE_COMMENT :
            return {
                ...state,
                commentMessage: action.payload
            }
        case SET_POST_COMMENT_POPUP :
            return {
                ...state,
                isPostCommentPopup: action.payload.isPostCommentPopup,
                postIdForPopup: action.payload.id
            }
        case SET_POST_MESSAGE :
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [action.payload.postId]: {
                        ...state.posts[action.payload.postId],
                        message: postMessage,
                    }       
                }
            }
        case SET_POST_USER :
                // console.log("SET_POST_USER : postUser",action.payload);
                return {
                    ...state,
                    posts: [action.payload,...state.posts]
                }
            // // console.log("SET_POST_USER",action.payload)
            // return {
            //     ...state,
            //     posts: {
            //         ...state.posts,
            //         [action.payload.postId]: {
            //             ...state.posts[action.payload.postId],
            //             user: {
            //                 id: action.payload.id,
            //                 name: action.payload.name,
            //                 surname: action.payload.surname,
            //                 profilePic: action.payload.profilePic
            //             },
            //             message: action.payload.message,
            //             //เพิ่มใหม่ ลบเพื่อแก้ได้ครับ
            //             // comments: {
            //             //     ...state.posts[action.payload.postId].comments,
            //             //     [action.payload.commentId]: {
            //             //         ...state.posts[action.payload.postId].comments[action.payload.commentId],
            //             //         message: commentMessage,
            //             //         emotions: commentEmotion
            //             //     }
            //             // },
            //             images: {
            //                 ...state.posts[action.payload.postId].images,
            //                 [action.payload.url]: {
            //                     ...state.posts[action.payload.postId].images[action.payload.url],
            //                     id: imagesId,
            //                     url: imageURL
            //                 }
            //             },
            //             // emotions: {
            //             //     ...state.posts[action.payload.postId].emotions,
            //             //     [action.payload.emotionType]: {
            //             //         ...state.posts[action.payload.postId].emotions[action.payload.emotionType],
            //             //         count: emotionCount,
            //             //     }
            //             // },
            //             //เพิ่มใหม่ ลบเพื่อแก้ได้ครับ
            //         }       
            //     }
            // }
        case SET_POST_COMMENT :
            // console.log(action.payload)
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [action.payload.postId]: {
                        ...state.posts[action.payload.postId],
                        comments: {
                            ...state.posts[action.payload.postId].comments,
                            [action.payload.commentId]: {
                                ...state.posts[action.payload.postId].comments[action.payload.commentId],
                                message: commentMessage,
                                emotions: commentEmotion
                            }
                        }
                    }       
                },
            }
        case SET_POST_IMAGE :
            // console.log(action.payload)
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [action.payload.postId]: {
                        ...state.posts[action.payload.postId],
                        images: {
                            ...state.posts[action.payload.postId].images,
                            [action.payload.url]: {
                                ...state.posts[action.payload.postId].images[action.payload.url],
                                id: imagesId,
                                url: imageURL
                            }
                        }
                    }       
                }
            }
        case SET_POST_EMOTION :
            // console.log(action.payload)
            return {
            ...state,
            posts: {
                ...state.posts,
                [action.payload.postId]: {
                    ...state.posts[action.payload.postId],
                    emotions: {
                        ...state.posts[action.payload.postId].emotions,
                        [action.payload.emotionType]: {
                            ...state.posts[action.payload.postId].emotions[action.payload.emotionType],
                            count: emotionCount,
                        }
                    }
                }       
            }
        }
        case SET_IMAGE_INDEX :
            return {
                ...state,
                imageIndex: action.payload
            }
        case SET_POST_IMAGE_POPUP :
            return {
                ...state,
                isPostImagePopup: action.payload.isPostImagePopup,
                postIdForPopup: action.payload.id
            }
        case CLEAR_FEED_POST : {
            // console.log("state.post",state.posts);
            return {
                ...state,
                posts : []
            }
        }
        case SET_CREATE_POST_HAS_POST : {
                return {
                    ...state,
                    isCreatePostHasPost : action.payload
                }
        }
        case SET_DELETE_FOR_YOUTUBE : {
            return {
                ...state,
                isDelete : action.payload
            }
        }
        case SET_BODY_BLOCK_OVERFLOW : {
            return {
                ...state,
                isBlock : action.payload
            }
        }
        case SET_SHARE : {
            return {
                ...state,
                isShare : action.payload
            }
        }
        case SET_NEARME_SHOW : {
            return {
                ...state,
                isNearmeShow : action.payload
            }
        }
        case SET_SUGGEST_FRIEND_SHOW : {
            return {
                ...state,
                isSuggestFriendShow : action.payload
            }
        }
        case SET_PRIVACY_TEXT : {
            return {
                ...state,
                privacy : action.payload
            }
        }
        case SET_EDIT_COMMENT : {
            return {
                ...state,
                isEditComment: action.payload.isEditComment,
                currentComment: action.payload.currentComment,
            }
        }
        case SET_DELETE_COMMENT : {
            return {
                ...state,
                isDeleteComment: action.payload.isEditComment,
                currentComment: action.payload.currentComment,
            }
        }
        default:
            return state;
    }
}