import React from 'react';
import {Button, Card, CardBody, CardTitle} from "reactstrap";
import Link from 'next/link';
import {Container} from 'reactstrap';
import compose from "recompose/compose";
import {withNamespaces} from "../../lib/i18n";
import {withToastManager} from "react-toast-notifications";
import {withRouter} from "next/dist/lib/router";


const ConfirmEmail = ({t}) =>
    (

        <Container>

            <div className="d-flex align-items-center flex-column" style={{width: "100%"}}>

                <div className="justify-content-center mt-5 mb-5">
                    <img src={"/static/images/icon/icon_wh.png"} alt="Crewhitz" width={"200"}/>
                </div>

                <div className="col-md-8">
                    <Card className={"ch-card cfm-email-b-shadow px-3"}>
                        <CardBody style={{textAlign: "center"}}>
                            <img src={"/static/images/icon/AW_CrewHitz_ICON-01.png"} alt="Crewhitz" width={60}
                                 className={"mb-3"}/>

                            <CardTitle><h5 style={{fontFamily: "Cloud"}}>{t('header_will_complete')}</h5>
                            </CardTitle>
                            <span>{t('detail_will_complete')}</span>
                        </CardBody>
                    </Card>

                    <div className={"center ch-card d-flex"} style={{justifyContent: 'center'}}>
                        <Link href='/login'>
                            <Button color="primary" className={"px-5"} style={{marginTop : '30px'}} >{t('back_to_home')}</Button>
                        </Link>
                    </div>

                </div>

            </div>
        </Container>

    )

export default compose(
    withNamespaces("confirm-email"),
    withToastManager,
)(ConfirmEmail)
