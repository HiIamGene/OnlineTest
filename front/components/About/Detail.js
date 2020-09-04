import React, {Component} from "react";
import {faPencilAlt, faTrash, faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import dayjs from 'dayjs'
import {withNamespaces} from "../../lib/i18n"
import _ from 'lodash'
import cookies from 'js-cookie'
import {ListGroup, ListGroupItem} from 'reactstrap';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showOption: false,
            isMouseOnCard : false,
        };
        this.__optionToggle = this.__optionToggle.bind(this);
    }

    __optionToggle(e) {
        e.preventDefault();
        this.setState({
            showOption: !this.state.showOption
        })
    }

    render() {
        let { t, onEditMode, data, onDelete, noExpire, dispState, certificate } = this.props;
        const anotherProfile= this.props.anotherProfile;
        let {isMouseOnCard} = this.state;
        let isCertificate = false;
        let imageLink = null;
        if (this.props.certificate) {
            isCertificate = true;
            switch (this.props.certificate) {
                case "competency": {
                    imageLink = "/static/images/icon/AW_CrewHitz_ICON-76.png";
                    break;
                }
                case "proficiency": {
                    imageLink = "/static/images/icon/AW_CrewHitz_ICON-77.png";
                    break;
                }
                case "training": {
                    imageLink = "/static/images/icon/AW_CrewHitz_ICON-78.png";
                    break;
                }
                case "dp": {
                    imageLink = "/static/images/icon/AW_CrewHitz_ICON-79.png";
                    break;
                }
                case "health": {
                    imageLink = "/static/images/icon/AW_CrewHitz_ICON-80.png";
                    break;
                }
            }
        }
        let isExpire = data.expiryDate && !this.props.noExpire ? dayjs(data.expiryDate).diff(dayjs(),'day') <= 1 : false;
 
        
        return (
            
            <div  onMouseEnter={()=>this.setState({isMouseOnCard : true})} onMouseLeave={()=>this.setState({isMouseOnCard : false , showOption : false})} 
                className={
                    certificate === 'competency' || certificate === 'proficiency' || certificate === 'training' ?
                        dispState[0] ? 
                            "cr-card cr-bg-gray-3-background cr-mb-10 cr-detail " + (isExpire==true ? "cr-card-expire" : "")
                            :
                            dispState[1] ?
                                !isExpire ?
                                    "cr-card cr-bg-gray-3-background cr-mb-10 cr-detail "
                                    :
                                    "none-display"
                                :
                                dispState[2] ?
                                    isExpire ?
                                        "cr-card cr-bg-gray-3-background cr-mb-10 cr-detail cr-card-expire"
                                        :
                                        "none-display"
                                    :
                                    null
                            :
                            "cr-card cr-bg-gray-3-background cr-mb-10 cr-detail " + (isExpire==true ? "cr-card-expire" : "")
                    }>
                <div className="about-edu-container-detail">
                    <div className="edu-display">
                        <div className="about-edu-container-logo">
                            {isCertificate ? (<img className="about-edu-contaner-logo" src={imageLink}/>) : (
                                !data.certificate && data.img ? <img className="about-edu-contaner-logo"
                                                                     src={data.img + "?token=" + cookies.get("token")}/> : (!data.certificate ?
                                    <img className="about-edu-contaner-logo" src={"/static/images/icon/icon_d.png"}/> :
                                    <div className={"about-edu-contaner-cert-logo"}><i className="fas fa-award"/></div>)
                            )}

                        </div>

                        <div className="about-edu-container-text">
                            <div className="pull-right">{data.titleRight ? data.titleRight : null}</div>
                            <div className="about-edu-contaner-title-detail cloud">{data.title}</div>
                            {isExpire && <span className="badge badge-orange">Expire</span>}
                            {data.firstSubtitle && data.firstSubtitle.trim() === "undefined" ? null : !_.isEmpty(data.firstSubtitle) ?
                                <p className="about-edu-contaner-text-detail">{data.firstSubtitle}</p> : data.firstSubtitle}
                            {data.secondSubtitle && data.secondSubtitle.trim() === "undefined" ? null : !_.isEmpty(data.secondSubtitle) ?
                                <p className="about-edu-contaner-text-detail">{data.secondSubtitle}</p> : data.secondSubtitle}

                            {
                                !data.issueDate || (data.issueDate && data.issueDate.trim() === "undefined") ? null :
                                    <p className="about-edu-contaner-text-detail">
                                        {dayjs(data.issueDate).format("DD MMM YYYY")}
                                        {data.work ? " - present" : data.expiryDate ? " - " + dayjs(data.expiryDate).format("DD MMM YYYY") : ""}
                                    </p>
                            }

                        </div>


                    </div>

                </div>
                {anotherProfile ?
                    

                 ""   
                :
                isMouseOnCard &&
                <div className="option-container cr-pt-15">
                    <a href="#" onClick={this.__optionToggle} className={"option-btn"}>
                        Option <i className="fas fa-angle-down" />
                    </a>
                    <div className={`option-list ${this.state.showOption ? "" : "hide"}`}>
                        <ListGroup>
                            {onEditMode && <ListGroupItem onClick={(e) => {
                                onEditMode();
                                this.__optionToggle(e);
                            }} tag="button" action>
                                <i className="fas fa-pencil-alt" /> {t("edit")}
                            </ListGroupItem>}

                            {onDelete && <ListGroupItem onClick={(e) => {
                                if (confirm("Do you want to delete?")) onDelete(data.id);
                                this.__optionToggle(e);
                            }} tag="button" action>
                                <i className="fas fa-trash" /> {t("delete")}
                            </ListGroupItem>}
                        </ListGroup>
                    </div>
                </div>
            }

                
                
                {/*<div className="containerIcon">*/}
                {/*<div style={{*/}
                {/*margin: "10px 0px 0 0",*/}
                {/*padding: "0px 7px 0px 0px",*/}
                {/*borderRight: "1px solid rgb(200,200,200)"*/}
                {/*}}*/}
                {/*onClick={onEditMode}*/}
                {/*className="containerIconWithText">*/}
                {/*<FontAwesomeIcon color={'rgb(128,160,205)'} icon={faPencilAlt} fixedWidth/>*/}
                {/*<p style={{*/}
                {/*color: "rgb(60,102,180)",*/}

                {/*}} className="textIconButton">{t("edit")}</p>*/}
                {/*</div>*/}
                {/*<div*/}
                {/*onClick={() => {*/}
                {/*if (confirm("Do you want to delete?")) onDelete(data.id)*/}
                {/*}}*/}
                {/*style={{*/}

                {/*padding: "0px 0px 0px 7px",*/}
                {/*}} className="containerIconWithText">*/}
                {/*<FontAwesomeIcon color={'rgb(203,92,87)'} icon={faTrash} fixedWidth/>*/}
                {/*<p style={{*/}
                {/*color: "rgb(203,92,87)",*/}
                {/*margin: "10px 5px 0 0",*/}
                {/*}} className="textIconButton">{t("delete")}</p>*/}
                {/*</div>*/}

                {/*</div>*/}
               
            </div>
        )
    }
}

Detail.getInitialProps = async (ctx) => {
    return {
        namespacesRequired: ['detail-about-button'],
    }
}

export default withNamespaces("detail-about-button")(Detail)