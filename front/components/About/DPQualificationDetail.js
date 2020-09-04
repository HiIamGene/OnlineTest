import React, {Component} from "react";
import Detail from './Detail'
import {connect} from "react-redux";
import {setAboutDpEdit,setAboutDp} from "../../redux/actions/aboutAction";
import {fetchAboutDp,destroyAboutDp} from "../../services/aboutService";
import DPQualificationEdit from "./DPQualificationEdit";
import {Collapse} from 'reactstrap';

export default connect(store=>{
    return {
        dp: store.aboutReducer.dp
    }
},{setAboutDp,setAboutDpEdit})(class DPQualificationDetail extends Component {
    constructor(props){
        super(props);
        this.__destroyHandler = this.__destroyHandler.bind(this);
    }

    async __destroyHandler(dp){
        await destroyAboutDp(dp);
        this.props.setAboutDp(await fetchAboutDp());
    }

    render() {
        const anotherProfile = this.props.anotherProfile;
        let {title,data} = this.props;
        return (
            <div className="dp-qualification-container-identity-detail">
                <h4 className={"cr-header-title"}>{title}</h4>
                <hr/>
                {anotherProfile?"" 
                :
                <div>
                <Collapse isOpen={true}>
                    <DPQualificationEdit mode={false} type={this.props.type} plusText={"Add More DP Basic / Introduction"}/>
                </Collapse>
                </div>
            }
                { this.props.dp.mode && this.props.type === this.props.dp.type ? null :
                    data.map((value, index) =>
                        <Detail
                            certificate={"dp"}
                            key={index}
                            anotherProfile={anotherProfile}
                            data={{
                                title : value.certificateNumber ,
                                firstSubtitle : value.issueAuthority,
                                secondSubtitle : value.limitation,
                                issueDate : value.issueDate,
                                expiryDate : value.expiryDate,
                                certificate  :true,
                            }}
                            onDelete={async ()=>{ await this.__destroyHandler(value)}}
                            onEditMode={()=>{this.props.setAboutDpEdit({
                                mode: "edit",
                                ...value,                                
                                attachDocumentation : value.documentations
                            })}} />
                    )
                }

            </div>
        )
    }
});