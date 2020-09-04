import { Component } from "react"
import { compose } from "recompose";
import '../../styles/style.scss'
import SeeMore from './SeeMore'
import People from './People'
import {withRouter} from "next/router"
import {connect} from "react-redux"
import {withNamespaces} from "../../lib/i18n";

class BodyResult extends Component {
    render() {
        return (
            <div>
                <div className={'body-result-box'}>
                    <br/>
                    <div className={'body-people'}>
                        <h1>People</h1>
                        <div className={'table-people'}>
                            <label className={'container'}>
                            <People 
                                name={'Harry Potter'}
                                position={'Captain'}
                                ship={'Ship Howag'}
                                picture={'https://timedotcom.files.wordpress.com/2014/07/301386_full1.jpg'}
                            />
                            </label>
                            <label className={'container'}>
                            <People 
                                name={'Hermione Granger'}
                                position={'Crew'}
                                ship={'Ship Educ'}
                                picture={'https://i.pinimg.com/originals/de/1f/08/de1f08d7bd65f94208d0479c97df1bea.jpg'}
                            />
                            </label>
                            <label className={'container'}>
                            <People 
                                name={'Ron Wisley'}
                                position={'Crew'}
                                ship={'Ship Pooler'}
                                picture={'https://static.independent.co.uk/s3fs-public/thumbnails/image/2016/08/11/09/ron-weasley.jpg?w968h681'}
                            />
                            </label>
                            <label className={'container'}>
                            <People 
                                name={'Draco Malfoy'}
                                position={'Captain'}
                                ship={'Ship Serin'}
                                picture={'https://i.pinimg.com/originals/0d/0a/6d/0d0a6d096f8c98c30dd62137345e8c72.jpg'}
                            />
                            </label>
                        </div>
                        <div className={'button-see-more'}>
                            <SeeMore/>
                        </div>
                    </div>
                </div>
                <style jsx>
                    {`
                        .body-result-box{
                            width: 60%;
                            height: 50%;
                            background-color: #fff;
                            cursor: default;
                        }

                        .body-people{
                            margin-left: 2%;
                            margin-right: 2%;
                        }
                        
                        h1{
                            font-family: "Cloud", sans-serif;
                            font-size: 12.8px;
                            color: #242424;
                        }

                        .button-see-more{
                            margin-top: 1%;
                            margin-bottom: 2.5%;
                            width: 100%;
                            text-align: center;
                        }
                        
                        .container{
                            width: 48%;
                            height: auto;
                            background-color: #fff;
                            border: 2px solid #ccc;
                            border-radius: 10px;
                            margin-left: 1%;
                        }

                        .table-people{
                            margin-top: 2.5%;
                            display: flex;
                            flex-direction: row;
                            flex-wrap: wrap;
                            width: 100%;
                            height: auto;
                        }
                    `}
                </style>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profileReducer,
    }
}

export default compose(
    connect(mapStateToProps),
    withNamespaces(),
    withRouter
)(BodyResult)