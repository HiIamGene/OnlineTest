import React, { Component } from 'react';
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { API_USER_PROFILE_SKILL_SOFT_SKILL } from '../../constant/ENV';
import axios from "axios"
import { withToastManager } from 'react-toast-notifications/dist/ToastProvider';
import { _error_handler } from "../../utils/errorHandler";

class SkillScore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDelete: false,
            name: this.props.name,
        }
    }

    _handleChange = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    _handleDelete = () => {
        this.setState((state) => ({
            isDelete: !state.isDelete
        }));
    }

    _confirmDelete = () => {
        const id = this.props.itemId
        axios.delete(`${this.props.delete_url}/${id}`, { data: { device: " " } })
            .then(async res => {
                this.setState({
                    isDelete: false,
                })
                await this.props.fetchALL()
                this.props.toastManager.add(res.data.message, { appearance: 'success', autoDismiss: true });

            })
            .catch(err => {
                _error_handler(this.props.toastManager, err)
            })
    }



    render() {
        const anotherProfile=this.props.anotherProfile
        return (
            <div className={"about-skill-score-wrap " + this.props.className}>
                <div className={"about-skill-score-name"}>
                    {
                        !this.state.isDelete ?
                            this.props.name :
                            `Do you want to delete "${this.props.name}" ? `
                    }
                </div>
                <div className="score">

                    {!this.state.isDelete && <div className="about-skill-score-edit">
                        {/*<FontAwesomeIcon*/}
                        {/*style={{*/}
                        {/*border : "1px solid black",*/}
                        {/*borderRadius : "50%",*/}
                        {/*width : "13px",*/}
                        {/*height  :" 13px",*/}
                        {/*marginRight: "5px",*/}
                        {/*backgroundColor :"black"*/}
                        {/*}}*/}
                        {/*color={"rgb(185,91,95)"} icon={faCheckCircle} size="lg" fixedWidth*/}
                        {/*/>*/}
                        {/*<span>230</span>*/}
                    </div>}

                    {anotherProfile ?
                     ""
                     :
                     
                        <div>
                            {!this.state.isDelete ?
                                <div>
                                    {this.props.onEdit && (<button onClick={() => { this.props.onEdit(this.props.itemId) }} className={"btn btn-sm btn-edit-skill text-warning ml-2"}><i className="far fa-edit"></i></button>)}
                                    <button onClick={this._handleDelete} className={"btn btn-sm btn-edit-skill text-danger ml-2"}><i className="fas fa-trash"></i></button>
                                </div>
                                :
                                <div>
                                    <button onClick={this._confirmDelete} className={"btn btn-sm about-skill-score-btn-edit-skill ml-2"}><i className="fas fa-check"></i></button>
                                    <button onClick={this._handleDelete} className={"btn  btn-sm about-skill-score-btn-edit-skill"}><i className="fas fa-times"></i></button>
                                </div>
                            }
                        </div>
                       
                    }



                </div>


            </div>
        );
    }
}

export default withToastManager(SkillScore);