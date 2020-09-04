import React from "react";
import { withRouter } from "next/router";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { withNamespaces } from "../../../lib/i18n";
import { DEFAULT_AVATAR_URL } from "../../../constant";
import { imageWithToken } from "../../../utils/image";
import { API_FEED_EVENT } from "../../../constant/ENV";
import axios from "axios";

class EventLink extends React.Component {
  render() {
    const {
      router,
      t,
      profile,
      icon,
      active,
      title,
      onClick
    } = this.props;
    // const Create = ({ router, t }) => {
    return (
      <div className={"wrapper-nav-event"}>
        <div className={"wrap-name-event"}>
          <img
            src="/static/images/icon/AW_CrewHitz_ICON-02.png"
            className={"icon-calendar"}
          />
          <span className={"title-nav"}> {t("NavEvent.title")}</span>
        </div>
        <div onClick={onClick} className="containerAboutSidebar">
          <div className="containerIconAboutSidebar">{icon}</div>

          <div className="containerTitleAboutSidebar">
            <p className="titleAboutSidebar">Events</p>
          </div>
        </div>
        <div onClick={onClick} className="containerAboutSidebar">
          <div className="containerIconAboutSidebar">{icon}</div>

          <div className="containerTitleAboutSidebar">
            <p className="titleAboutSidebar">My Event</p>
          </div>
        </div>
        <div onClick={onClick} className="containerAboutSidebar">
          <div className="containerIconAboutSidebar">{icon}</div>

          <div className="containerTitleAboutSidebar">
            <p className="titleAboutSidebar">See Your Bookmarks</p>
          </div>
        </div>
        <style jsx>{`
          p {
            margin: 0;
            padding: 0;
            font-family: Cloud;
          }
          .containerAboutSidebar {
            border-bottom: ${active
              ? "2px solid #0F143A"
              : "2px solid #ffffff"};
            color: ${active ? "#0F143A" : "#AFAFAF"} !important;
            border-spacing: 0;
            ${active ? "font-weight : bold;" : ""}
            display : flex;
            font-family: ${active ? "Cloud" : "Cloud Light"};
            position: relative;
            flex: auto;
            align-content: stretch;
            padding: 15px 50px 15px 15px;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            cursor: pointer;
            padding-bottom: 5px;
            transition: all 0.3s;
          }
          .containerAboutSidebar:hover {
            border-bottom: ${active
              ? "2px solid #0F143A"
              : "2px solid #ffffff"};
            padding-bottom: 5px;
            transition: height 0.1s, border-bottom 0.1s, padding-bottom 0.1s;
          }
          .containerAboutSidebar:hover > .iconAboutSidebar {
            current-color: red;
          }
          .containerAboutSidebar:hover
            > .containerTitleAboutSidebar
            > .titleAboutSidebar {
            transition: color 0.2s;
            font-weight: bold;
            color: #212121;
          }

          .containerIconAboutSidebar {
            position: absolute;
            left: 20px;
            top: 0.7em;
            color: ${active ? "#0F143A" : "#AFAFAF"} !important;
          }
          .containerTitleAboutSidebar {
          }
          .containerCurrentDataAboutSidebar {
          }
          .currentDataAboutSidebar {
            color: ${active ? "#0F143A" : "#C46367"};
            font-family: "Cloud";
            font-size: 0.8em;
          }
          .titleAboutSidebar {
            font-size: 0.8em;
            transition: color 0.2s;

            color: ${active ? "#0F143A" : "#636363"};
          }
          @media screen and (max-width: 600px) {
            .titleAboutSidebar {
              width: 150px;
            }
          }
        `}</style>
      </div>
    );
  }
}
// }

export default compose(
  withNamespaces("event"),
  connect(store => {
    return {
      profile: store.profileReducer,
      event: store.eventReducer
    };
  }),
  withRouter
)(EventLink);
