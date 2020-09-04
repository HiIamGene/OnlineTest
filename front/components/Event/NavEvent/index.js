import React from "react";
import Card from "../Card";
import compose from "recompose/compose";
import { connect } from "react-redux";
import { withNamespaces } from "../../../lib/i18n";
import { withRouter } from "next/router";
import EventLink from "./eventLink";

const NavEvent = ({ t }) => {
  return (
    <Card
      noPadding={true}
    >
      <div style={{ display: "flex" }}>
        <EventLink />
      </div>
    </Card>
  );
};
export default compose(
  withNamespaces("event"),
  withRouter
)(NavEvent);
