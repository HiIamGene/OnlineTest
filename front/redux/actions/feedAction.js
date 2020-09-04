import {
    SET_INPUT_FOCUS,
    SET_POST_STAY,
    SET_FEEDS,
    SET_POST_INFINITE_SCROLL,
    SET_OPTION_OPEN,
    SET_EDIT_POST_OPEN,
    SET_DELETE_POST_OPEN,
    SET_CHANGE_PRIVACY_POST_OPEN,
    SET_REPORT_POST_OPEN,
    SET_POST_FOR_OPTOPN,
    DELETE_FEED_POST,
    ADD_POST,
    EDIT_FEED_POST,
    SET_POST_POPUP,
    SET_CREATE_POST,
    SET_CREATE_COMMENT,
    SET_POST_COMMENT_POPUP,
    SET_POST_IMAGE_POPUP,
    SET_POST_MESSAGE,
    SET_POST_COMMENT,
    SET_POST_IMAGE,
    SET_POST_EMOTION,
    SET_POST_USER,
    SET_IMAGE_INDEX,
    SET_YOUTUBE_UPLOAD,
    CLEAR_FEED_POST,
    SET_CREATE_POST_HAS_POST,
    SET_DELETE_FOR_YOUTUBE,
    SET_BODY_BLOCK_OVERFLOW,
    SET_SHARE,
    SET_NEARME_SHOW,
    SET_SUGGEST_FRIEND_SHOW,
    SET_PRIVACY_TEXT,
    SET_EDIT_COMMENT,
    SET_DELETE_COMMENT
} from "../reducers/feedReducer";

export const setInputFocus = (isFocus) => {
    return (dispatch) => {
        dispatch({
            type: SET_INPUT_FOCUS,
            payload: isFocus
        })
    }
}
export const setPostStay = (isStay) => {
    return (dispatch) => {
        dispatch({
            type: SET_POST_STAY,
            payload: isStay
        })
    }
}
export const setFeeds = (feeds) => {
    return (dispatch) => {
        dispatch({
            type: SET_FEEDS,
            payload: feeds
        })
    }
}
export const setPostInfiniteScroll = (posts) => {
    return (dispatch) => {
        dispatch({
            type: SET_POST_INFINITE_SCROLL,
            payload: posts
        })
    }
}
export const addFeedPost = (posts) => {
    return (dispatch) => {
        dispatch({
            type: ADD_POST,
            payload: posts
        })
    }
}
export const clearFeedPost = () => {
    // console.log("clearFeedPost");
    return (dispatch) => {
        dispatch({
            type: CLEAR_FEED_POST,
        })
    }
}
export const deleteFeedPost = (id) => {
    return (dispatch) => {
        dispatch({
            type: DELETE_FEED_POST,
            payload: id
        })
    }
}
export const editFeedPost = (data) => {
    return (dispatch) => {
        dispatch({
            type: EDIT_FEED_POST,
            payload: data
        })
    }
}
export const setOptionOpen = (isOptionOpen) => {
    return (dispatch) => {
        dispatch({
            type: SET_OPTION_OPEN,
            payload: isOptionOpen
        })
    }
}
export const setEditPostOptionOpen = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_EDIT_POST_OPEN,
            payload: data
        })
    }
}
export const setDeletePostOptionOpen = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_DELETE_POST_OPEN,
            payload: data
        })
    }
}
export const setChangePrivacyOptionOpen = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_CHANGE_PRIVACY_POST_OPEN,
            payload: data
        })
    }
}
export const setReportOptionOpen = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_REPORT_POST_OPEN,
            payload: data
        })
    }
}
export const setPostForOption = (post) => {
    return (dispatch) => {
        dispatch({
            type: SET_POST_FOR_OPTOPN,
            payload: post
        })
    }
}
export const setPostPopup = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_POST_POPUP,
            payload: data
        })
    }
}
export const setCreatePost = (postMessage) => {
    return (dispatch) => {
        dispatch({
            type: SET_CREATE_POST,
            payload: postMessage
        })
    }
}
export const setCreateComment = (commentMessage) => {
    return (dispatch) => {
        dispatch({
            type: SET_CREATE_COMMENT,
            payload: commentMessage
        })
    }
}
export const setPostCommentPopup = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_POST_COMMENT_POPUP,
            payload: data
        })
    }
}
export const setPostImagePopup = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_POST_IMAGE_POPUP,
            payload: data
        })
    }
}
export const setPostMessage = (postMessage) => {
    return (dispatch) => {
        dispatch({
            type: SET_POST_MESSAGE,
            payload: postMessage
        })
    }
}
export const setPostComment = (postComment) => {
    return (dispatch) => {
        dispatch({
            type: SET_POST_COMMENT,
            payload: postComment
        })
    }
}
export const setPostImage = (postImage) => {
    return (dispatch) => {
        dispatch({
            type: SET_POST_IMAGE,
            payload: postImage
        })
    }
}
export const setPostEmotion = (postEmotion) => {
    return (dispatch) => {
        dispatch({
            type: SET_POST_EMOTION,
            payload: postEmotion
        })
    }
}
export const setPostUser = (postUser) => {
    return (dispatch) => {
        dispatch({
            type: SET_POST_USER,
            payload: postUser
        })
    }
}
export const setImageIndex = (index) => {
    return (dispatch) => {
        dispatch({
            type: SET_IMAGE_INDEX,
            payload: index
        })
    }
}
export const setYoutubeUpload = (isYoutubeUpload) => {
    return (dispatch) => {
        dispatch({
            type: SET_YOUTUBE_UPLOAD,
            payload: isYoutubeUpload
        })
    }
}
export const setCreatePostHasPost = (isCreatePostHasPost) => {
    return (dispatch) => {
        dispatch({
            type: SET_CREATE_POST_HAS_POST,
            payload: isCreatePostHasPost
        })
    }
}
export const setDeleteForYoutube = (isDelete) => {
    return (dispatch) => {
        dispatch({
            type: SET_DELETE_FOR_YOUTUBE,
            payload: isDelete
        })
    }
}
export const setBodyBlockOverflow = (isBlock) => {
    return (dispatch) => {
        dispatch({
            type: SET_BODY_BLOCK_OVERFLOW,
            payload: isBlock
        })
    }
}
export const setShare = (isShare) => {
    return (dispatch) => {
        dispatch({
            type: SET_SHARE,
            payload: isShare
        })
    }
}
export const setNearmeShow = (isNearmeShow) => {
    return (dispatch) => {
        dispatch({
            type: SET_NEARME_SHOW,
            payload: isNearmeShow
        })
    }
}
export const setSuggestFriendShow = (isSuggestFriendShow) => {
    return (dispatch) => {
        dispatch({
            type: SET_SUGGEST_FRIEND_SHOW,
            payload: isSuggestFriendShow
        })
    }
}
export const setPrivacyText = (privacy) => {
    return (dispatch) => {
        dispatch({
            type: SET_PRIVACY_TEXT,
            payload: privacy
        })
    }
}
export const setEditComment = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_EDIT_COMMENT,
            payload: data
        })
    }
}
export const setDeleteComment = (data) => {
    return (dispatch) => {
        dispatch({
            type: SET_DELETE_COMMENT,
            payload: data
        })
    }
}
