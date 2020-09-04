import React from "react";
import InfoBox from "./InfoBox";
import InfoItem from "./InfoItem";
import compose from "recompose/compose";
import { withNamespaces } from "../../../lib/i18n";
import { withRouter } from "next/dist/lib/router";
import InfoItemNoData from "./InfoItemNoData";
import _ from "lodash";
import SeeMore from "../EventsBox/SeeMore";
import router from "next/router";

const Experience = ({ info, t, anotherProfile, friend, type, anotherProfileId, name }) => {
    // console.log("Experience Info : ",info);
    // console.log("Experience friend : ",friend);
    if (info) {
        let now = new Date();
        let notifyCount = 0;

        const itemList = !_.isUndefined(info)
            ? info.map((item, id) => {
                  notifyCount += 1;
                  return (
                      <InfoItem
                          anotherProfileId={anotherProfileId}
                          type={type}
                          friend={friend}
                          key={id}
                          title={item.companyMaster._englishName}
                          desc={item.companyMaster._localName}
                          img={item.companyMaster._imageUrl}
                          anotherProfile={anotherProfile}
                      />
                  );
              })
            : [];
        return (
            <InfoBox type={type} icon={"/static/images/icon/AW_CrewHitz_ICON-22.png"} title={t("experience")}>
                <ul className={"info-items"}>
                    {_.isEmpty(info) ? (
                        <InfoItemNoData
                            anotherProfile={anotherProfile}
                            title={!anotherProfile ? t("BOX.add_exp") : t("No Experience")}
                            to={"/about?action=experience"}
                        />
                    ) : (
                        itemList
                    )}
                </ul>
               {/*  {notifyCount >= 3 ? (
                    <SeeMore
                        text={
                            anotherProfile
                                ? t("see_more_anotherabout") + name + t("see_more_anotherabout2")
                                : t("see_more_about")
                        }
                        onClick={
                            anotherProfile
                                ? () => {
                                      router.push("/about?action=experience&search=" + anotherProfileId);
                                  }
                                : () => {
                                      router.push("/about?action=experience");
                                  }
                        }
                    />
                ) : (
                    ""
                )} */}
                <style jsx>{`
                    .info-items {
                        max-height: 345px;
                        overflow: hidden;
                        padding-left: 0;
                    }
                `}</style>
            </InfoBox>
        );
    }
};

export default compose(
    withNamespaces("timeline"),
    withRouter
)(Experience);
