import React, { Component } from 'react';
import Card from "../Card"
import compose from "recompose/compose";
import {connect} from "react-redux";
import {withNamespaces} from "../../../lib/i18n";
import {withRouter} from "next/router";
import Create from "./Create"


class CreateBox extends Component {
    constructor(props) {
        super(props);
        //console.log("index create box ", this.props)
    }

    _isCreated = (callback) => {
        if(callback) {
            this.props.isCreated(true)
        }
    }

    render() {
        const {t} = this.props;

        return (
            <Card title={t('CREATE.create')}>
                <div style={{display:"flex"}}>
                <Create isCreated={this._isCreated} created={this.props.created}/>
                </div>
            </Card>
        );
    }
};
export default compose(
    withNamespaces('event'),
    withRouter
)(CreateBox);