export const SET_PROFILE  = "SET_PROFILE"
export const FETCH_PROFILE  = "FETCH_PROFILE"


 const initProfileState = {
     "profileStrength": {
         "text": "Beginner",
         "percent": 0
     },
     "personalDetail": {
         "complete": false,
         "name": null,
         "surname": null,
         "displayName": null,
         "email": null,
         "nationality": null,
         "dateOfBirth": null,
         "calendar": null,
         "currentLocation": null,
         "contactNumber": null
     },
     "identity": {
         "identityCount": 0,
         "passport": {
             "documentNumber": null,
             "issuingAuthority": null,
             "issueDate": null,
             "expiryDate": null,
             "complete": false
         },
         "seamanbook": {
             "documentNumber": null,
             "issuingAuthority": null,
             "issueDate": null,
             "expiryDate": null,
             "complete": false
         },
         "idCard": {
             "documentNumber": null,
             "issuingAuthority": null,
             "issueDate": null,
             "expiryDate": null,
             "complete": false
         },
         "visaDocument": {
             "documentNumber": null,
             "issuingAuthority": null,
             "issueDate": null,
             "expiryDate": null,
             "complete": false
         }
     },
     "dataCount": {
         "experienceCount": 0,
         "educationCount": 0,
         "competencyCount": 0,
         "proficiencyCount": 0,
         "skillCount": 0,
         "languageCount": 0,
         "trainingCount": 0,
         "healthsCount": 0,
         "dpCount": 0
     },
     "user": {
         "id": null,
         "facebookId": null,
         "googleId": null,
         "email": null,
         "name": null,
         "surname": null,
         "nationality": null,
         "userType": null,
         "registerDevice": null,
         "displayName": null,
         "dateOfBirth": null,
         "calendar": null,
         "currentLocation": null,
         "contactNumber": null,
         "createdAt": null,
         "updatedAt": null,
         "deletedAt": null,
         "profilePic": null,
         "visibleStatus": null,
         "adminStatus": null,
         "permissions": {},
         "education": [],
         "competency": [],
         "proficiency": [],
         "softSkill": [],
         "language": [],
         "trainings": [],
         "healths": [],
         "experiences": []
     }
 };

const profileReducer = (state = initProfileState, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return {...state,...action.payload}
        default:
            return state
    }
}

export default profileReducer