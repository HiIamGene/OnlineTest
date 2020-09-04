import React, {Component} from 'react';
import PropTypes from "prop-types";
import _ from "lodash"



class CheckBox extends Component {
    constructor(props){
        super(props);
    }

    onChange = (e) =>{
        if (_.isFunction(this.props.onChange)) {
            this.props.onChange(this.props.name,e.target.value)
        }
    }

    render() {
        return (
            <div>
                <label className="checkbox-container">
                    <span className={"cloud-bold-12"}>{this.props.label}</span>
                    <input type="radio"
                           checked={this.props.checked}
                           name={this.props.name}
                           value={this.props.value}
                           onChange={this.onChange}
                           defaultChecked={this.props.defaultChecked}
                           onLoad={this.props.onLoad}
                           onClick={this.props.onClick}
                    />
                    <span className="checkmark"></span>
                </label>
            </div>
        );
    }
}

export default CheckBox;

CheckBox.propTypes = {
  checked: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired
}