import React from 'react';
import { withRouter } from 'next/router'
import compose from "recompose/compose";
import {withNamespaces} from "../../../lib/i18n";

const RecommendBanner = ({name,textStatus,color = "blue",router,t}) => {
    const colors = {
        blue:"linear-gradient(to bottom right, #70c1f8, #4b80d1);",
        red:"linear-gradient(to bottom right, #ff6b2e, #a83028);"
    }

    return (
        <div className={"wrapper"}>
            <div  className={"banner"} onClick={()=>{router.push("/about")}}>
                <div className={"update"}>
                    <span style={{flexGrow:1}}>{t('update')}</span>
                    <span>{textStatus}</span>
                </div>
                <div className={"name"}>
                <span>
                    {name}
                </span>
                </div>

            </div>


            <style jsx>{`
                .wrapper{
                    padding-right: .6em;
                    display: flex;
                    width: 50%;
                    transition: all .2s ease-in-out;
                }
                .wrapper:hover{
                    transform: scale(1.03);
                }

                .wrapper:last-child{
                        padding-right: 0;
                }


                .banner{
                    background-image: ${colors[color]}
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    border-radius: 5px;
                    padding: .7em;
                    color: white;
                    font-family: "Cloud";
                    cursor:pointer;
                }
                .update{
                    display: flex;
                    justify-content: space-around;
                }
                .name{
                    font-family: "Cloud Light";
                    font-size: smaller;
                    color: #ffffff94;
                }

            `}</style>
        </div>
    );
};

export default compose(
    withNamespaces('timeline'),
    withRouter
)(RecommendBanner);