/**
 * Created by Komphet
 * 19/05/2019
 */

import React, {Component} from "react";
import ReactAutocomplete from 'react-autocomplete'
import {Input} from "reactstrap";
import {imageWithToken} from "../../utils/image";
import PropTypes from 'prop-types';

class Autocomplete extends Component {
    constructor(props) {
        super(props);
        /**
         * "value" store input value
         * "items" store item object witch map from array on componentWillReceiveProps method
         * "item" store selected item on __onSelect  method
         * @type {{item: {}, value: string, items: {}}}
         */
        this.state = {
            value: "",
            items: {},
            item: {}
        };

        /**
         * Bind method
         */
        this.__onChange = this.__onChange.bind(this);
        this.__onSelect = this.__onSelect.bind(this);
        this.__onKeyUp = this.__onKeyUp.bind(this);
        this._onClear = this._onClear.bind(this);
    }

    /**
     * Map items array to object which id is key of object
     * and store to state "items" for mapping value
     * when method __onChange has calling
     */
    componentWillReceiveProps(nextProps, nextContext) {
        const items = {};
        nextProps.items.forEach((item)=>{
            items[item.value] = item
        });
        this.setState({
            items,
        });
    }

    componentDidMount() {
        this.setState({
            value: this.props.value
        })
    }

    /**
     * Clean item when typing input and
     */
    __onKeyUp(){
        if(Object.keys(this.state.item).length > 0){
            this.props.onSelect(null);
            this.setState({
                item: {}
            });
        }
    }

    /**
     * set input value to state and call function onChange on props
     */
    __onChange(e){
        this.setState({
            value: e.target.value
        });
        this.props.onChange(e);
    }

    /**
     * Set item and value to state and call function onSelect on props
     */
    __onSelect(value){
        const item = this.state.items[value];
        this.props.onSelect(item);
        this.setState({
            item,
            value: item.label[0]
        });
    }
    _onClear(e){
        setstate({
            value: ""
        });
    }

    render() {
        let restOnFocus;
        let {item} = this.state;
        let {items,onCreate,onCreateBtn,onFocus} = this.props;
        return (
            <div className={"autocomplete about-font-sm-light"}>
                <ReactAutocomplete
                    getItemValue={(item) => item.value}
                    items={items}
                    renderInput={props => {
                        const {ref, ...rest} = props;
                        if(onFocus){
                            /**
                             * Call onFocus event when input is focusing.
                             */
                            restOnFocus = rest.onFocus;
                            rest.onFocus = (event)=>{
                                onFocus(event);
                                restOnFocus(event);
                            };
                        }

                        return <div>
                            <div className={"input-render about-font-sm-light"}>
                                <div className={"input-wrap about-font-sm-light"}>
                                    {"imageUrl" in item && item.imageUrl &&
                                    <img src={imageWithToken(item.imageUrl)}
                                         alt={"Crewhitz"}
                                         width={("label" in item ? /* 25+(25*item.label.length)-25 */ 40 : 25)+"px"}
                                         height={("label" in item ? /* 25+(25*item.label.length)-25 */ 40 : 25)+"px"}
                                    />}
                                    <div className="label-wrap about-font-sm-light" style={{marginLeft: "label" in item && item.imageUrl ? 25+(25*item.label.length)+"px" : "1em"}}>
                                        {/* Dynamic show label from item in state */}
                                        {"label" in item && item.label.map((value,key)=>{
                                            if(key !== 0){
                                                return <div style={{padding: !("imageUrl" in item) && ".3em 0.5em"}} key={key}>{value}</div>
                                            }
                                        })}
                                    </div>
                                    {/* Dynamic input padding */}
                                    <Input maxLength={65} onKeyUp={this.__onKeyUp} style={{padding: `1.5em 50px ${"label" in item ? 1.2+(1.5*item.label.length)-1.5 : 1.2}em ${"label" in item && item.imageUrl ? 25+(25*item.label.length)+"px" : "1em"}`}} required={this.props.required} className="about-ch-form about-font-sm-light"  {...rest} innerRef={ref}/>
                                </div>
                            </div>
                        </div>
                    }}
                    renderMenu={(items) => {
                        return (
                            <div className={"menu-render about-font-sm-light"}>
                                <div className={"item about-font-sm-light"} children={items}/>
                                {onCreate ? (
                                    <button type={"button"} onClick={onCreate} className="btn create-btn about-font-sm-light">
                                        <p>
                                            {onCreateBtn ? onCreateBtn : "Create"}
                                            {"label" in item && item.label[0] ? ` "${item.label[0]}"` : null}
                                        </p>
                                    </button>
                                ) : null}

                            </div>
                        )
                    }}
                    wrapperStyle={{width: "100%"}}
                    renderItem={(renderItem, isHighlighted) =>
                        <button type={"button"} key={renderItem.value} className={`btn item-render ${isHighlighted ? "active about-font-sm-light" : ""}`}>
                            {
                                "imageUrl" in renderItem &&
                                renderItem.imageUrl &&
                                <div className={"image-wrap about-font-sm-light"}>
                                    <img
                                        src={imageWithToken(renderItem.imageUrl)}
                                        width={("label" in renderItem ? 25+(25*renderItem.label.length)-25 : 25)+"px"}
                                        height={("label" in renderItem ? 25+(25*renderItem.label.length)-25 : 25)+"px"}
                                    />
                                </div>
                            }
                            <div className={"text-wrap about-font-sm-light"} style={{marginLeft: item.imageUrl ? "15px" : "10px"}}>
                                {"label" in renderItem && renderItem.label.map((label,index)=>{
                                    return <div key={index}>{label}</div>
                                })}
                            </div>
                        </button>
                    }
                    value={this.state.value}
                    onChange={this.__onChange}
                    onSelect={this.__onSelect}
                />
            </div>
        )
    }
}
Autocomplete.propTypes = {
    /**
     * ============== Required ==============
     * Item list for render. It will map from array to object
     * and store in state.items on componentWillReceiveProps method.
     * Array list must must be based on this template only
     * [
     *   {
     *       imageUrl: "https://crewhitz.com/static/images/icon/icon_d.png",
     *       label: ["Hello","สวัสดี"],
     *       value: "123456789",
     *   }
     * ]
     */
    items: PropTypes.array,

    /**
     * Function call when click button last of item list.
     * Button display by onCreateBtn.
     *
     * @params null
     */
    onCreate: PropTypes.func,
    onCreateBtn: PropTypes.string,

    /**
     * Function call when input value has changed.
     *
     * @args input event (object)
     */
    onChange: PropTypes.func,

    /**
     * Function call when item has selected.
     *
     * @args value of item (string)
     */
    onSelect: PropTypes.func,

    /**
     * Function call when input is focusing.
     *
     * @args input event (object)
     */
    onFocus: PropTypes.func,

    /**
     * Value on input
     */
    value: PropTypes.string,

};

export default Autocomplete;