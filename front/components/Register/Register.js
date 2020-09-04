import React from "react";
import {Button, Card, CardBody, CardTitle} from "reactstrap";
import Link from "next/link";
import axios from "axios";
import compose from "recompose/compose";
import {withToastManager} from "react-toast-notifications";
import {withRouter} from "next/router";
import {API_USER_REGISTER} from "../../constant/ENV";
import {withNamespaces} from "../../lib/i18n";
import ModalRegister from "./ModalRegister";
import {isNull} from "util";
import Modal from "../Event/CreateBox/Modal";
import {connect} from 'react-redux';
import {setMasterNationality} from "../../redux/actions/utilAction";
import {fetchMasterNationality} from "../../services/utilService";

class Register extends React.Component {
    constructor(props) { 
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSurname = this.onChangeSurname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirm = this.onChangeConfirm.bind(this);
        this.onChangeNationality = this.onChangeNationality.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this._onButtonClick = this._onButtonClick.bind(this);

        this.state = {
            showComponent: false,
            name: "",
            surname: "",
            email: "",
            password: "",
            confirmPassword: "",
            nationality: "Thai"
        };
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeSurname(e) {
        this.setState({
            surname: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onChangeConfirm(e) {
        this.setState({
            confirmPassword: e.target.value
        });
    }

    onChangeNationality(e) {
        this.setState({
            nationality: e.target.value
        });
    }

    _onButtonClick(e) {
        this.setState({
            showComponent: false
        });

        //   const { email, password, confirmPassword } = this.state;
        //   if (email.length < 8 || password.length < 8 || confirmPassword < 8){
        //     return isNull
        //   }
        //   return <ModalRegister />;
    }

    onSubmit(e) {
        e.preventDefault();

        const profile = {
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            nationality: this.state.nationality,
            device: "Web"
        };

        const {email, password, confirmPassword} = this.state;
        if (email.length < 8 || password.length < 8 || confirmPassword < 8) {
            this.props.toastManager.add(this.props.t("error_min_input"), {
                appearance: "error",
                autoDismiss: true
            });
            return;
        }

        axios
            .post(API_USER_REGISTER, profile)
            .then(res => {
                // console.log("res", res);
                this.props.toastManager.add(this.props.t("register_success"), {
                    appearance: "success",
                    autoDismiss: true
                });
                // this.props.router.push("/confirm-email")

                this.setState({
                    showComponent: true
                });


            })
            .catch(err => {
                // console.log("err=", err.response);
                let messages = err.response.data.payload;
                Object.keys(messages).map(key => {
                    this.props.toastManager.add(messages[key], {
                        appearance: "error",
                        autoDismiss: true
                    });
                });
            });
    }

    async componentDidMount() {
        if(this.props.nationalities.length <= 0){
            this.props.setMasterNationality(await fetchMasterNationality());
        }
    }

    render() {
        const {t} = this.props;
        return (
            <div className="register-page">
                <div className="regis-left-half ">
                    <img
                        className="regis-logo-lock"
                        src="/static/images/icon/icon_d.png"
                        alt="logo"
                    />
                    <img
                        className="bg-lock-reg"
                        src={"/static/images/icon/icon_wh.png"}
                        alt="Crewhitz"
                    />
                    <div className="center-left-reg">
                        <div className="regis-centerline">
                            __________________
                            <div className="regis-center-wel">{t("create_account")}</div>
                        </div>
                    </div>
                </div>

                <div className={"regis-right-half"}>
                    <div className={"wrap-back"}>
                        <Link href="/login">
                            <a>
                                <img
                                    src="../../static/images/icon/icons8-back-48.png"
                                    alt="back-button"
                                    className="img-back"
                                />
                            </a>
                        </Link>
                        <img
                            src="../../static/images/icon/icon_wh.png"
                            alt="back-button"
                            className="img-crewhitz"
                        />
                    </div>

                    <Card className={"ch-card-reg"}>
                        <CardBody className="card-body-reg">
                            <br/>
                            <form action="#" onSubmit={this.onSubmit.bind(this)}>
                                <div className="row ">
                                    <div className="col-sm-5">
                                        <label htmlFor="">{t("name")}</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg-reg ch-form-reg reg-font-size"
                                            placeholder={t("name")}
                                            required
                                            value={this.state.name}
                                            onChange={this.onChangeName}
                                        />
                                    </div>
                                    <div className="col-sm-5">
                                        <label htmlFor="">{t("surname")}</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg-reg ch-form-reg reg-font-size"
                                            placeholder={t("surname")}
                                            required
                                            value={this.state.surname}
                                            onChange={this.onChangeSurname}
                                        />
                                    </div>
                                    <div className="col-sm-10">
                                        <label htmlFor="">{t("email_account")}</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-lg-reg ch-form-reg reg-font-size"
                                            placeholder={t("email_account")}
                                            required
                                            value={this.state.email}
                                            onChange={this.onChangeEmail}
                                        />
                                    </div>
                                    <div className="col-sm-10">
                                        <label htmlFor="">{t("password")}</label>
                                        <input
                                            type={"password"}
                                            className="form-control form-control-lg-reg ch-form-reg reg-font-size"
                                            placeholder={t("password")}
                                            required
                                            value={this.state.password}
                                            onChange={this.onChangePassword}
                                        />
                                    </div>
                                    <div className="col-sm-10">
                                        <label htmlFor="">{t("cfm_password")}</label>
                                        <input
                                            type={"password"}
                                            className="form-control form-control-lg-reg ch-form-reg reg-font-size"
                                            placeholder={t("cfm_password")}
                                            required
                                            value={this.state.confirmPassword}
                                            onChange={this.onChangeConfirm}
                                        />
                                    </div>
                                    <div className="col-sm-10">
                                        <label htmlFor="">{t("nation")}</label>
                                        <select
                                            className="form-control form-control-lg ch-form-reg select-nation reg-font-size"
                                            required
                                            value={this.state.nationality}
                                            onChange={this.onChangeNationality}
                                        >
                                            {this.props.nationalities.map((value,key)=>{
                                                return <option key={key} value={value.nationality} selected>{value.nationality}</option>
                                            })}

                                        </select>
                                    </div>
                                    <div className="ch-form-reg wrap-checkbox reg-font-size">
                                        <input
                                            //checked
                                            id={"styled-checkbox-1"}
                                            type="checkbox"
                                            className={"ch-checkbox"}
                                            required
                                        />
                                        <label htmlFor="styled-checkbox-1">
                      <span
                      className={"reg-font-size"}
                      >
                        {" "}
                          {t("txt_1")}{" "}
                          <a href="/terms" className="ch-title" target="_blank">
                          {t("txt_2")}
                        </a>{" "}
                          {t("txt_3")}{" "}
                          <a
                              href="/datapolicy"
                              className="ch-title"
                              target="_blank"
                          >
                          {t("txt_4")}
                        </a>{" "}
                          {t("txt_5")}{" "}
                      </span>
                                        </label>
                                    </div>
                                    <br/>

                                    <input
                                        className="ml-1 btn btn-primary ch-bg-primary btn-lg btn-custom reg-button-ok"
                                        type="submit"
                                        value={t("btn_register")}
                                        onClick={this._onButtonClick}

                                    />
                                    {/* {this.state.showComponent ? <ModalRegister/> : null}  */}
                                    {this.state.showComponent && <ModalRegister/>}

                                </div>
                            </form>
                            <br/>
                        </CardBody>
                    </Card>
                </div>
            </div>
        );
    }
}

export default compose(
    withNamespaces("register"),
    withToastManager,
    withRouter,
    connect(store => {
        return {
            nationalities: store.utilReducer.nationalities
        }
    }, {setMasterNationality})
)(Register);
