import React from "react";
import Icon from "../../Icon/Icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Content = () => {
  return (
    <div className={"container-content"}>
      <div className={"wrapper"}>
        <img
          src={
            "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F38763944%2F196155805820%2F1%2Foriginal.jpg?h=230&w=460&auto=compress&rect=0%2C0%2C1000%2C500&s=c0a5ac0519aee1ee72baf18af3ed0b31"
          }
          alt={"cover"}
          width={150}
          height={100}
        />
        <div className={"container-event-name"}>
          <div className={"wrap-name-event"}>
            <img
              src="/static/images/icon/calendar-s.png"
              className={"icon-calendar"}
            />
            <span className={"start"}>Captain Meeting</span>
          </div>
          <span className={"captain"}>
            <i className={"fas fa-map-marker-alt"} style={{ marginRight: 4 }} />
            Ship expert technology
          </span>
          <div className={"view"}>
            {" "}
            <i className={"fas fa-eye"} /> View : Private
          </div>
        </div>
      </div>
      <div className={"date-content"}>
        <div className={"bold-date"}>Date : </div> 20 Mar 2018 - 20 August 2018
        · 5 Month
      </div>

      <div className={"content-post"}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae
        venenatis augue. Duis mattis turpis in tortor porta, ac pellentesque
        odio finibus. Curabitur pellentesque turpis sed congue viverra. Nulla
        molestie fringilla ligula, eget suscipit eros.
      </div>

      <div className={"accept-post"}>
        137 Accept

        <button className={"btn btn-secondary-post"}>Request</button>
      </div>

      <style jsx>{`
        .wrapper {
          cursor: pointer;
          display: flex;
          width: 100%;
          flex-direction: row;
          background-color: #fff;
          border-radius: 5px;
          padding: 0.2em;
          margin-right: 1em;
          transition: all 0.2s ease-in-out;
          flex: 0 0 auto;
          margin-top: 10px;
        }
        .wrapper:last-child {
          margin-right: 0;
        }
        .start{
          font-family:"Cloud";
          font-size:12.8px;
          margin-bottom: 0;
      }
      .captain{
          font-size:12.8px;
          color:#00000091;
          margin-bottom: .2em;
      }
      .view{
          background-color: #636363;
          font-size: 12.8px;
          border-radius: 17px;
          padding: 0.2em .5em 0.2em .5em;
          color: white;
          margin-bottom: .3em;
          text-align: center;
          width: fit-content;
      `}</style>
    </div>
  );
};

export default Content;
