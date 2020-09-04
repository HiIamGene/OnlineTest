import React,{Component} from "react";
import {connect} from 'react-redux';
import {setSocket,setChatSocket} from "../redux/actions/socketAction";
import socketIOClient from "socket.io-client";
import API from "../constant/ENV";
import ChatList from "../components/Chat"
import cookies from "js-cookie"
class AppContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
          width: 0,
        }
        this._changeChatAppear = this._changeChatAppear.bind(this);
      }
      _changeChatAppear(){
        // console.log("window.innerWidth : ",this.state.width)
        this.setState({
          width: window.innerWidth
        })
      }
    componentDidMount() {
        if(!this.props.socket.userSocket){
            const socket = socketIOClient(API.SOCKET.USER,{
                query:{authorization: this.props.auth.token}
            });
            this.props.setSocket(socket);
        }
        if(!this.props.socket.chatSocket){
          const socket = socketIOClient(API.SOCKET.MESSAGE,{
              query:{authorization: this.props.auth.token}
          });
          this.props.setChatSocket(socket);
      }
        this.setState({
          width : window.innerWidth,
        })
        window.addEventListener("resize",this._changeChatAppear);
    }
    componentWillUnmount(){
        window.removeEventListener("resize",this._changeChatAppear);
      }
    render() {
        let data = this.state;
        const { error } = this.props;
        return (
            <div>
                {this.props.children}
                {cookies.get("token") != null && data.width >767? 
                !error.isPageError ? <ChatList/> : ""
                : ""
                }
                
            </div>
            
        )
    }
}

export default connect(store=>{
    return {
        auth: store.authReducer,
        socket: store.socketReducer,
        error: store.errorReducer
    }
},{setSocket,setChatSocket})(AppContainer);