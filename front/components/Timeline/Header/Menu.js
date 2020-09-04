import React from "react"
import MenuItem from "./MenuItem"
import { withRouter } from 'next/router'
import compose from "recompose/compose";
import {withNamespaces} from "../../../lib/i18n";



const Menu =  ({id,currentPath,router,t,anotherProfile,popularity}) => {

    let anotherProfilePage = false
    let another_list = {}
        if(anotherProfile != null && (anotherProfile.router.route == '/timeline'||anotherProfile.router.route == '/friend'||anotherProfile.router.route == '/photo'||anotherProfile.router.route == '/about') && anotherProfile.router.query.search != null){
            anotherProfilePage = true

            another_list = {
                '/timeline': '/timeline?search='+anotherProfile.anotherProfile.user.id,
                '/about': '/about?action=personal&search='+anotherProfile.anotherProfile.user.id,
                '/friend':'/friend?search='+anotherProfile.anotherProfile.user.id,
                '/photo': '/photo?search='+anotherProfile.anotherProfile.user.id,
                '/event': window.location.href,
            }

            // console.log(another_list);
        }
        /*else if(anotherProfile != null && anotherProfile.router.route == '/friend' && anotherProfile.router.query.search != null){
            anotherProfilePage = true

            another_list = {
                '/timeline': '/timeline?search='+anotherProfile.anotherProfile.user.id,
                '/about': '/about?action=personal&id='+anotherProfile.anotherProfile.user.id,
                '/friend':'/friend?search='+anotherProfile.anotherProfile.user.id,
                '/photo': '/photo?search='+anotherProfile.anotherProfile.user.id,
                '/event': window.location.href,
            }
        }*/
    const menu_list = {
        "/timeline":<span>{t('MENU.timeline')}</span>,
        "/about":<span>{t('MENU.about')}</span>,
        "/friend" : <span>{t('MENU.friend')}<b> ({popularity})</b></span>,
        "/photo":<span>{t('MENU.photo')}</span>,
        // "/event":<span>{t('MENU.event')}</span>,
        "/point":<span>{t('MENU.point')}</span>
    }
    const menu_list_another = {
        "/timeline":<span>{t('MENU.timeline')}</span>,
        "/about":<span>{t('MENU.about')}</span>,
        "/friend" : <span>{t('MENU.friend')}<b className={"ml-1"}> ({popularity? popularity : "0"})</b></span>,
        "/photo":<span>{t('MENU.photo')}</span>,
        // "/event":<span>{t('MENU.event')}</span>,
    }

    return(

        <div className={"profile-menu"}>
            <ul>
                {
                    Object.keys(!anotherProfilePage? menu_list : menu_list_another).map((key, index) => (
                        //// console.log(key, index),
                        <li key={index} className={"list-item"}>
                            <MenuItem active={key == router.pathname}url={!anotherProfilePage ? key : another_list[key]}>{!anotherProfilePage ?menu_list[key] : menu_list_another[key]}</MenuItem>
                        </li>
                    ))
                }

            </ul>

            <style jsx>
                {`
                .profile-menu{
                  margin-left: 200px;
                  border-left: solid 1px #8e8e8e3b;
                  font-size:12.8px;
                }
                .profile-menu > ul{
                  list-style-type: none;
                  margin: 0;
                  padding: 0;
                  overflow: hidden;
                  height: 100%;
                }

                .list-item{
                  height: 100%;
                  float: left;

                }

                span{
                    font-size: 12.8px;
                }

            `}

            </style>
        </div>
    )
}

export default compose(
    withNamespaces('timeline'),
    withRouter
)(Menu)