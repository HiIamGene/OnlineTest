import React from 'react';
import isEmpty from "lodash/isEmpty"
import * as PropTypes from "prop-types";

const icons = {
    'user': {
        color:{color:"#4b7eb4",backgroundColor:"#9ee1ff"},
        class:"fas fa-user"
    },
    'experience' : {
        color:{color:"#4b7eb4",backgroundColor:"#9ee1ff"},
        class:"fas fa-briefcase"
    },
    'education' : {
        color:{color:"#296A60",backgroundColor:"#80D0C6"},
        class:"fas fa-graduation-cap"
    },
    'skill' : {
        color:{color:"#16203f",backgroundColor:"#7B89B2"},
        class:"far fa-lightbulb"
    },
    'certificate' : {
        color:{color:"#16203f",backgroundColor:"#7B89B2"},
        class:"fas fa-check-double"
    }
}

const InfoBox = ({icon,title,children,notify}) => {
    return (
        <div>
            <div className="box">
                <div className={"title"}>
                    <div className={"icon"}>
                        <img height={"25px"} src={icon} alt={title}/>
                    </div>
                    <span className={"text"}><b>{title}</b></span>
                    {(!isEmpty(notify) && notify !== "0") ?<div className={"badge notify-badge ml-1"}>{parseInt(notify)>=9?"9+ Expire":notify+" Expire"}</div>:""}
                </div>
                {children}
            </div>

            <style jsx>{`
                .notify-badge{
                    background-color: #ff4444;
                    color: white;
                    align-self: center;
                    text-align: center;
                    font-size: 12px;
                    font-weight: 900;
                }
                .info{
                    padding-left : 2em;
                }
                .info > li{
                    padding-left : .8em;
                }
                .title > .text{
                    padding-left : .4em;
                }
                .title > .icon{
                    width: 25px;
                    height: 25px;
                    justify-content: center;
                    display: flex;
                    align-items: center;
                }

                .box{
                    padding-bottom: 1em;
                }

                .title{
                    display:flex;
                    margin-bottom: .8em;
                    align-items: flex-end;
                }
            `}</style>
        </div>
    );
};

export default InfoBox;

InfoBox.propTypes = {
  children: PropTypes.any,
  icon: PropTypes.string.isRequired,
  notify: PropTypes.string,
  title: PropTypes.string.isRequired
}