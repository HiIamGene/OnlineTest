import React from "react";
import { withRouter } from "next/router";
import compose from "recompose/compose";
import { withNamespaces } from "../../lib/i18n";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalRegister extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: true
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    const { router, t } = this.props;
    const closeBtn = (
      <button
        className="close regis_modal_close"
        onClick={this.toggle}
        // style={{ fontSize: "40px" }}

      >
        &times;
      </button>
    );
    return (
      <div>
        {/* <Button color="danger" onClick={this.toggle}>
          {this.props.buttonLabel}
        </Button> */}
        <Modal
          isOpen={this.state.modal}
          centered={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
          className={"regis_modal_box mx-auto"}
          // style={{ maxWidth: "400px" }}
        >
          <ModalHeader
            toggle={this.toggle}
            close={closeBtn}
            className={"regis_modal_box_header"}
            // style={{
            //   borderBottom: "1px solid transparent",
            //   paddingBottom: 0
            // }}
          />
          <ModalBody
          className={"regis_modal_box_body1"}
            // style={{
            //     display: "flex",
            //     justifyContent: "center",
            //     flexDirection: "column",
            //     paddingTop: 0,
            //     paddingBottom: 45,
            // }}
          >
            <div
            className={"regis_modal_box_body2"}
              // style={{
              //   justifyContent: "center",
              //   display: "flex",
              //   marginBottom: "20px"
              // }}
            >
              <img className={"regis_modal_box_body2"} src="/static/images/icon/AW_CrewHitz_ICON-53.png" />
            </div>

            <div
            className={"regis_modal_box_body3"}
              // style={{
              //   display: "flex",
              //   alignItems: "center",
              //   flexDirection: "column"
              // }}
            >
              <h5 className={"regis_header_font"}
              // style={{ fontFamily: "Cloud", marginBottom: "20px" }}
              >
                คุณดำเนินการใกล้จะเสร็จสมบูรณ์แล้ว
              </h5>
              <p className={"regis_body_font"}
              // style={{ marginBottom: 0 }}
              >
                กรุณายืนยัน ที่อยู่อีเมลของคุณ เพื่อให้การลงทะเบียน
              </p>
              <p>เสร็จสมบูรณ์ ไปยังอีเมล์ของท่านตอนนี้เพื่อยืนยัน</p>
              <a href='/login'>
              <Button color="info" onClick={this.toggle}>
                กลับสู่หน้าหลัก
              </Button>{" "}
              </a>
            </div>
          </ModalBody>
        </Modal>
        {/* <style jsx>{`
          p {
            font-weight: 500;
          }

          .modal-content{
            width: 70%
          }
        `}</style> */}
      </div>
    );
  }
}

export default compose(
  withNamespaces("register"),
  withRouter
)(ModalRegister);
