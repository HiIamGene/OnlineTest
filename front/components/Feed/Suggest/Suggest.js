import React from "react";
import compose from "recompose/compose";
import { withNamespaces } from "../../../lib/i18n";
import { withRouter } from "next/dist/lib/router";
import { imageWithToken } from "../../../utils/image";
import API from "../../../constant/ENV";
import axios from "axios";
import { Spinner, Button } from "reactstrap";

class Suggest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: true,
      isAdd: false
    };

    this.__addFriend = this.__addFriend.bind(this);
  }

  async __addFriend(userId) {
    this.setState({
      isAdd: true
    });
    await axios
      .post(API.USER.PROFILE.FRIEND.ADD_V010000, {
        userId
      })
      .then(() => {
        this.setState({
          isShow: false
        });
      });
  }

  render() {
    let { t, data } = this.props;
    const { isAdd } = this.state;
    return !this.state.isShow ? (
      ""
    ) : (
      <div className={"friend-item-wrapper"}>
        <div className={"friend-profile"}>
          <img
            src={
              data.profilePic
                ? imageWithToken(data.profilePic)
                : "/static/images/icon/user_avatar_icon.jpg"
            }
            alt=""
          />
        </div>
        <div className="nearby-wrapper-friend-item">
          <div className={"detail"}>
            <div className={"information-nearby"}>
              <span className={"nearby-user-name"}>{`${
                data.name.concat(` ${data.surname}`).length > 20
                  ? data.name
                      .concat(` ${data.surname}`)
                      .substring(0, 20)
                      .concat("...")
                  : data.name.concat(` ${data.surname}`)
              }`}</span>
              <small>
                <div className={"mt-7"}>
                  {data.organisation ? (
                    <p className="organization-name mt-3 mb-0">
                      {data.organisation.localName.length > 30
                        ? data.organisation.localName
                            .substring(0, 30)
                            .concat("...")
                        : data.organisation.localName}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </small>
            </div>
          </div>
          <div className="btn-nearby">
            <Button
              onClick={() => {
                this.__addFriend(data.id);
              }}
              color="primary"
              size="sm"
              className={"btn-add-friend-feed"}
              disabled={isAdd ? true : false}
            >
              {!isAdd ? (
                <span>+ Add Friend</span>
              ) : (
                <Spinner className="loading-icon" size="sm" color="secondary" />
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  withNamespaces("timeline"),
  withRouter
)(Suggest);
