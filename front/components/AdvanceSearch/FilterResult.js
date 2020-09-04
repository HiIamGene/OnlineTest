import React, {Component} from 'react'
import '../../styles/style.scss'
import { compose } from 'recompose'
import CheckBox from './CheckBox';

class FilterResult extends Component {

    clickSelected(e){
        console.log(e)
    }

    render() {
        return(
            <div>
                <div className={'filter-result-box'}>
                    <br/>
                    <h1>Filter Result</h1>
                    <b1> Age <br/> </b1>
                    <div className={'check-box'}>
                        <div className={'age'}>  
                            <CheckBox name={'age'} value={'Anyone'} defaultChecked={true}/>
                            <CheckBox name={'age'} value={'20-25'}/>
                            <CheckBox name={'age'} value={'25-30'}/>
                            <CheckBox name={'age'} value={'35-40'}/>
                        </div>
                    </div>
                    <b1> Occupation <br/> </b1>
                    <div className={'check-box'}>
                        <div className={'occupation'}>
                            <CheckBox name={'occupation'} value={'All'} defaultChecked={true}/>
                            <CheckBox name={'occupation'} value={'Captain'}/>
                            <CheckBox name={'occupation'} value={'Crew'}/>
                        </div>
                    </div>
                    <b1> Experience <br/> </b1>
                    <div className={'check-box'}>
                        <div className={'experience'}>
                            <CheckBox name={'experience'} value={'All'} defaultChecked={true}/>
                            <CheckBox name={'experience'} value={'Captian'}/>
                            <CheckBox name={'experience'} value={'Crew'}/>
                        </div>
                    </div>
                    <br/>
                </div>
                <style jsx>
                    {`
                        .filter-result-box{
                            background-color: #fff;
                            margin-left: 5%;
                            width: 100%;
                            height: auto;
                            cursor: default;
                        }
                        h1{
                            margin-left: 15%;
                            font-size: 15px;
                            font-family: "Cloud", sans-serif;
                            color: #242424;
                        }
                        .check-box{
                            font-family: "Cloud", sans-serif;
                            margin-left: 12%;
                            font-size: 12.8px;
                            color: #949494;
                        }

                        b1{
                            margin-left: 15%;
                            font-family: "Cloud", sans-serif;
                            font-size: 12.8px;
                            color: #898989;
                        }
                    `}
                </style>
            </div>
        )
    }
}

export default compose(
    
)(FilterResult)