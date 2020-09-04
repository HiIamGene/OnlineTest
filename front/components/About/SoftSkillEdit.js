import { FormGroup } from 'reactstrap'
import React from "react"
import { withToastManager } from "react-toast-notifications"
import { _error_handler } from '../../utils/errorHandler'
import { fetchUserSoftSkill, putUserSoftSkill } from "../../services/masterService";
import {
    API_USER_ANOTHERPROFILE_V010001
} from "../../constant/ENV"
import axios from "axios"


class SoftSkillEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTxt: "",
            number: [],
            listcount: 0,
            masterSoftSkill: [],
            selected: {
                "id": "",
                title: "",
                "englishName": "",
                "localName": "",
                "creator": ""
            }
        }
        this._setscore = this._setscore.bind(this);
        this._loadData = this._loadData.bind(this);
    }

    componentDidMount() {
        this._loadData()
    }

    async _loadData() {
        if (this.props.anotherProfile) { 
            const res = await axios.get(API_USER_ANOTHERPROFILE_V010001 + this.props.anotherProfileId)
            
            this.setState({ masterSoftSkill: res.data.payload.softSkills });

        }
        else {
            await fetchUserSoftSkill()
                .then((res) => {
                    this.setState({ masterSoftSkill: res.payload });
                });
        }
    }
    async _setscore(id, inputnumber) {
        await putUserSoftSkill(id, inputnumber);
        this._loadData();
    }

    render() {
        const anotherProfile = this.props.anotherProfile
        return (
            <div className="cr-card personal-font-sm cr-bg-gray-3-background">
                <FormGroup>
                    {this.state.masterSoftSkill.map((value) => {
                        const { userSkillId, masterSkill, score } = value;
                        return (
                            <div className="softskill-chart">
                                <div className="softskill-chart-text">
                                    <p>{masterSkill.name}</p>
                                </div>
                                <div className="softskill-chart-score-container">
                                    <p className="level">Level</p>
                                    <div className="softskill-chart-score" name={score}>
                                        {anotherProfile ?
                                            <div>
                                                <div className={score >= 0 ? "score-0 action" : "score-0"} ><p>0</p></div>
                                                <div className={score >= 1 ? "score-1 action" : "score-1"} name={masterSkill.name}><p>1</p></div>
                                                <div className={score >= 2 ? "score-2 action" : "score-2"} name={masterSkill.name}><p>2</p></div>
                                                <div className={score == 3 ? "score-3 action" : "score-3"} name={masterSkill.name}><p>3</p></div>
                                            </div>
                                            :
                                            <div>
                                                <div className={score >= 0 ? "score-0 action" : "score-0"} name={masterSkill.name} onClick={() => { this._setscore(userSkillId, 0) }}><p>0</p></div>
                                                <div className={score >= 1 ? "score-1 action" : "score-1"} name={masterSkill.name} onClick={() => { this._setscore(userSkillId, 1) }}><p>1</p></div>
                                                <div className={score >= 2 ? "score-2 action" : "score-2"} name={masterSkill.name} onClick={() => { this._setscore(userSkillId, 2) }}><p>2</p></div>
                                                <div className={score == 3 ? "score-3 action" : "score-3"} name={masterSkill.name} onClick={() => { this._setscore(userSkillId, 3) }}><p>3</p></div>
                                            </div>
                                        }

                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </FormGroup>
            </div>
        )
    }
}

export default withToastManager(SoftSkillEdit)