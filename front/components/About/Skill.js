import React from 'react'
import SkillDetail from "./SkillDetail"
import EnglishEdit from './EnglishEdit'
import MarlinEdit from './MarlinEdit'
import SoftSkillEdit from "./SoftSkillEdit";
import HardSkillEdit from "./HardSkillEdit";
import LanguageEdit from './LanguageEdit'
import SkillHeader from './SkillHeader'
import ComputerEdit from './ComputerEdit'
import { Collapse } from 'reactstrap'
import PlusCircleButton from "./PlusCircleButton";
import axios from "axios"
import {
    API_USER_PROFILE_SKILL_ENGLISH_TEST,
    API_USER_PROFILE_SKILL_SOFT_SKILL,
    API_MASTER_SOFT_SKILL,
    API_MASTER_LANGUAGE,
    API_USER_PROFILE_SKILL_LANGUAGE,
    API_USER_PROFILE_SKILL_COMPUTER_SKILL, API_MASTER_COMPUTER_SKILL,
    API_USER_PROFILE_SKILL_LANGUAGE_V010001,
    API_USER_ANOTHERPROFILE_V010001
} from "../../constant/ENV"
import compose from "recompose/compose"
import { withToastManager } from 'react-toast-notifications';
import SkillScore from "./SkillScore"
import { API_USER_PROFILE_SKILL_MARLIN_TEST } from './../../constant/ENV';
import { parseInt } from "lodash";
import { _error_handler } from "../../utils/errorHandler";
import * as _ from "lodash";
import { func } from 'prop-types';
class Skill extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            editMode: -1,
            editing: "",
            softSkillId: "",
            softSkillData: [],
            allSoftSkill: [],

            langSkillSelectMasterId: "",
            allLangSkill: [],
            userLangSkill: [],
            userComputerSkill: [],
            allComputerSkill: [],
            computerSelectId: "",
            marlinData: null,
            langMode: "add",
            languageData:
            {
                languageIdMaster: "",
                language: "",
                speak: 0,
                write: 1,
                listening: 1,
                reading: 1
            }
            ,
            englishData: {
                tofel: 0,
                speak: 0,
                write: 0,
                listening: 0,
                reading: 0,
                ielts: 0,
                toeic: 0
            }
        }
    }
    hideEditing = () => {
        this.setState({ editing: "" })
    }

    fetch_english_test = () => {
        if (this.props.anotherProfile) {
            axios.get(API_USER_ANOTHERPROFILE_V010001+this.props.anotherProfileId)
            .then(res => {
                let resEngData = res.data.payload.engTest
                let englishData = null;
                if (resEngData) {
                    englishData = {
                        tofel: resEngData['ieltsLevel'],
                        speak: resEngData['toeflSpeak'],
                        write: resEngData['toeflWrite'],
                        listening: resEngData['toeflListening'],
                        reading: resEngData['toeflReading'],
                        ielts: resEngData['ieltsLevel'],
                        toeic: resEngData['toeicScore']
                    }
                }
                console.log(englishData)
                this.setState({
                    englishData :englishData
                })
            }).catch(err => {
                _error_handler(this.props.toastManager, err)
            })
        }
        else {
            axios.get(API_USER_PROFILE_SKILL_ENGLISH_TEST)
                .then(res => {
                    let resEngData = res.data.payload.EnglishProficiencyTest
                    let englishData = null;
                    if (resEngData) {
                        englishData = {
                            tofel: resEngData['ieltsLevel'],
                            speak: resEngData['toeflSpeak'],
                            write: resEngData['toeflWrite'],
                            listening: resEngData['toeflListening'],
                            reading: resEngData['toeflReading'],
                            ielts: resEngData['ieltsLevel'],
                            toeic: resEngData['toeicScore']
                        }
                    }
                    this.setState({
                        englishData :englishData
                    })
                }).catch(err => {
                    _error_handler(this.props.toastManager, err)
                })
        }
    }
    fetch_soft_skill = async () => {
        try {
            if (this.props.anotherProfile) {
                const res = await axios.get(API_USER_ANOTHERPROFILE_V010001 + this.props.anotherProfileId)
                const softSkill = res.data.payload.softSkills
                if (softSkill) {
                    this.setState({
                        softSkillData: softSkill,
                    })
                }

            }
            else {
                const { data } = await axios.get(API_USER_PROFILE_SKILL_SOFT_SKILL)
                const softSkill = data.payload
                if (softSkill) {
                    this.setState({
                        softSkillData: softSkill,
                    })
                }
            }

        } catch (err) { _error_handler(this.props.toastManager, err) }
    }

    fetch_all_soft_skill = async (txt = "") => {
        try {
            let softSkills = await axios.get(API_MASTER_SOFT_SKILL + (txt !== "" ? `?softskillName=${txt}` : ''));
            softSkills = softSkills.data.payload.softSkill.filter(all => {
                let isHave = this.state.softSkillData.find(have => have.softSkillIdMaster == all.id)
                return (!isHave)
            })

            softSkills = softSkills.map(item => (
                { ...item, title: item.englishName }
            ))
            this.setState({
                allSoftSkill: softSkills
            })
        } catch (err) { _error_handler(this.props.toastManager, err) }
    }

    fetch_user_lang_skill = async () => {
        try {
            if (this.props.anotherProfile) {
                const res = await axios.get(API_USER_ANOTHERPROFILE_V010001 + this.props.anotherProfileId)
                const { data }=res
                const Langauge = data.payload.languages
                if (Langauge) {
                    this.setState({
                        userLangSkill: Langauge,
                    })
                }

             }
            else {
                const { data } = await axios.get(API_USER_PROFILE_SKILL_LANGUAGE_V010001)
                const Langauge = data.payload
                if (Langauge) {
                    this.setState({
                        userLangSkill: Langauge,
                    })
                }
            }
        } catch (err) { _error_handler(this.props.toastManager, err) }

    }

    fetch_all_lang_skill = async (txt = "") => {
        try {
            let langSkill = await axios.get(API_MASTER_LANGUAGE + (txt !== "" ? `?queryLanguage=${txt}` : ''));
            langSkill = langSkill.data.payload.language.filter(all => {
                let isHave = this.state.userLangSkill.find(have => have.idMaster == all.id)
                return (!isHave)
            })

            langSkill = langSkill.map(item => (
                {
                    ...item,
                    title: item.language,
                    englishName: item.language,
                }
            ))
            this.setState({
                allLangSkill: langSkill
            })
        } catch (err) { _error_handler(this.props.toastManager, err) }
    }

    fetch_marlin_test = () => {
        if (this.props.anotherProfile) {
            axios.get(API_USER_ANOTHERPROFILE_V010001 + this.props.anotherProfileId)
            .then(res => {
                let marlinData = res.data.payload.marlin
                this.setState({
                    marlinData: marlinData ? marlinData.score : null
                })
            }).catch(err => {
                _error_handler(this.props.toastManager, err)
            })

         }
        else {
            axios.get(API_USER_PROFILE_SKILL_MARLIN_TEST)
                .then(res => {
                    let marlinData = res.data.payload.marlinTest
                    this.setState({
                        marlinData: marlinData ? marlinData.score : null
                    })
                }).catch(err => {
                    _error_handler(this.props.toastManager, err)
                })
        }
    }

    fetch_user_computer_skill = async () => {
        if (this.props.anotherProfile) { 
            try {
                const res= await axios.get(API_USER_ANOTHERPROFILE_V010001 + this.props.anotherProfileId)
                const { data }=res
                const computer = data.payload.computerSkill
                if (computer) {
                    this.setState({
                        userComputerSkill: computer,
                    })
                }
            } catch (err) { _error_handler(this.props.toastManager, err) }
            }
        else {
            try {
                const { data } = await axios.get(API_USER_PROFILE_SKILL_COMPUTER_SKILL)
                const computer = data.payload
                if (computer) {
                    this.setState({
                        userComputerSkill: computer,
                    })
                }
            } catch (err) { _error_handler(this.props.toastManager, err) }
        }
    }

    fetch_all_computer_skill = async (txt = "") => {
        try {
                let allData = await axios.get(API_MASTER_COMPUTER_SKILL + (txt !== "" ? `?nameComputerSkill=${txt}` : ''));
                allData = !_.isUndefined(allData) && !_.isUndefined(allData.data.payload["computerSkill"]) ? allData.data.payload["computerSkill"].filter(all => {
                    let isHave = this.state.userComputerSkill.find(have => have.idMaster == all.id)
                    return (!isHave)
                }) : []

                allData = allData.map(item => (
                    {
                        ...item,
                        title: item.computerSkillName,
                        englishName: item.computerSkillName,
                    }
                ))
                this.setState({
                    allComputerSkill: allData
                })
            
        } catch (err) { _error_handler(this.props.toastManager, err) }
    }


    fetch_all_data = async () => {

        try {
            this.fetch_english_test()
            await this.fetch_soft_skill()
            this.fetch_all_soft_skill()
            await this.fetch_user_lang_skill()
            this.fetch_all_lang_skill()
            await this.fetch_marlin_test()
            await this.fetch_user_computer_skill()
            this.fetch_all_computer_skill()

        } catch (e) {
            _error_handler(this.props.toastManager, e)
        }



    }

    async componentDidMount() {
        await this.fetch_all_data()

    }

    onChangeComputerSKill = async (value) => {
        await this.setState({
            computerSelectId: value
        })
    }
    onChangeSoftSKill(value) {
        this.setState({
            softSkillId: value
        })
    }

    filterOnlyNumber = (e) => {
        let input = e.target.value

        if (new RegExp('^[0-9]+$').test(input)) {
            if (parseInt(input) < parseInt(e.target.min)) input = e.target.min
            if (parseInt(input) > parseInt(e.target.max)) input = e.target.max
        } else {
            input = input.replace(/\D/g, "");
        }

        return input
    }
    onChangeMarlin(e) {
        let input = this.filterOnlyNumber(e)
        this.setState({
            marlinData: input
        })
    }
    onChangeLanguage(value) {
        this.setState({
            languageData: {
                ...this.state.languageData,
                languageIdMaster: value
            }
        })
    }
    onChangeEnglish(e) {
        let input = this.filterOnlyNumber(e)
        this.setState({
            englishData: {
                ...this.state.englishData,
                [e.target.name]: input
            }
        })
    }


    toggleEditMode = (index) => {
        this.setState((state) => ({
            editing: "",
            editMode: state.editMode === index ? -1 : index
        }))
    }

    addEngSkill = (index) => {
        let englishData = {
            tofel: 0,
            speak: 0,
            write: 0,
            listening: 0,
            reading: 0,
            ielts: 0,
            toeic: 0
        }
        this.setState({
            editing: "eng-test",
            editMode: index,
            englishData
        })

    }

    showAddLang = () => {
        this.setState({
            langMode: "add",
            editMode: 1,
            editing: "lang_skill",
            languageData: {
                languageIdMaster: "",
                language: "",
                speak: 0,
                write: 0,
                listening: 0,
                reading: 0
            },
        })
    }

    onLangSkillEdit = (id) => {
        const selected = this.state.userLangSkill.find(item => item.id == id)
        this.setState({
            langMode: "edit",
            editMode: 1,
            editing: "lang_skill",
            languageData: {
                ...selected,
                title: selected.language,
                englishName: selected.language,
            },
        })
    }

    onLangSkillSave = async () => {
        let data = {
            "device": " ",
            "listening": this.state.languageData.listening,
            "reading": this.state.languageData.reading,
            "speak": this.state.languageData.speak,
            "write": this.state.languageData.write,
            "languageIdMaster": this.state.languageData.languageIdMaster
        }
        if (this.state.langMode === "add") {
            axios.post(API_USER_PROFILE_SKILL_LANGUAGE_V010001, data)
                .then(async res => {
                    await this.fetch_user_lang_skill()
                    await this.fetch_all_lang_skill()
                    this.hideEditing()
                    this.props.toastManager.add(res.data.message, { appearance: 'success', autoDismiss: true });

                })
                .catch(err => {
                    if (err.response.status == 404) {
                        _error_handler(this.props.toastManager, err)
                    }
                })

        } else if (this.state.langMode === "edit") {
            data = { ...data, "languageId": this.state.languageData.languageIdMaster }
            axios.put(API_USER_PROFILE_SKILL_LANGUAGE_V010001, data)
                .then(async res => {
                    await this.fetch_user_lang_skill()
                    await this.fetch_all_lang_skill()
                    this.hideEditing()
                    this.props.toastManager.add(res.data.message, { appearance: 'success', autoDismiss: true });
                })
                .catch(err => {
                    _error_handler(this.props.toastManager, err)
                })
        }
    }

    onSaveSoftSkill = (id) => {
        const data = {
            "device": " ",
            "softSkillMasterId": id
        }
        axios.post(API_USER_PROFILE_SKILL_SOFT_SKILL, data)
            .then(async res => {
                await this.fetch_soft_skill()
                await this.fetch_all_soft_skill()
                this.hideEditing()
                this.props.toastManager.add(res.data.message, { appearance: 'success', autoDismiss: true });

            }).catch(err => {
                _error_handler(this.props.toastManager, err)
            })
    }

    onEnglishSubmit = (e) => {
        const data = {
            "device": " ",
            "ieltsLevel": this.state.englishData.ielts,
            "listening": this.state.englishData.listening,
            "reading": this.state.englishData.reading,
            "speak": this.state.englishData.speak,
            "write": this.state.englishData.write,
            "toeicScore": this.state.englishData.toeic
        }

        axios.post(API_USER_PROFILE_SKILL_ENGLISH_TEST, data)
            .then(res => {
                this.props.toastManager.add(res.data.message, { appearance: 'success', autoDismiss: true });
                this.hideEditing()
            }).catch(err => {
                _error_handler(this.props.toastManager, err)
            })

    }

    onSaveComputerSkill = () => {
        const computerSkillMasterId = this.state.computerSelectId.value
        axios.post(API_USER_PROFILE_SKILL_COMPUTER_SKILL, { computerSkillMasterId })
            .then(async res => {
                await this.fetch_user_computer_skill()
                await this.fetch_all_computer_skill()
                this.hideEditing()
                this.props.toastManager.add(res.data.message, { appearance: 'success', autoDismiss: true });

            }).catch(err => {
                _error_handler(this.props.toastManager, err)
            })

    }


    addMarlinTest = (index) => {
        let marlinData = 0
        this.setState({
            editing: "marlin_test",
            editMode: index,
            marlinData
        })
    }

    onSaveMarlinTest = (e) => {
        const data = {
            "score": this.state.marlinData,
            "device": " "
        }

        axios.post(API_USER_PROFILE_SKILL_MARLIN_TEST, data)
            .then(res => {
                this.props.toastManager.add(res.data.message, { appearance: 'success', autoDismiss: true });
                this.hideEditing()
            }).catch(err => {
                _error_handler(this.props.toastManager, err)
            })

    }
    _langAdd = async (data) => {
        await this.setState({
            languageData:
            {
                languageIdMaster: data.languageIdMaster,
                language: data.language[0],
                speak: data.speak,
                write: data.write,
                listening: data.listening,
                reading: data.reading
            }
        });
        await this.onLangSkillSave();
    }



    render() {
        const { editMode, languageData, englishData, marlinData, computerData } = this.state
        const anotherProfile = this.props.anotherProfile;
        //const anotherProfile = false

        return (
            <div>
                {/* ================================== SOFT SKILL ============================================== */}
                <SkillHeader title="SOFT SKILL" onClick={() => { this.toggleEditMode(0) }} />

                {/* {
                       _.isArray( this.state.softSkillData)&& this.state.softSkillData.map((item,i)=>(
                            <SkillScore key={i} name={item.localName} itemId={item.id} fetchALL={this.fetch_all_data} delete_url={API_USER_PROFILE_SKILL_SOFT_SKILL} className="mb-3"/>
                        ))
                    } */}
                {<SoftSkillEdit
                anotherProfileId={this.props.anotherProfileId}
                    anotherProfile={anotherProfile} />}
                {/* ============================================================================================= */}

                {/* ================================== HARD SKILL ============================================== */}
                <SkillHeader title="HARD SKILL" onClick={() => { this.toggleEditMode(0) }} />

                {/* {
                   _.isArray( this.state.softSkillData)&& this.state.softSkillData.map((item,i)=>(
                        <SkillScore key={i} name={item.localName} itemId={item.id} fetchALL={this.fetch_all_data} delete_url={API_USER_PROFILE_SKILL_SOFT_SKILL} className="mb-3"/>
                    ))
                } */}
                {<HardSkillEdit
                    anotherProfileId={this.props.anotherProfileId}
                    anotherProfile={anotherProfile} />}
                {/* ============================================================================================= */}

                {/* ================================== LANGUAGE ============================================== */}
                <SkillHeader title="LANGUAGE" onClick={() => { this.toggleEditMode(1) }} />
                {/* <Collapse isOpen={true}> */}
                {/* {
                        _.isArray(this.state.userLangSkill) && this.state.userLangSkill.map((item,i)=>(
                            <SkillScore key={i} name={item.language} itemId={item.id} fetchALL={this.fetch_all_data} delete_url={API_USER_PROFILE_SKILL_LANGUAGE} onEdit={this.onLangSkillEdit} className="mb-3"/>
                        ))
                    } */}
                {/* <Collapse isOpen={this.state.editing === "lang_skill"}> */}
                <LanguageEdit userLang={this.state.userLangSkill} fetchAllLangSkill={this.fetch_all_lang_skill} fetchALL={this.fetch_all_data} inputEnable={this.state.langMode !== "add"} allLangSkill={this.state.allLangSkill} onSave={this.onLangSkillSave} onChange={(e) => this.onChangeLanguage(e)} onClick={(data) => { this._langAdd(data) }} languageData={languageData} onEditMode={(index) => this.setState({ langMode: index })}
                    anotherProfile={anotherProfile} />
                {/* </Collapse> */}
                {/* {this.state.editing === ""&&<PlusCircleButton index={1} onEditMode={this.showAddLang} textIconButton="Add More Language"/>} */}
                {/* </Collapse> */}
                {/* =========================================================================================== */}


                {/* =========================== ENGLISH PROFICIENCY TEST ===================================== */}
                <SkillHeader title="ENGLISH PROFICIENCY TEST" onClick={() => { this.toggleEditMode(2) }} />
                {/* <Collapse isOpen={true}> */}
                {
                    !_.isEmpty(this.state.englishData) ?
                        <Collapse isOpen={(this.state.editing === "eng-test") || (this.state.englishData)}>
                            <EnglishEdit onSubmit={this.onEnglishSubmit} onChange={(e) => this.onChangeEnglish(e)} englishData={englishData} onEditMode={(index) => { this.toggleEditMode(2); this.fetch_english_test() }}
                                anotherProfile={anotherProfile} />
                        </Collapse>
                        :
                        <PlusCircleButton index={2} onEditMode={(index) => { this.addEngSkill(index) }} textIconButton="Add More English Proficiency Test" />
                }
                {/* </Collapse> */}
                {/* =========================================================================================== */}


                {/* =========================== MARLIN TEST ================================================ */}

                <SkillHeader title="MARLIN TEST" onClick={() => { this.toggleEditMode(3) }} />
                {/* <Collapse isOpen={true}> */}
                {
                    // this.state.marlinData!==null?
                    // <Collapse isOpen={(this.state.editing==="marin_test" ) || (this.state.marlinData !==null) }>
                    <MarlinEdit onSave={this.onSaveMarlinTest} onChange={(e) => this.onChangeMarlin(e)} marlinData={marlinData} onEditMode={(index) => { this.toggleEditMode(3); this.fetch_marlin_test() }}
                        anotherProfile={anotherProfile} />
                    // {/* </Collapse> */}
                    // :
                    // <PlusCircleButton index={3} onEditMode={(index)=> this.addMarlinTest(index)} textIconButton="Add More Marlin Test"/>
                }
                {/* </Collapse> */}

                {/* =========================================================================================== */}


                {/* =========================== COMPUTER SKILL ================================================ */}

                <SkillHeader title="COMPUTER SKILL" onClick={() => { this.toggleEditMode(4) }} />
                <Collapse isOpen={true}>
                    {
                        _.isArray(this.state.userComputerSkill) && this.state.userComputerSkill.map((item, i) => (
                            <SkillScore key={i} name={item.computerSkillName} itemId={item.id} fetchALL={this.fetch_all_data} delete_url={API_USER_PROFILE_SKILL_COMPUTER_SKILL} className="mb-3"
                                anotherProfile={anotherProfile} />
                        ))
                    }
                    <Collapse isOpen={this.state.editing === "computer_skill"}>
                        {this.state.editMode === 4 && <ComputerEdit fetchAllComputerSkill={this.fetch_all_computer_skill} fetchALL={this.fetch_all_data} allComputerSkill={this.state.allComputerSkill} onSave={this.onSaveComputerSkill} onChange={this.onChangeComputerSKill} onEditMode={(index) => this.setState({ editMode: index })} onPlus={() => { this.setState({ editing: "" }) }}

                        />}
                    </Collapse>
                    {anotherProfile ?
                        ""
                        :
                        <div>
                            {this.state.editing === "" && <PlusCircleButton index={4} onEditMode={(index) => this.setState({ editMode: index, editing: "computer_skill" })} textIconButton="Add More Computer Skill" />}
                        </div>
                    }

                </Collapse>

                {/* =========================================================================================== */}
            </div>
        )
    }
}

export default compose(
    withToastManager,
)(Skill)