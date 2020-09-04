import {Component} from 'react'
import { compose } from 'recompose'
import _ from "lodash"

const RadioBox = props => (
    <input type={'radio'} {...props} />
)

class CheckedRadio extends Component{
    constructor(props){
        super(props)
        this.state = {
            categoried: []
        }
    }

    render() {
        return(
            <header>
                <div>
                    <label className={'container'}>
                        <div className={'radio-box'}>
                            <RadioBox
                                value={this.props.value}
                                name={this.props.name}
                                defaultChecked={this.props.defaultChecked}
                            /> {this.props.value}
                        </div>
                        <span className={'checkmark'}> </span>
                    </label>
                </div>
                <style jsx>
                    {`
                        .radio-box{
                            cursor: pointer;
                        }

                        .radio-box:hover{
                            color: #aaa;
                        }

                    `}
                </style>
            </header>
        )
    } 
}

export default compose(

)(CheckedRadio)