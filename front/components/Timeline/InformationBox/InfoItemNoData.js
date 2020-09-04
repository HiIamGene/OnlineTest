import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {withRouter} from "next/router"
import * as PropTypes from "prop-types";

const InfoItemNoData = ({title,to,router,anotherProfile}) => {
    return (
        <li className={"item-cer"} onClick={()=>router.push(to)}>
            {!anotherProfile?
                <div className="plusIconTimeline" >
                    <FontAwesomeIcon color={"rgb(60,102,180)"} icon={faPlus} fixedWidth/>
                </div> : ""
            }
            <div className={"detail"}>
                <b className={"text-blue"}>{title}</b>
            </div>
            {!anotherProfile?
                <style jsx>{`
                .text-blue{
                    color:rgb(60,102,180);
                }
                .plusIconTimeline{
                    display : inline-flex;
                    border : 2px dashed rgb(60,102,180) ;
                    border-radius : 10px;
                    padding : 15px;
                    height : 100%;
                }

                .item-cer{
                    background-color: #EFEFEF;
                    border-radius: .5em;
                    display: flex;
                    padding: .7em;
                    margin-bottom: .5em;
                    transition: all .2s ease-in;
                }
                .item-cer > img{
                    width: 50px;
                    height: 50px;
                    border-radius: 5px;
                    border: solid 1px gainsboro;
                }
                .detail > small {
                    color:#999999;
                    line-height: 1em;
                }

                .item-cer >.detail{
                    margin-left: 1em;
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                    justify-content:center;
                }
            `}</style>
            :
              <style jsx>{`
            .text-blue{
                color:rgb(60,102,180);
            }
            .plusIconTimeline{
                display : inline-flex;
                border : 2px dashed rgb(60,102,180) ;
                border-radius : 10px;
                padding : 15px;
                height : 100%;

            }

            .item-cer{
                background-color: #EFEFEF;
                border-radius: .5em;
                display: flex;
                padding: .7em;
                margin-bottom: .5em;
                transition: all .2s ease-in;
                cursor:pointer;
            }
            .item-cer:hover{
                transform:scale(1.04);
            }
            .item-cer > img{
                width: 50px;
                height: 50px;
                border-radius: 5px;
                border: solid 1px gainsboro;
            }
            .detail > small {
                color:#999999;
                line-height: 1em;
            }

            .item-cer >.detail{
                margin-left: 1em;
                display: flex;
                flex-direction: column;
                flex-grow: 1;
                justify-content:center;
            }
        `}</style>
            }
            
        </li>
    );
};

export default withRouter(InfoItemNoData);

InfoItemNoData.propTypes = {
  router: PropTypes.any,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired
}