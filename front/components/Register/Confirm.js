import React from "react";
import { Button, Card, CardBody, CardTitle } from "reactstrap";
import Link from "next/link";
import { Container } from "reactstrap";
import compose from "recompose/compose";
import { withToastManager } from "react-toast-notifications";
import { withRouter } from "next/router";
import axios from "axios";
import {API_USER_VERIFY} from '../../constant/ENV';
import {withNamespaces} from "../../lib/i18n";

class Confirm extends React.Component {
  constructor(props) {
    super(props);
  }

  __submitHandler(e) {
    e.preventDefault();
    this.props.router.push("/login")
  }
  render() {
    const {verify,t} = this.props
    // console.log("verify",verify)
    return (
      <Container>
        <div
          className="d-flex align-items-center flex-column"
          style={{ width: "100%" }}
        >
          <div className="justify-content-center mt-5 mb-5">
            <img
              src={"/static/images/icon/icon_wh.png"}
              alt="Crewhitz"
              width={"200"}
            />
          </div>

          <div className="col-md-8">
            <Card className={"ch-card box-shadow px-3"}>
              <CardBody style={{ textAlign: "center" }}>
                <img
                  src={"/static/images/icon/AW_CrewHitz_ICON-01.png"}
                  alt="Crewhitz"
                  width={60}
                  className={"mb-3"}
                />

                <CardTitle>
                  <h5 style={{ fontFamily: "Cloud",color:verify?"#009000":"rgb(208, 0, 0)" }}>
                    {verify?t('SUCCESS.txt1'):t('ERROR.txt1')}
                  </h5>
                </CardTitle>
                <span>
                  {verify?t('SUCCESS.txt2'):t('ERROR.txt2')}
                </span>
              </CardBody>
            </Card>

            <div
              className={"center ch-card d-flex"}
              style={{ justifyContent: "center" }}
            >
                <Button
                  color="primary"
                  className={"px-5"}
                  style={{ marginTop: "30px" }}
                  onClick={this.__submitHandler.bind(this)}
                >
                  {t('back_to_home')}
                </Button>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}

// Confirm.getInitialProps = async ctx => {
//   initialize(ctx);
//   const token = ctx.store.getState().authentication.token;
//   if (token) {
//     const response = await axios.get(`${API_USER_VERIFY}/user`, {
//       headers: {
//         authorization: token
//       }
//     });
//     const user = response.data.user;
//     return {
//       user
//     };
//   }
// };

export default compose(
    withNamespaces("confirm-email"),
  withRouter,
  withToastManager
)(Confirm);
