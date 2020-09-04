import React from 'react'
import SidebarElement from './Sidebar'
import { Collapse } from 'reactstrap'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
import Education from './Education'
import Proficiency from './Proficiency'
import Personal from './Personal'
import Experience from './Experience/Experience'
import Identity from './Identity'
import License from "./Competency";
import Training from './Training'
import Skill from './Skill'
import Health from './Health'
import DP from './DPQualification'
import Setting from './Setting'
import dayjs from 'dayjs'
import { withNamespaces } from "../../lib/i18n"
import { API_USER_PROFILE_V010001, API_USER_ANOTHERPROFILE_V010001 } from '../../constant/ENV'
import axios from 'axios'
import { _error_handler } from '../../utils/errorHandler'
import { withToastManager } from 'react-toast-notifications';
import { compose } from 'recompose'
import _ from 'lodash'
import { withRouter } from 'next/router'
import { connect } from 'react-redux';
import { fetchProfile } from "../../redux/actions/profileAction";

class AboutMainComponent extends React.Component {
    static async getInitialProps(ctx) {
        return {
            namespacesRequired: ['about'],
        }
    }

    constructor(props) {
        super(props)

        this.state = {
            currentIndex: null,
            currentTitle: props.t("loading"),
            totalNumber: {
                identity: 0,
                experience: 0,
                education: 0,
                license: 0,
                training: 0,
                skill: 0,
                health: 0,
                dp: 0,
                proficiency: 0
            },
            user: {
                education: [],
                experiences: [],
                licenses: [],
                trainings: [],
                healths: [],
                softSkill: [],
            },
            identity: {},
            personalDetail: {
                name: "",
                surname: '',
                displayName: '',
                emailAccount: '',
                password: "",
                nationality: '',
                dateOfBirth: new Date(),
                currentLocation: '',
                contactNumber: ''
            },
            leftComponent: null,
            rightComponent: null

        }
        this.onChangeIndex = this.onChangeIndex.bind(this)
        this.onChange = this.onChange.bind(this)
        dayjs.extend(LocalizedFormat)

        dayjs().format('L LT')
    }

    onChange(attribute, number) {

        this.setState({
            totalNumber: {
                ...this.state.totalNumber,
                [attribute]: number
            }
        })

    }

    onChangeIndex(currentIndex, currentTitle, anotherProfile) {
        let action = "personal";
        let title = this.props.t("personalDetail");
        if(this.props.anotherProfilePage){
            switch (currentIndex) {
                case 0:
                    action = "personal";
                    title = this.props.t("personalDetail");
                    break;
                case 3:
                    action = "education";
                    title = this.props.t("education");
                    break;
                case 4:
                    action = "competency";
                    title = this.props.t("competency");
                    break;
                case 10:
                    action = "proficiency";
                    title = this.props.t("proficiency");
                    break;
                case 5:
                    action = "training";
                    title = this.props.t("training");
                    break;
                case 8:
                    action = "dp-qualification";
                    title = this.props.t("dp");
                    break;
                case 7:
                    action = "health";
                    title = this.props.t("health");
                    break;
                case 2:
                    action = "experience";
                    title = this.props.t("experience");
                    break;
                case 6:
                    action = "skill";
                    title = this.props.t("skill");
                    break;
            }
        }else{
            switch (currentIndex) {
                case 0:
                    action = "personal";
                    title = this.props.t("personalDetail");
                    break;
                case 1:
                    action = "identity";
                    title = this.props.t("identityDocument");
                    break;
                case 3:
                    action = "education";
                    title = this.props.t("education");
                    break;
                case 4:
                    action = "competency";
                    title = this.props.t("competency");
                    break;
                case 10:
                    action = "proficiency";
                    title = this.props.t("proficiency");
                    break;
                case 5:
                    action = "training";
                    title = this.props.t("training");
                    break;
                case 8:
                    action = "dp-qualification";
                    title = this.props.t("dp");
                    break;
                case 7:
                    action = "health";
                    title = this.props.t("health");
                    break;
                case 2:
                    action = "experience";
                    title = this.props.t("experience");
                    break;
                case 6:
                    action = "skill";
                    title = this.props.t("skill");
                    break;
            }
        }
       
        if (this.props.anotherProfilePage) {
            window.history.pushState(action, title, '/about?action=' + action + "&search=" + this.props.router.query.search);

        }
        else {
            window.history.pushState(action, title, '/about?action=' + action);
        }

        this.setState({ currentIndex, currentTitle: title })
    }

    async componentDidMount() {
        try {
            let currentIndex = 0;
            if (this.props.anotherProfilePage) {
                switch (this.props.router.query.action) {
                    case "license":
                        currentIndex = 4;
                        break;
                    case "personal":
                        currentIndex = 0;
                        break;
                    case "education":
                        currentIndex = 3;
                        break;
                    case "competency":
                        currentIndex = 4;
                        break;
                    case "proficiency":
                        currentIndex = 10;
                        break;
                    case "training":
                        currentIndex = 5;
                        break;
                    case "dp-qualification":
                        currentIndex = 8;
                        break;
                    case "health":
                        currentIndex = 7;
                        break;
                    case "experience":
                        currentIndex = 2;
                        break;
                    case "skill":
                        currentIndex = 6;
                        break;
                }
            }
            else {
                switch (this.props.router.query.action) {
                    case "license":
                        currentIndex = 4;
                        break;
                    case "personal":
                        currentIndex = 0;
                        break;
                    case "identity":
                        currentIndex = 1;
                        break;
                    case "education":
                        currentIndex = 3;
                        break;
                    case "competency":
                        currentIndex = 4;
                        break;
                    case "proficiency":
                        currentIndex = 10;
                        break;
                    case "training":
                        currentIndex = 5;
                        break;
                    case "dp-qualification":
                        currentIndex = 8;
                        break;
                    case "health":
                        currentIndex = 7;
                        break;
                    case "experience":
                        currentIndex = 2;
                        break;
                    case "skill":
                        currentIndex = 6;
                        break;
                }
            }
            this.onChangeIndex(currentIndex, "");

            this.props.fetchProfile();
            //const response = ""
            if (this.props.anotherProfilePage) {

                let response = await axios.get(API_USER_ANOTHERPROFILE_V010001 + this.props.router.query.search)
                this.setState({
                    totalNumber: {
                        ...this.state.totalNumber,
                        education: Object.keys(response.data.payload.educations).length,
                        proficiency: Object.keys(response.data.payload.proficiency).length,
                        experience: Object.keys(response.data.payload.experiences).length,
                        health: Object.keys(response.data.payload.healths).length,
                        license: Object.keys(response.data.payload.competency).length,
                        training: Object.keys(response.data.payload.trainings).length,
                        skill: 0,
                        identity: 0,
                        dp: Object.keys(response.data.payload.dps).length
                    },
                    user: {
                        education: [],
                        experiences: [],
                        licenses: [],
                        trainings: [],
                        healths: [],
                        softSkill: [],
                    },
                    personalDetail: response.data.payload,
                })
            }
            else {
                let response = await axios.get(API_USER_PROFILE_V010001)
                console.log(response)
                this.setState({
                    totalNumber: {
                        ...this.state.totalNumber,
                        education: response.data.payload.dataCount.educationCount,
                        proficiency: response.data.payload.dataCount.proficiencyCount,
                        experience: response.data.payload.dataCount.experienceCount,
                        health: response.data.payload.dataCount.healthsCount,
                        license: response.data.payload.dataCount.competencyCount,
                        training: response.data.payload.dataCount.trainingCount,
                        skill: response.data.payload.dataCount.skillCount,
                        identity: response.data.payload.identity.identityCount,
                        dp: response.data.payload.dataCount.dpCount
                    },
                    user: response.data.payload.user,
                    identity: response.data.payload.identity,
                    personalDetail: response.data.payload.personalDetail,
                })
            }

            /*const { data } = response
            const { payload } = data
            const { dataCount } = payload
            const { identity } = payload
            const { personalDetail } = payload
            const { user } = payload
 
            this.setState({
                totalNumber: {
                    ...this.state.totalNumber,
                    education: dataCount.educationCount,
                    proficiency: dataCount.proficiencyCount,
                    experience: dataCount.experienceCount,
                    health: dataCount.healthsCount,
                    license: dataCount.competencyCount,
                    training: dataCount.trainingCount,
                    skill: dataCount.skillCount,
                    identity: identity.identityCount,
                    dp: dataCount.dpCount
                },
                user: user,
                identity: identity,
                personalDetail: personalDetail,
            })*/


        } catch (err) {
            console.log(err)
            _error_handler(this.props.toastManager, err)
        }
    }

    render() {
        const anotherProfile = this.props.anotherProfilePage;
        const { totalNumber, currentIndex, currentTitle, user, identity, personalDetail } = this.state
        const { t } = this.props
        let { profile } = this.props;
        const anotherProfileId = this.props.router.query.search
        console.log(this.props.profile.anotherProfile)
        return (
            <div className="aboutmain-container">
                <div className="aboutmain-container-header">
                    <h3 className="aboutmain-header">{"About"}</h3>

                </div>
                <div className="aboutmain-detail">
                    <div className="aboutmain-left-side">
                        <SidebarElement onClick={() => this.onChangeIndex(0, t("personalDetail"), anotherProfile)
                        }
                            title={t("personalDetail")} icon={<img className={"cr-about sidebar-icon"}
                                src={"/static/images/icon/AW_CrewHitz_ICON-73.png"}
                                alt="" />}
                            active={currentIndex == 0 ? true : false} currentData={""} />
                        {currentIndex !== 0 ? null :
                            <div className="aboutmain-container-small-screen">
                                {/* {currentIndex == 0 ? <h4 className="headerRightSideAboutMainComponent">{currentTitle}</h4> : ""} */}
                                <Collapse isOpen={currentIndex == 0}>
                                    <Personal data={personalDetail} />
                                </Collapse>
                            </div>
                        }
                        {this.props.anotherProfilePage ?
                            ""
                            : <div>

                                <SidebarElement onClick={() => this.onChangeIndex(1, t("identityDocument"))}
                                    title={t("identityDocument")} icon={<img className={"cr-about sidebar-icon"}
                                        src={"/static/images/icon/AW_CrewHitz_ICON-74.png"}
                                        alt="" />}
                                    active={currentIndex == 1 ? true : false}
                                    currentData={totalNumber.identity + "/4"} />
                                {currentIndex !== 1 ? null :
                                    <div className="aboutmain-container-small-screen">
                                        {/* {currentIndex == 1  ? <h4 className="headerRightSideAboutMainComponent">{currentTitle}</h4> : ""} */}
                                        <Collapse isOpen={currentIndex == 1}>
                                            <Identity data={identity} totalNumber={totalNumber.identity}
                                                onChange={(attribute, number) => this.onChange(attribute, number)}
                                                anotherProfile={anotherProfile}
                                                anotherProfileId={anotherProfileId} />
                                        </Collapse>
                                    </div>
                                }
                            </div>
                        }


                        <SidebarElement onClick={() => this.onChangeIndex(3, t("education"))} title={t("education")}
                            icon={<img className={"cr-about sidebar-icon"}
                                src={"/static/images/icon/AW_CrewHitz_ICON-75.png"} alt="" />}
                            active={currentIndex == 3 ? true : false}
                            currentData={`${totalNumber.education} `} />
                        {currentIndex !== 3 ? null :
                            <div className="aboutmain-container-small-screen">
                                {/* {currentIndex == 3  ? <h4 className="headerRightSideAboutMainComponent">{currentTitle}</h4> : ""} */}
                                <Collapse isOpen={currentIndex == 3}>
                                    <Education data={!_.isEmpty(user) ? user.education : []}
                                        totalNumber={totalNumber.education}
                                        onChange={(attribute, number) => this.onChange(attribute, number)}
                                        anotherProfile={anotherProfile}
                                        anotherProfileId={anotherProfileId} />
                                </Collapse>
                            </div>
                        }
                        <SidebarElement onClick={() => this.onChangeIndex(4, t("competency"))} title={t("competency")}
                            icon={<img className={"cr-about sidebar-icon"}
                                src={"/static/images/icon/AW_CrewHitz_ICON-76.png"} alt="" />}
                            active={currentIndex == 4 ? true : false}
                            currentData={`${totalNumber.license} `} />
                        {currentIndex !== 4 ? null :
                            <div className="aboutmain-container-small-screen">
                                {/* {currentIndex == 4  ? <h4 className="headerRightSideAboutMainComponent">{currentTitle}</h4> : ""} */}
                                <Collapse isOpen={currentIndex == 4}>
                                    <License data={!_.isEmpty(user) ? user.competency : []}
                                        totalNumber={totalNumber.license}
                                        onChange={(attribute, number) => this.onChange(attribute, number)}
                                        anotherProfile={anotherProfile}
                                        anotherProfileId={anotherProfileId} />
                                </Collapse>
                            </div>
                        }
                        <SidebarElement onClick={() => this.onChangeIndex(10, t("proficiency"))}
                            title={t("proficiency")} icon={<img className={"cr-about sidebar-icon"}
                                src={"/static/images/icon/AW_CrewHitz_ICON-77.png"}
                                alt="" />}
                            active={currentIndex == 10 ? true : false}
                            currentData={`${totalNumber.proficiency} `} />
                        {currentIndex !== 10 ? null :
                            <div className="aboutmain-container-small-screen">
                                {/* {currentIndex == 4  ? <h4 className="headerRightSideAboutMainComponent">{currentTitle}</h4> : ""} */}
                                <Collapse isOpen={currentIndex == 10}>
                                    <Proficiency data={!_.isEmpty(user) ? user.proficiency : []}
                                        totalNumber={totalNumber.proficiency}
                                        onChange={(attribute, number) => this.onChange(attribute, number)}
                                        anotherProfile={anotherProfile}
                                        anotherProfileId={anotherProfileId} />
                                </Collapse>
                            </div>
                        }
                        <SidebarElement onClick={() => this.onChangeIndex(5, t("training"))} title={t("training")}
                            icon={<img className={"cr-about sidebar-icon"}
                                src={"/static/images/icon/AW_CrewHitz_ICON-78.png"} alt="" />}
                            active={currentIndex == 5 ? true : false}
                            currentData={`${totalNumber.training} `} />
                        {currentIndex !== 5 ? null :
                            <div className="aboutmain-container-small-screen">
                                {/* {currentIndex == 5  ? <h4 className="headerRightSideAboutMainComponent">{currentTitle}</h4> : ""} */}
                                <Collapse isOpen={currentIndex == 5}>
                                    <Training data={!_.isEmpty(user) ? user.trainings : []}
                                        totalNumber={totalNumber.training}
                                        onChange={(attribute, number) => this.onChange(attribute, number)}
                                        anotherProfile={anotherProfile}
                                        anotherProfileId={anotherProfileId} />
                                </Collapse>
                            </div>
                        }
                        <SidebarElement onClick={() => this.onChangeIndex(8, t("dp"))} title={t("dp")}
                            icon={<img className={"cr-about sidebar-icon"}
                                src={"/static/images/icon/AW_CrewHitz_ICON-79.png"} alt="" />}
                            active={currentIndex == 8 ? true : false} currentData={`${this.state.totalNumber.dp} `} />
                        {currentIndex !== 8 ? null :
                            <div className="aboutmain-container-small-screen">
                                {/* {currentIndex == 8  ? <h4 className="headerRightSideAboutMainComponent">{currentTitle}</h4> : ""} */}
                                <Collapse isOpen={currentIndex == 8}>
                                    <DP totalNumber={totalNumber.dp}
                                        onChange={(attribute, number) => this.onChange(attribute, number)}
                                        anotherProfile={anotherProfile}
                                        anotherProfileId={anotherProfileId} />
                                </Collapse>
                            </div>
                        }
                        <SidebarElement onClick={() => this.onChangeIndex(7, t("health"))} title={t("health")}
                            icon={<img className={"cr-about sidebar-icon"}
                                src={"/static/images/icon/AW_CrewHitz_ICON-80.png"} alt="" />}
                            active={currentIndex == 7 ? true : false}
                            currentData={`${totalNumber.health} `} />
                        {currentIndex !== 7 ? null :
                            <div className="aboutmain-container-small-screen">
                                {/* {currentIndex == 7  ? <h4 className="headerRightSideAboutMainComponent">{currentTitle}</h4> : ""} */}
                                <Collapse isOpen={currentIndex == 7}>
                                    <Health data={!_.isEmpty(user) ? user.healths : []} totalNumber={totalNumber.health}
                                        onChange={(attribute, number) => this.onChange(attribute, number)}
                                        anotherProfile={anotherProfile}
                                        anotherProfileId={anotherProfileId} />/>
                                </Collapse>
                            </div>
                        }

                        <SidebarElement onClick={() => this.onChangeIndex(2, t("experience"))} title={t("experience")}
                            icon={<img className={"cr-about sidebar-icon"}
                                src={"/static/images/icon/AW_CrewHitz_ICON-81.png"} alt="" />}
                            active={currentIndex == 2 ? true : false}
                            currentData={`${totalNumber.experience} `} />
                        {currentIndex !== 2 ? null :
                            <div className="aboutmain-container-small-screen">
                                {/* {currentIndex == 2  ? <h4 className="headerRightSideAboutMainComponent">{currentTitle}</h4> : ""} */}
                                <Collapse isOpen={currentIndex == 2}>
                                    <Experience data={!_.isEmpty(user) ? user.experiences : []}
                                        totalNumber={totalNumber.experience}
                                        onChange={(attribute, number) => this.onChange(attribute, number)}
                                        anotherProfile={anotherProfile}
                                        anotherProfileId={anotherProfileId} />
                                </Collapse>
                            </div>
                        }

                        <SidebarElement onClick={() => this.onChangeIndex(6, t("skill"))} title={t("skill")}
                            icon={<img className={"cr-about sidebar-icon"}
                                src={"/static/images/icon/AW_CrewHitz_ICON-82.png"} alt="" />}
                            active={currentIndex == 6 ? true : false}
                            //currentData={`${totalNumber.skill} `}
                            anotherProfile={anotherProfile}
                            anotherProfileId={anotherProfileId} />
                        {currentIndex !== 6 ? null :
                            <div className="aboutmain-container-small-screen">
                                {/* {currentIndex == 6  ? <h4 className="headerRightSideAboutMainComponent">{currentTitle}</h4> : ""} */}
                                <Collapse isOpen={currentIndex == 6}>
                                    <Skill data={!_.isEmpty(user) ? user.softSkill : []} //totalNumber={totalNumber.skill}
                                        onChange={(attribute, number) => this.onChange(attribute, number)}
                                        anotherProfile={anotherProfile} 
                                        anotherProfileId={anotherProfileId}/>
                                </Collapse>
                            </div>
                        }

                    </div>
                    <div className="aboutmain-right-side">
                        <div className="aboutmain-container-big-screen">
                            {currentIndex != 1 && currentIndex != 8 && currentIndex != 6 ?
                                <h4 className="aboutmain-header-right-side cloud">{currentTitle}</h4> : ""}
                            {currentIndex !== 0 ? null :
                                <Collapse isOpen={currentIndex == 0}>
                                    <Personal data={personalDetail}
                                        anotherProfile={anotherProfile}
                                        anotherProfileId={anotherProfileId}

                                    />
                                </Collapse>
                            }
                            {currentIndex !== 1 && anotherProfile==false ? null :
                                <Collapse isOpen={currentIndex == 1}>
                                    <Identity data={identity} totalNumber={totalNumber.identity}
                                        onChange={(attribute, number) => this.onChange(attribute, number)}
                                        anotherProfile={anotherProfile}
                                        anotherProfileId={anotherProfileId} />
                                </Collapse>
                            }
                            {currentIndex !== 2 ? null :
                                <Collapse isOpen={currentIndex == 2}>
                                    <Experience data={!_.isEmpty(user) ? user.experiences : []}
                                        totalNumber={totalNumber.experience}
                                        onChange={(attribute, number) => this.onChange(attribute, number)}
                                        anotherProfile={anotherProfile}
                                        anotherProfileId={anotherProfileId} />
                                </Collapse>
                            }
                            {currentIndex !== 3 ? null :
                                <Collapse isOpen={currentIndex == 3}>
                                    <Education data={!_.isEmpty(user) ? user.education : []}
                                        totalNumber={totalNumber.education}
                                        onChange={(attribute, number) => this.onChange(attribute, number)}
                                        anotherProfile={anotherProfile}
                                        anotherProfileId={anotherProfileId} />
                                </Collapse>
                            }
                            {currentIndex !== 4 ? null :
                                <Collapse isOpen={currentIndex == 4}>
                                    <License data={!_.isEmpty(user) ? user.competency : []}
                                        totalNumber={totalNumber.education}
                                        onChange={(attribute, number) => this.onChange(attribute, number)}
                                        anotherProfile={anotherProfile}
                                        anotherProfileId={anotherProfileId} />
                                </Collapse>
                            }
                            {currentIndex !== 10 ? null :
                                <Collapse isOpen={currentIndex == 10}>
                                    <Proficiency data={!_.isEmpty(user) ? user.proficiency : []}
                                        totalNumber={totalNumber.proficiency}
                                        onChange={(attribute, number) => this.onChange(attribute, number)}
                                        anotherProfile={anotherProfile}
                                        anotherProfileId={anotherProfileId} />
                                </Collapse>
                            }
                            {currentIndex !== 5 ? null :
                                <Collapse isOpen={currentIndex == 5}>
                                    <Training data={!_.isEmpty(user) ? user.trainings : []}
                                        totalNumber={totalNumber.training}
                                        onChange={(attribute, number) => this.onChange(attribute, number)}
                                        anotherProfile={anotherProfile}
                                        anotherProfileId={anotherProfileId} />
                                </Collapse>
                            }
                            {currentIndex !== 6 ? null :
                                <Collapse isOpen={currentIndex == 6}>
                                    <Skill data={!_.isEmpty(user) ? user.trainings : []} //totalNumber={totalNumber.skill}
                                        onChange={(attribute, number) => this.onChange(attribute, number)}
                                        anotherProfile={anotherProfile}
                                        anotherProfileId={anotherProfileId} />
                                </Collapse>
                            }
                            {currentIndex !== 7 ? null :
                                <Collapse isOpen={currentIndex == 7}>
                                    <Health data={!_.isEmpty(user) ? user.healths : []} totalNumber={totalNumber.health}
                                        onChange={(attribute, number) => this.onChange(attribute, number)}
                                        anotherProfile={anotherProfile}
                                        anotherProfileId={anotherProfileId} />
                                </Collapse>
                            }
                            {currentIndex !== 8 ? null :
                                <Collapse isOpen={currentIndex == 8}>
                                    <DP totalNumber={totalNumber.dp}
                                        onChange={(attribute, number) => this.onChange(attribute, number)}
                                        anotherProfile={anotherProfile}
                                        anotherProfileId={anotherProfileId} />
                                </Collapse>
                            }
                            {currentIndex !== 9 ? null :
                                <Collapse isOpen={currentIndex == 9}>
                                    <Setting />
                                </Collapse>
                            }
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default compose(withNamespaces("about"), withRouter, withToastManager, connect(store => {
    return {
        profile: store.profileReducer,
        anotherProfile: store.aboutProfileReducer
    }
}, { fetchProfile }))(AboutMainComponent);