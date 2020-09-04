import React, { Component } from "react"
import { compose } from "redux"
import { withRouter } from "next/router"
import SettingBox from "./settingBox"

const settingMain = {
    name: "Crewhitz language",
    descript: `Edit Language for buttons, title and other text from Facebook on this device`,
    val: "thai"
}

const settingPost= {
    name: "Post from friends and Pages",
    descript: `Edit Language into which you'd like to have posts translated`,
    val: "english"
}

const Languages = [ settingMain]

class Setting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: this.props.selected,
            headText: "Language Setting"
        }
    }

    setHeadText = () => {
        const { selected } = this.state
        if(selected == "languages") {
            this.setState({
                headText: "Language Setting"
            })
        }
        else if(selected == "privacy") {
            this.setState({
                headText: "Privacy Setting"
            })
        }
    }

    setSelected = (val) => {
        this.setState({
            selected: val
        }, this.setHeadText)
        
    }

    onClickLanguages = () => {
        this.setSelected("languages")
    }

    onClickPrivacy= () => {
        this.setSelected("privacy")
    }

    render() {
        const languageSetting = Languages.map(key => (<SettingBox setting={key}/>))
                    
        const { selected, headText } = this.state
        //// console.log(this.state)

        return (
            <div className={"setting-page"}>
                <div className={"setting-page-head"}>
                    Setting
                </div>
                <div className={"setting-page-body"}>
                    <div className={"setting-page-body-left"}>
                        <div 
                            className={selected == "languages" ? "onSelected" : "noSelected"}
                            onClick={this.onClickLanguages}
                        >
                            Languages
                        </div>
                        <div 
                            className={selected == "privacy" ? "onSelected" : "noSelected"}
                            onClick={this.onClickPrivacy}
                        >
                            Privacy
                        </div>
                    </div>
                    <div className={"setting-page-body-right"}>
                        <div className={"setting-page-body-right-head"}>
                            {headText}
                        </div>
                        <div className={"setting-page-body-right-body"}>
                            { selected == "languages" ?
                                languageSetting
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default compose(
    withRouter
)(Setting)