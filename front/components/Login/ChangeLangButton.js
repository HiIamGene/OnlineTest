import React from "react"
import cookie from 'js-cookie'
import {COOKIE_LANG} from "../../constant"

class ChangeLangButton extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            show:false,
            languages:[
                {
                    text:"ภาษาไทย",
                    lang:"th",
                    url:"/static/images/flag/TH.png"
                },
                {
                    text:"English",
                    lang:"en",
                    url:"/static/images/flag/US.png"
                }
            ],
            current:0,
        }
    }

    componentDidMount(){
        const c = cookie.get(COOKIE_LANG)
        const index = this.state.languages.findIndex((item,i)=>(item.lang===c))
        this.setState({
            current:index
        })
    }

    onClick = ()=>{
        this.setState({
            show:!this.state.show,
        })
    }

    onChangeLang = (index) =>{
        this.setState({
            current:index
        })
        this.props.changeLanguage(this.state.languages[index].lang)
    }

    allLange = () =>(
        this.state.languages.map((item,i)=>(
            <div onClick={()=>{this.onChangeLang(i)}}>
                <img className="lang-icon" src={item.url} />
                <span className="lang">{item.text}</span>
            </div>
        ))
    )

    render() {
        const now_lang = this.state.languages[this.state.current];
        return (
            <div className="btn-chage-language" onClick={this.onClick}>
                {this.state.show ? 
                    this.allLange()
                    :
                    <div><img className="lang-icon" src={now_lang.url} /><span className="lang">{now_lang.text}</span> </div> 
                    }

            </div>
        )
    }
}

export default ChangeLangButton;