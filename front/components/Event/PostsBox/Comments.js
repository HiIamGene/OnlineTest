import React from 'react';
import compose from "recompose/compose";
import {withNamespaces} from "../../../lib/i18n";
import {withRouter} from "next/dist/lib/router";
import {DEFAULT_AVATAR_URL} from "../../../constant";

const Comments = ({profile,t}) => {
    return (
        <div className={"box"}>

            <div className={"comments-list"}>
                <div className={"profile-img"}>
                    <img src="https://i.pinimg.com/originals/e1/d5/bf/e1d5bf2a5b02bdca1ec48c9b46dca16a.jpg" alt=""/>
                </div>
                <div className={"detail"}>
                    <div className={"name-and-time"}>
                        <div className={"name"}><span>Lord Voldemort</span>  <small> 1 {t('POSTS.min')}</small> </div>
                        <span className={"text"}>Come on, babe.</span>
                    </div>
                    <div className={"like"}>
                        <button className={"btn btn-sm"}><i className={"far fa-thumbs-up"}></i></button>
                    </div>
                    <i className={"pointer"}></i>
                </div>
            </div>

            <div className={"input-comment"}>
                <div className={"profile-img"}>
                    <img src={profile.profilePic || DEFAULT_AVATAR_URL} alt=""/>
                </div>
                <div className={"input"}>
                    <input type="text" placeholder={t('POSTS.write_comment')}/>
                </div>
            </div>
            <style jsx>{`
                .input{
                    flex-grow: 1;
                    padding-left: 1em;
                    font-size: 12.8px;
                }
                .input > input{
                    width: 100%;
                    background-color: #efefef;
                    border: solid 1.2px #c6c6c633;
                    border-radius: 20px;
                    padding: .3em .5em .3em .5em;
                    color: #353535;
                    transition: all .2s ease-in;
                }
                 .input > input:focus{
                    border-radius: 5px;
                    outline:0;
                    box-shadow:none;
                    border: solid 1px #0d153b;
                 }

                .input-comment{
                    border-top: solid 1px #cacaca;
                    padding-top: .4em;
                    margin-top: 1em;
                    display:flex;
                    align-items: center;
                }
                .pointer{
                    position:absolute;
                }
                .pointer:after {
                    position: absolute;
                    height: 0;
                    border: 7px solid transparent;
                    border-right-color: #efefef;
                    content: "";
                    left: -25px;
                    top: 5px;
                }
                .like{
                    display: flex;
                    align-items: center;
                }
                .like > button{
                    padding:0;
                    color:#181d50;
                    font-size: 1.2em;
                    transition: all .2s ease-in;
                }
                .like>button:focus{
                    outline:none;
                    box-shadow:none !important;

                }
                .like>button:active{
                    transition: all .1s ease-in;
                    transform:scale(1) !important;
                }
                .like>button:hover{
                    transform: scale(1.2) rotate(-9deg);
                    color:#3d67d3;
                }
                .detail{
                    padding-left: .7em;
                    flex-grow: 1;
                    border-radius: 5px;
                    padding: .4em .8em .4em .8em;
                    background-color: #efefef;
                    line-height: 1.3em;
                    margin-left: 1em;
                    font-size: 12.8px;
                }
                .name-and-time{
                    display:flex;
                    flex-direction:column;
                }
                .name{
                    font-family: "Cloud";
                    color: #1F2546;
                    font-size: 12.8px;
                }
                .name>span:hover{
                    text-decoration: underline;
                    cursor: pointer;
                }
                .name > small{
                    font-family: "Cloud";
                    color: #0000005c;
                    margin-left: .2em;
                    font-size: .8em;
                }

                .text{
                    color: #777777;
                    font-size: .9em;
                    margin-top: 0;
                }
                .detail{
                    display:flex;
                    justify-content: space-between;
                    flex-grow: 1;
                }

                .profile-img{
                    width:50px;
                    height:50px;
                    border-radius:100%;
                    overflow:hidden;
                }
                .profile-img > img {
                    width:50px;
                }
                .comments-list{
                    display:flex;
                }
                .box{
                    padding: 1em;
                }
            `}</style>
        </div>
    );
};

export default compose(
    withNamespaces('event'),
    withRouter
)(Comments);