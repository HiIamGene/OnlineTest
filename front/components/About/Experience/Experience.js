import Detail from '../Detail'
import ExperienceForm from './ExperienceForm'
import React from 'react'
import { Collapse } from 'reactstrap'
import PlusButton from '../PlusButton'
import dayjs from 'dayjs'
import { withNamespaces } from "../../../lib/i18n"
import { _error_handler } from '../../../utils/errorHandler'
import { withToastManager } from 'react-toast-notifications';
import { compose } from 'recompose'
import { connect } from 'react-redux';
import { setExperiences, setCompanyMaster, editExperience, addExperience, viewExperience } from "../../../redux/actions/experienceAction";
import { destroyExperience, fetchExperience } from "../../../services/experienceService";
import { fetchProfile } from "../../../redux/actions/profileAction";
import { VIEW_EXPERIENCE } from "../../../redux/reducers/experienceReducer";
import { API_USER_ANOTHERPROFILE_V010001 } from '../../../constant/ENV'
import axios from 'axios'
export default compose(withNamespaces(['experience', 'common']), withToastManager, connect(store => {
    return {
        experiences: store.experienceReducer.experiences,
        experience: store.experienceReducer.experience,
    }
}, { setExperiences, setCompanyMaster, fetchProfile, editExperience, addExperience, viewExperience }))(class Experience extends React.Component {
    static async getInitialProps(ctx) {
        return {
            namespacesRequired: ['experience', "common"],
        }
    }

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        if (this.props.anotherProfile) {
            const response = await axios.get(API_USER_ANOTHERPROFILE_V010001+this.props.anotherProfileId)
            const { data } = response
            const { payload } = data
            await this.props.setExperiences(payload.experiences)
        }
        else {
            await this.props.setExperiences((await fetchExperience()));
        }
    }

    async __onDelete(id) {
        try {
            await destroyExperience(id);
            this.props.fetchProfile();
            await this.props.setExperiences((await fetchExperience()));

        } catch (err) {
            _error_handler(this.props.toastManager, err)
        }
    }

    render() {
        const anotherProfile = this.props.anotherProfile
        return (
            <div>{anotherProfile ?

                <div>
                    {
                        this.props.experience.mode === VIEW_EXPERIENCE ?
                            <div>
                                {
                                    this.props.experiences.map((value, key) =>
                                        <Detail
                                        anotherProfile={anotherProfile}
                                            noExpire={true}
                                            key={key}
                                            data={{
                                                title: value.companyMaster._englishName,
                                                firstSubtitle: value.rankMaster ? value.rankMaster._name : null,
                                                secondSubtitle: value.shipMaster ? value.shipMaster._englishName : null,
                                                issueDate: dayjs(value.start).format("L"),
                                                expiryDate: value.end && value.end !== "" ? dayjs(value.end).format("L") : null,
                                                img: value.companyMaster._imageUrl,
                                                work: value.work
                                            }}
                                            onDelete={() => this.__onDelete(value.id)}
                                            onEditMode={() => {
                                                this.props.editExperience({
                                                    ...value,
                                                    rank: value.rankMaster._name,
                                                    major: value.majorMaster._name,
                                                    workscore: value.workscoreMaster._name,
                                                });
                                            }} />
                                    )
                                }
                            </div>
                            :
                            <Collapse isOpen={true}>
                                <ExperienceForm t={this.props.t} />
                            </Collapse>

                    }
                    {/* <style jsx>{`
                    .addExperience { 
                        cursor : pointer;
                        position : absolute;
                        top :40px;
                        right : 18px;  
                        marginBottom : 0px ;
                        padding : 0 ;
                        margin : 0;
                    }       
                    .addIconExperience:hover { 
                        color : rgb(60,102,180);
                    }
                    @media screen and (max-width: 875px) {       
                        .addExperience{ 
                            top : 55px
                        }
                    }         
                    @media screen and (max-width: 575px) {       
                        .addExperience{ 
                            top : 42px
                        }
                    }   
                    `}</style> */}
                </div>
                :
                <div>
                    {
                        this.props.experience.mode === VIEW_EXPERIENCE ?
                            <div>
                                <PlusButton text={this.props.t("addExperienceButton")} onClick={this.props.addExperience} />
                                {
                                    this.props.experiences.map((value, key) =>
                                        <Detail
                                            noExpire={true}
                                            key={key}
                                            anotherProfile={anotherProfile}
                                            data={{
                                                title: value.companyMaster._englishName,
                                                firstSubtitle: value.rankMaster ? value.rankMaster._name : null,
                                                secondSubtitle: value.shipMaster ? value.shipMaster._englishName : null,
                                                issueDate: dayjs(value.start).format("L"),
                                                expiryDate: value.end && value.end !== "" ? dayjs(value.end).format("L") : null,
                                                img: value.companyMaster._imageUrl,
                                                work: value.work
                                            }}
                                            onDelete={() => this.__onDelete(value.id)}
                                            onEditMode={() => {
                                                this.props.editExperience({
                                                    ...value,
                                                    rank: value.rankMaster._name,
                                                    major: value.majorMaster._name,
                                                    workscore: value.workscoreMaster._name,
                                                });
                                            }} />
                                    )
                                }
                            </div>
                            :
                            <Collapse isOpen={true}>
                                <ExperienceForm t={this.props.t} />
                            </Collapse>

                    }
                    {/* <style jsx>{`
                    .addExperience { 
                        cursor : pointer;
                        position : absolute;
                        top :40px;
                        right : 18px;  
                        marginBottom : 0px ;
                        padding : 0 ;
                        margin : 0;
                    }       
                    .addIconExperience:hover { 
                        color : rgb(60,102,180);
                    }
                    @media screen and (max-width: 875px) {       
                        .addExperience{ 
                            top : 55px
                        }
                    }         
                    @media screen and (max-width: 575px) {       
                        .addExperience{ 
                            top : 42px
                        }
                    }   
                    `}</style> */}
                </div>
            }
            </div>

        )
    }
})