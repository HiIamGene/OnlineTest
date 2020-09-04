import React,{Component} from 'react';
import compose from "recompose/compose";
import {withNamespaces} from "../../../lib/i18n";
import {withRouter} from "next/dist/lib/router";

class Reactions extends Component{
    constructor(props){
        super(props);
        this.state = {
            likeAppear: false
        }
        this._onMouseover = this._onMouseover.bind(this);
    }
    _onMouseover(likeAppear){
        this.setState({
            likeAppear,
        });
        // console.log(likeAppear);
    }
    render(){
        let {t} = this.props;
        return (
            <div className={"reaction"}>
                <div className={"count"}>
                    <div className={"like"}>
                        <i className={"far fa-thumbs-up"}></i> 1,230 {t('POSTS.likes')}
                    </div>
                    <div className={"comment"}>
                        2 {t('POSTS.comments')}
                    </div>
                </div>
    
                <div className={"panel"}>
                    <button className={"btn btn like-animation"}
                    onMouseOver={()=>{
                        this._onMouseover(true);
                    }}
                    onMouseOut={()=>{
                        this._onMouseover(false);
                    }}
                    > <i className={"far fa-thumbs-up"}></i> {t('POSTS.like')}</button>
                    <div id="like" className={this.state.likeAppear? "alt-like" : "alt-like off"}
                    onMouseOver={()=>{
                        this._onMouseover(true);
                    }}
                    onMouseOut={()=>{
                        this._onMouseover(false);
                    }}>
                        <div className="btn-container">
                            <button className="alt-like-icon"><img src="/static/images/icon/like-icon/001.png" className="like-icon"/></button>
                            <button className="alt-like-icon"><img src="/static/images/icon/like-icon/002.png" className="like-icon"/></button>
                            <button className="alt-like-icon"><img src="/static/images/icon/like-icon/003.png" className="like-icon"/></button>
                            <button className="alt-like-icon"><img src="/static/images/icon/like-icon/004.png" className="like-icon"/></button>
                            <button className="alt-like-icon"><img src="/static/images/icon/like-icon/005.png" className="like-icon"/></button>
                            <button className="alt-like-icon"><img src="/static/images/icon/like-icon/006.png" className="like-icon"/></button>
                        </div>
                    </div>
                    <button className={"btn btn"}> <i className={"far fa-comment"}></i> {t('POSTS.comment')} </button>
                    <button className={"btn btn"}> <i className={"fa fa-share-alt"}></i> {t('POSTS.share')} </button>
    
                </div>
            </div>
        );
    };
}

export default compose(
    withNamespaces('event'),
    withRouter
)(Reactions);