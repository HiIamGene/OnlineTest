import React from 'react';
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import * as PropTypes from "prop-types";
const Wrap = styled.div`
  width: ${props=>props.isMobile?"100%":"45%"};
  display: flex;
  flex-direction:row;
  padding: .7em;
  background-color: white;
  border-radius: 5px;
  border: ${props=>props.select? "solid 2px #AFAFAF" : "solid 2px #e1e1e1"};
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: all .3s;
`

const ShowDate = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #0D153A;
  border-radius: 5px;
  color: white;
  font-size: .7em;
  border-left: solid 13px ${props=>props.color||"#44A88C"};
  padding: .5em 15px;
  font-size:12.8px;
`

const Date = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 1.5em;
  padding-right: 1.5em;
  align-items: center;
  justify-content: center;
  &:last-child{
    border-left: 1px solid darkgrey;
  }
  &>span:nth-child(2){
    font-family: "Cloud";
    font-size: 15px;
  }
`

const Caption = styled.span`
    font-family: Cloud;
    font-size: 12.8px;
    text-align: center;
    align-items: center;
    display: flex;
    padding: 10px;
    padding-left: 25px;
    width: auto;
`
const CaptionInput = styled.input`
    border: none;
    width: 100%;
    border-bottom: solid 1.5px #040044;
    &:focus{
      outline: none !important;
    }
`
const Close = styled.div`
    font-family: Cloud;
    font-size: 1.2em;
    text-align: center;
    align-items: center;
    display: flex;
    padding: 10px;
    color: #cccccc;
    cursor: pointer;
    margin-left: auto;
    &:hover{
        color: #707070;
    }
`

const AvailableDayItem = ({startDate,endDate,caption,select,onClick,item,onRemove,ribbonColor,onCaptionChange,isMobile,isShow}) => {
    let startDay = startDate&&dayjs(startDate).format("DD")
    let startMouth = startDate&&dayjs(startDate).format("MMM")
    let endDay = endDate&&dayjs(endDate).format("DD")
    let endMouth = endDate&&dayjs(endDate).format("MMM")
    return isShow ? (
            <div className="avaliabledate-design">
                <div className="avaliabledate-show-date" color={ribbonColor}>
                    <div className="avaliabledate-date">
                        <span>{startMouth}</span>
                        <span>{startDay}</span>
                    </div>
                    <div className="avaliabledate-date">
                        <span>{endMouth}</span>
                        <span>{endDay}</span>
                    </div>
                </div>
                <span className="avaliabledate-caption">
                    {isShow ? caption : (
                        <input type="text" value={caption} onChange={(e)=>onCaptionChange(e)} />
                    )}

                </span>
                {isShow ? null : (
                    <div className="avaliabledate-close" onClick={()=>{onRemove(item.key)}}>
                        <FontAwesomeIcon icon={faTimesCircle} fixedWidth/>
                    </div>
                )}
            </div>
        ) : (
            <div>
                <div className="avaliabledate-wrap" select={select} onClick={onClick} isMobile={isMobile}>
                    <div className="avaliabledate-show-date" color={ribbonColor}>
                        <div className="avaliabledate-date">
                            <span>{startMouth}</span>
                            <span>{startDay}</span>
                        </div>
                        <div className="avaliabledate-date">
                            <span>{endMouth}</span>
                            <span>{endDay}</span>
                        </div>
                    </div>
                    <span className="avaliabledate-caption">
                        <input type="text" value={caption} onChange={(e)=>onCaptionChange(e)} />
                    </span>
                    <div className="avaliabledate-close" onClick={()=>{onRemove(item.key)}}>
                        <FontAwesomeIcon icon={faTimesCircle} fixedWidth/>
                    </div>

                </div>
            </div>
        )
};

export default AvailableDayItem;

AvailableDayItem.propTypes = {
  caption: PropTypes.string.isRequired,
  endDate: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  ribbonColor: PropTypes.string,
  startDate: PropTypes.object.isRequired
}