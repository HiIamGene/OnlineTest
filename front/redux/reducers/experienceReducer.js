import {experienceFields} from "../../services/experienceService";

export const SET_EXPERIENCES  = "SET_EXPERIENCES";
export const ADD_EXPERIENCES  = "ADD_EXPERIENCES";
export const SET_EXPERIENCE_COMPANY_MASTER  = "SET_EXPERIENCE_COMPANY_MASTER";
export const SET_EXPERIENCE_RANK_MASTER  = "SET_EXPERIENCE_RANK_MASTER";
export const SET_EXPERIENCE_MAJOR_MASTER  = "SET_EXPERIENCE_MAJOR_MASTER";
export const SET_EXPERIENCE_WORKSCORE_MASTER  = "SET_EXPERIENCE_WORKSCORE_MASTER";
export const SET_EXPERIENCE  = "SET_EXPERIENCE";
export const EDIT_EXPERIENCE  = "EDIT_EXPERIENCE";
export const ADD_EXPERIENCE  = "ADD_EXPERIENCE";
export const VIEW_EXPERIENCE  = "VIEW_EXPERIENCE";


const initState = {
    experiences: [],
    experience: {
        mode: VIEW_EXPERIENCE,
        ...experienceFields
    },
    companyMasters: [],
    rankMasters:[],
    majorMasters:[],
    workscoreMasters:[],
};

export default (state = initState, action) => {
    switch (action.type) {
        case SET_EXPERIENCES: {
            return {
                ...state,
                experiences: action.payload,
            };
        }
        case SET_EXPERIENCE: {
            return {
                ...state,
                experience: {
                    ...state.experience,
                    ...action.payload
                },
            };
        }
        case EDIT_EXPERIENCE: {
            return {
                ...state,
                experience: {
                    ...action.payload,
                    mode: EDIT_EXPERIENCE
                },
            };
        }
        case ADD_EXPERIENCE: {
            return {
                ...state,
                experience: {
                    ...initState.experience,
                    mode: ADD_EXPERIENCE
                },
            };
        }
        case VIEW_EXPERIENCE: {
            return {
                ...state,
                experience: initState.experience,
            };
        }
        case SET_EXPERIENCE_COMPANY_MASTER: {
            return {
                ...state,
                companyMasters: action.payload,
            };
        }

        case SET_EXPERIENCE_RANK_MASTER: {
            return {
                ...state,
                rankMasters: action.payload,
            };
        }

        case SET_EXPERIENCE_MAJOR_MASTER: {
            return {
                ...state,
                majorMasters: action.payload,
            };
        }

        case SET_EXPERIENCE_WORKSCORE_MASTER: {
            return {
                ...state,
                workscoreMasters: action.payload,
            };
        }

        case ADD_EXPERIENCES: {
            let experiences = state.experiences.concat(action.payload);
            return {
                ...state,
                experiences,
            };
        }
        default:
            return state
    }
};