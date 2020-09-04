import { Component } from "react";
import { compose } from "recompose";
import '../../styles/style.scss'

class Head extends Component{
    constructor(){
        super()
    }

    handleStyle = (e) => {
        e.target.style = `
            cursor: pointer;
            border-bottom: 3px solid #333;
            font-family: "Cloud", sans-serif;
            transition: 0.5s;
            `
        // console.log('success')
    }

    render(){
        return(
            <div>
                <div className={'head-background'}>
                   <div className={'head-layout'}>
                        <span className={'span-all'} onLoad={(e) => this.handleStyle(e)}>All</span>
                        <span className={'span-people'}>People</span>
                        <span className={'span-post'}>Post</span>
                        <span className={'span-event'}>Event</span>
                        <span className={'span-job'}>Job</span>
                   </div>
                </div>
                <style jsx>{`
                    .head-background{
                        background-color: #fff;
                        width: 100%;
                        height: 100%;
                    }

                    .head-layout{
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: row;
                    }

                    span{
                        border: 3px solid #fff;
                        font-family: "Cloud Light", sans-serif;
                        font-size: 15px;
                        text-align: center;
                        margin-top: 0.5%;
                        margin-bottom: 0.5%;
                        width: 6%;
                        height: 100%;
                        transition: 0.5s;
                    }

                    .span-all{
                        border-bottom: 3px solid #333;
                        font-family: "Cloud", sans-serif;
                    }

                    .span-all:hover{
                        cursor: pointer;
                        border-bottom: 3px solid #333;
                        font-family: "Cloud", sans-serif;
                        transition: 0.5s;
                    }

                    .span-people:hover{
                        cursor: pointer;
                        border-bottom: 3px solid #333;
                        font-family: "Cloud", sans-serif;
                        transition: 0.5s;
                    }

                    .span-event:hover{
                        cursor: pointer;
                        border-bottom: 3px solid #333;
                        font-family: "Cloud", sans-serif;
                        transition: 0.5s;
                    }

                    .span-post:hover{
                        cursor: pointer;
                        border-bottom: 3px solid #333;
                        font-family: "Cloud", sans-serif;
                        transition: 0.5s;
                    }

                    .span-job:hover{
                        cursor: pointer;
                        border-bottom: 3px solid #333;
                        font-family: "Cloud", sans-serif;
                        transition: 0.5s;
                    }
                `}</style>
            </div>
        )
    }
}

export default compose(

)(Head)