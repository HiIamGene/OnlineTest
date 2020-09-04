export const POST = "POST"

const initState = {
    post : {

    }
}

export default (state = initState, action) => {
    const { type, payload } = action

    switch(type) {
        case POST :
            return {
                ...state,
                post : {
                    ...payload
                }
            }
        default :
            return state
    }
}