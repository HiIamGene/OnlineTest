export const ERROR = "ERROR"

const initState = {
    isPageError: false
}

export default (state = initState, action) => {
    const { type, payload } = action

    switch(type) {
        case ERROR :
            return {
                ...state,
                isPageError: payload
            }
        default :
            return state
    }
}