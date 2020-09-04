import React, { Component } from 'react'
import PhotoChild from "./photoitem";
import axios from "axios"
import API from "../../constant/ENV"
export default class postPhoto extends Component {
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
        //let res="";
        if(this.props.anotherProfile){
            
            
            let res = await axios.get(API.USER.PROFILE.PHOTO.POST_ANOTHERPHOTO+this.props.anotherProfileId);
            console.log(res)
            this.setState({
                photo: res.data.payload.photos
            })
            
            
        }
        else{
            let res = await axios.get(API.USER.PROFILE.PHOTO.POST_PHOTO);
            console.log(res)
            this.setState({
                photo: res.data.payload.images
            })
        }
        /*console.log(res)
        let {data} = res;
        let {payload} = data;
        let {photos} = payload;
        // console.log("_fetchPhoto",images);
        this.setState({
            photo: photos
        })*/
    }
    render() {
        console.log(this.state.photo)
        return (
            <div className = "photo-container">
                {this.state.photo.length != 0 ? 
                    this.state.photo.map((photos)=>{
                        let {id,url} = photos;
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
