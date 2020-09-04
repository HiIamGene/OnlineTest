import React, { Component } from 'react'
import { compose } from 'recompose';
import '../../styles/style.scss'
import Icon from '../Icon/Icon';

class People extends Component{
    constructor(props){
        super(props)
        this.profile = {
            name: props.name,
            position: props.position,
            ship: props.ship,
            picture: props.picture
        }
        this.state = {
            check: true,
            imgMsg: 'message'
        }
        this.handleHoverMsg = this.handleHoverMsg.bind(this)
    }

    handleHoverMsg(){
        if(this.state.check){
            this.setState({
                check: !this.state.check,
                imgMsg: 'message-s'
            })
        }
        else{
            this.setState({
                check: !this.state.check,
                imgMsg: 'message'
            })
        }
    }

    render() {
        return(
            <header>
                <div className={'people-pic'}>
                    <img src={this.profile.picture}/>
                </div>
                <div className={'people-bio'}>
                    <div className={'people-name'}>
                        <b1>{this.profile.name}</b1>
                    </div>
                    <div className={'people-position'}>
                        <b1>{this.profile.position}</b1>
                    </div>
                    <div className={'people-ship'}>
                        <b1>{this.profile.ship}</b1>
                    </div>
                </div>
                <div className={'button'}>
                    <div className={'connectButton'}>
                        <button 
                            type={'button'}
                            value={'connect-button'}
                        >+ Connect</button>
                    </div>
                    <div className={'messageButton'}>
                        <button onMouseEnter={this.handleHoverMsg} onMouseLeave={this.handleHoverMsg}>
                            <Icon size={'1.4'} icon={this.state.imgMsg}/>
                        </button>
                    </div>
                </div>
            
                <style jsx>
                    {`
                        header{
                            margin-top: 2%;
                            width: 100%;
                            height: auto;
                            display: flex;
                            flex-directiob: row;
                        }

                        .people-bio{
                            margin-top: 3%;
                            display: flex;
                            flex-direction: column;
                            width: 95%;
                            margin-left: 3%;
                            font-size: 11px;
                        }

                        .people-pic{
                            margin-left: 0%;
                            width: 150px;
                            height: 70px;
                            margin-bottom: 2%;
                            border: 3px solid #ccc;
                            border-radius: 50%;
                            transition: 1.5s;
                        }

                        .people-pic img{
                            cursor: pointer;
                            border-radius: 50%;
                            width:  100%;
                            height: 100%;
                        }

                        .people-pic:hover{
                            opacity: 0.75;
                            border: 3px double #aaa;
                            transition: 1.5s;
                        }

                        .people-name b1{
                            font-family: "Cloud", sans-serif;
                            color: #242424;
                        }

                        .people-name b1:hover{
                            cursor: pointer;
                            text-decoration: underline;
                        }

                        .people-position b1{
                            font-family: "Cloud Light", sans-serif;
                            color: #888;
                        }

                        .people-ship b1{
                            font-family: "Cloud Light", sans-serif;
                            color: #888;
                        }

                        .button{
                            display: flex;
                            flex-direction: row;
                            width: 60%;
                            height: 100%;
                            margin-top: 7%;
                        }

                        .button button{
                            font-family: 'Cloud', sans-serif;
                            color: #161d4a;
                            margin-top: 0%;
                            border-color: #161d4a;
                            border-radius: 3px;
                            height: 65%;
                            transition: 0.8s;
                        }

                        .connectButton button{
                            font-size: 8px;
                            width: 100%;
                        }

                        .messageButton button{
                            text-align: center;
                            font-size: 8px;
                            background-color: #161d4a;
                            width: 100%;
                            transition: 1.0s;
                            margin-left: 5%;
                        }

                        .connectButton:hover button{
                            color: #fff;
                            background-color: #161d4a;
                            transition: 0.8s;
                        }
                    `}
                </style>
            </header>
        )
    }
}

export default compose(

)(People)