import React, { Component } from "react"
import { compose } from "redux"
import { withRouter } from "next/router"

class SettingBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            click: false,
            language: this.props.setting.val.charAt(0).toUpperCase() + this.props.setting.val.slice(1),
            postLanguage: this.props.setting.val.charAt(0).toUpperCase() + this.props.setting.val.slice(1)
        }
        this.ele = null
    }

    setSeletor = (e) => {
        this.ele = e
        this.setState({
            postLanguage: e.value
        })
    }

    onClick = () => {
        const { click } = this.state
        this.setState({
            click: !click
        })
    }

    onCancel = () => {
        const { language } = this.state
        if(this.ele != null) {
            this.ele.value = language
        }
        this.setState({
            language: language,
            postLanguage: language
        }, this.onClick)
    }

    onSave = () => {
        const { postLanguage } = this.state
        if(this.ele != null) {
            this.ele.value = postLanguage
        }
        this.setState({
            language: postLanguage
        }, this.onClick)
    }

    render() {
        const { setting } = this.props
        const { click, language } = this.state
        return (
            <div className={"setting-page-box"}>
                <div className={"setting-page-box-left"}>
                    {setting.name}
                </div>
                <div className={ !click ? "setting-page-box-center" : "none-display"}>
                    {setting.descript}
                </div>
                <div className={ !click ? "setting-page-box-right" : "none-display"}>
                    {language}
                    <img 
                        src={"../../static/images/icon/AW_CrewHitz_ICON-33.png"}
                        onClick={this.onClick}
                    />
                </div>
                <div className={click ?"setting-page-box-right-change" : "none-display"}>
                    <select 
                        className={"setting-page-box-selector"}
                        onChange={(e) => this.setSeletor(e.target)}
                        defaultValue={language}
                    >
                        <option>Thai</option>
                        <option>English</option>
                    </select>
                    <div className={"setting-page-box-right-btn"}>
                        <button className={"cancel"} onClick={this.onCancel}>
                            <span>Cancle</span>
                        </button>
                        <button className={"save"} onClick={this.onSave}>
                            <span>Save Change</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default compose(
    withRouter
)(SettingBox)