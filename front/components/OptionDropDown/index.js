import React, {Component} from 'react';
import {ListGroup, ListGroupItem} from "reactstrap";
import PropTypes from "prop-types";

const ICON = {
    EDIT:"fas fa-pencil-alt",
    DELETE:"fas fa-trash"
}

class OptionDropDown extends Component {
    render() {
        return (
            <div className="option-container cloud-bold-12 cr-pt-15"
                 style={{
                     textAlign: "right",
                 }}>
                <a href={"#"} onClick={this.props.toggle} className={"option-btn"}>
                    Option <i className="fas fa-angle-down"/>
                </a>
                <div className={`option-list ${this.props.show ? "" : "hide"}`}>
                    <ListGroup>
                        {
                            this.props.menu && this.props.menu.map((item,i)=>{
                                return(
                                    <ListGroupItem key={i} onClick={(e)=>{
                                        item.func();
                                        this.props.toggle(e);
                                    }} tag="button" action>
                                        <i className={ICON[item.icon]}/> {item.label}
                                    </ListGroupItem>
                                )
                            })
                        }
                        {/*{this.props.onEditMode && <ListGroupItem onClick={(e)=>{*/}
                            {/*onEditMode();*/}
                            {/*this.props.toggle(e);*/}
                        {/*}} tag="button" action>*/}
                            {/*<i className="fas fa-pencil-alt"/> {t("edit")}*/}
                        {/*</ListGroupItem>}*/}

                        {/*{onDelete && <ListGroupItem onClick={(e) => {*/}
                            {/*if (confirm("Do you want to delete?")) onDelete(data.id);*/}
                            {/*this.props.toggle(e);*/}
                        {/*}} tag="button" action>*/}
                            {/*<i className="fas fa-trash"/> {t("delete")}*/}
                        {/*</ListGroupItem>}*/}
                    </ListGroup>
                </div>

                <style jsx>{`
                    .option-btn{
                        text-decoration: "none";
                    }
                `}
                </style>
            </div>
        );
    }
}

export default OptionDropDown;

/**
 * input props
 *  - toggle : function => for toggle show state
 *  - show : bool => for visible state
 *  - menu : array of object
 * {
 *      label: String => for menu label
 *      faIcon : String => class name of fa icon ex: " fas fa-pencil-alt "
 *      func: Func => callback when click menu
 * }
 *
 *
 */

OptionDropDown.propTypes = {
  menu: PropTypes.array.isRequired,
  show: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired
}