//import ENV from './env'

//const API_DOM IN_NAME = ENV.API_DOMAIN_NAME;
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
               CREATECOURSE :'/createcourse',
               GETCOURSE:'/getcourselist',
               DELETECOURSE:'/deletecourse',
               TEACHERADDCOURSE:'/teacheraddcourse'
            },
            INFO: {
                GETINFO: '/getteacherinfo',
                EDITINFO: '/editteacherinfo'
            },
            COURSE:{
                GETDESCRIPT:'/getdescription',
                EDITDESCRIPT:'/editdescription',
                GETANNOUNCE:'/getannouncement',
                EDITANNOUNCE:'/editannouncement',
                GETSTUDENT:'/getstudentincourse',
                ADDSTUDENT:'/addstudent',
                ADDSTUDENTFILE:API_DOMAIN_NAME+'/addstudentbyfile',
                DELETESTUDENT:'/deletestudentincourse',
                GETTEACHER:'/getteacherincourse',
                ADDTEACHER:'/addteacher',
                DELETETEACHER:'/deleteteacherincourse',
                GETTESTLIST:'/getalltestincourse',
                DELETETEST:"/deletetest",
                TEST:{
                    GROUPSTESTLISTUPDATE:'/grouptestlistupdate',
                    ALLGROUPTESTBANK:'/allgrouptestlist',
                    UPDATEDETAILLIST:'/updatedetailtest',
                    UPDATEDRAFT :'/changedraftstatus',
                    UPLOADPIC:API_DOMAIN_NAME+'/uploadpic',
                    GROUPTESTLIST:"/testbankupdate ", //check
                    ALLQUESTIONINTESTBANK:"/updateallquestionintest",
                    TESTBANKUPDATE:"/testbankupdate "
                },
                SCORE:{
                    GETSCORE:'/getallstudentscore',
                    GETCV:'/getstatisticvalue'
                }               
            },
            TESTBANK:{
                ALLTESTINTESTBANK:'/getallfinishedtest',
                ALLHEADERTESTBANK:'/getallheaderintest',
                ALLSTUDENTTESTBANK:'/getallstudentanswerinformation',
                ALLANSWER:	'/getstudentAnswer'

            },
            SCORETEST:"/scoreAnswer"

        },
        STUDENT:{
            TESTLIST:"/studentgettestlist",
            GETSTUDENTINFO:"/getstudentinfo",
            ALLQUESTIONFORTEST:"/getallquestionfortest",
            UPDATEINPUTEXAM:"/inputexam",
            SUBMIT:"/submitanswer",
            SCORE:"/studentgetscore"
        },
        ADMIN:"/addteachertosystem",
        USERNAME: '/getusername',
        LOGIN:'/login',
        ALERT:API_DOMAIN_NAME+'/acceptjoincourse'
    },
    TEST:'/test'
}
