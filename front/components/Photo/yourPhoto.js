import React, { Component } from 'react'
import PhotoChild from "./photoitem";
import axios from "axios"
import API from "../../constant/ENV"
export default class yourPhoto extends Component {
    constructor(){
        super();
        this.state = {
            photo: []
        }
        this._fetchPhoto = this._fetchPhoto.bind(this);
    }
    componentDidMount(){
        this._fetchPhoto();
        this.props.onRef(this);
    }
    componentWillUnmount(){
        this.props.onRef(undefined);
    }
    async _fetchPhoto(){
        let res = await axios.get(API.USER.PROFILE.PHOTO.YOUR_PHOTO);
        let {data} = res;
        let {payload} = data;
        let {photos} = payload;
        // console.log("_fetchPhoto",photos);
        this.setState({
            photo: photos
        })
    }
    render() {
        return (
            <div className = "photo-container">
                {this.state.photo.length != 0 ? 
                    this.state.photo.map((image)=>{
                        let {id,url} = image;
                        return(
                            <PhotoChild src = {url} key={id}/>
                        )
                    }) : 
                    <div>
                        No Photo
                    </div>
                }
            </div>
        )
    }
}
