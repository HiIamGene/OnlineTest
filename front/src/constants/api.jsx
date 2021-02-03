//import ENV from './env'

//const API_DOMAIN_NAME = ENV.API_DOMAIN_NAME;
const API_DOMAIN_NAME = "http://142.93.177.152:10000";
/************************** API USER ******************************************************/
export const API_LOGIN=`${API_DOMAIN_NAME}/login`
/************************** API TEACHER ******************************************************/
export const API_TEACHER_COURSELIST_CREATECOURSE = `${API_DOMAIN_NAME}/createcourse`
export const API_TEACHER_COURSELIST_GETCOURSE=`${API_DOMAIN_NAME}/getcourselist`
export const API_TEACHER_COURSELIST_DELETECOURSE=`${API_DOMAIN_NAME}/deletecourse`
export const API_TEACHER_INFO_GETINFO=`${API_DOMAIN_NAME}/getteacherinfo`
export const API_TEACHER_INFO_EDITINFO=`${API_DOMAIN_NAME}/editteacherinfo`
export const API_TEACHER_COURSE_GETDESCRIPT=`${API_DOMAIN_NAME}/editdescription`
export const API_TEACHER_COURSE_EDITDESCRIPT=`${API_DOMAIN_NAME}/editdescription`
export const API_TEACHER_COURSE_GETANNOUNCE=`${API_DOMAIN_NAME}/getannouncement`
export const API_TEACHER_COURSE_EDITANNOUNCE=`${API_DOMAIN_NAME}/editannouncement`
export const API_TEACHER_COURSE_GETSTUDENT=`${API_DOMAIN_NAME}/getstudentincourse`
export const API_TEACHER_COURSE_ADDSTUDENT=`${API_DOMAIN_NAME}/addstudent`
export const API_TEACHER_COURSE_GETTEACHER=`${API_DOMAIN_NAME}/getteacherincourse`
export const API_TEACHER_COURSE_ADDTEACHER=`${API_DOMAIN_NAME}/addteacher`


export default {
    API_DOMAIN_NAME,
    V1: {
        TEACHER: {
            COURSELIST: {
               CREATECOURSE :API_DOMAIN_NAME+'/createcourse',
               GETCOURSE:API_DOMAIN_NAME+'/getcourselist',
               DELETECOURSE:API_DOMAIN_NAME+'/deletecourse'
            },
            INFO: {
                GETINFO: API_DOMAIN_NAME+'/getteacherinfo',
                EDITINFO: API_DOMAIN_NAME+'/editteacherinfo'
            },
            COURSE:{
                GETDESCRIPT:API_DOMAIN_NAME+'/getdescription',
                EDITDESCRIPT:API_DOMAIN_NAME+'/editdescription',
                GETANNOUNCE:API_DOMAIN_NAME+'/getannouncement',
                EDITANNOUNCE:API_DOMAIN_NAME+'/editannouncement',
                GETSTUDENT:API_DOMAIN_NAME+'/getstudentincourse',
                ADDSTUDENT:API_DOMAIN_NAME+'/addstudent',
                ADDSTUDENTFILE:API_DOMAIN_NAME+'/addstudentbyfile',
                GETTEACHER:API_DOMAIN_NAME+'/getteacherincourse',
                ADDTEACHER:API_DOMAIN_NAME+'/addteacher',
            },
            TEST:{
                GETTESTLIST:API_DOMAIN_NAME+'/gettestlist'
            }
        },
        USERNAME: API_DOMAIN_NAME+'/getusername',
        LOGIN:API_DOMAIN_NAME+'/login'
    }
}
