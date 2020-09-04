import Router from 'next/router'
import { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import TimelineLayout from '../containers/app/timelineLayout'
import { withAuthSync } from '../utils/auth/index'
import MainComponent from '../components/About/MainComponent'
import { API_USER_LOGIN } from '../constant/ENV'
import ChatList from "../components/Chat";
import { withRouter } from "next/router"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import { setProfile } from "../redux/actions/profileAction"
import { setAboutProfile } from "../redux/actions/aboutProfileAction"
import {
  API_USER_PROFILE_EDUCATION,
  API_USER_PROFILE_EXPERIENCE_V010001,
  API_USER_PROFILE_SKILL_SOFT_SKILL,
  API_USER_PROFILE_ANOTHER_PROFILE
} from "../constant/ENV"
import axios from "axios"
import compose from "recompose/compose";
import Navbar from '../components/Navbar'
import { withNamespaces } from "../lib/i18n"


//const About = withAuthSync(props => {

//   const { name, login, bio, avatarUrl } = props.data
//const [data, setData] = useState(false);
//profile = {data}
class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      success: false,
      anotherProfile: [],
      anotherProfilePage: false
    }
    this.props.setAboutProfile(this.props.profile)
    this._getData();
  }
  static async getInitialProps(ctx) {
    let aboutInfo = {}
    try {
      const exp = await axios.get(API_USER_PROFILE_EXPERIENCE_V010001)
      const edu = await axios.get(API_USER_PROFILE_EDUCATION)
      const softSkill = await axios.get(API_USER_PROFILE_SKILL_SOFT_SKILL)
      aboutInfo = {
        exp: exp.data.payload.experiences,
        edu: edu.data.payload,
        softSkill: softSkill.data.payload
      }

    } catch (e) {
      console.log(e)
    }
    return {
      aboutInfo,
      namespacesRequired: ['friend'],
    }
  }


  componentDidMount() {
    this._getData();
  }

  componentDidUpdate() {
    if (this.props.router.query.search === undefined && this.state.anotherProfilePage) {
      this.setState({
        anotherProfilePage: false
      }, this.forceUpdate)
    }

    else if (this.props.router.query.search !== undefined && !this.state.anotherProfilePage) {
      this._getData()
    }
  }

  componentWillUpdate() {
    // console.log("timeline-update", this.state)
  }

  _getData() {

    const profileData = this.props.router.query//window.location.href.split("=");

    if (profileData.search !== undefined) {

      const url = API_USER_PROFILE_ANOTHER_PROFILE + profileData.search
      axios.get(url).then(response => {
        if (response.status == 200) {
          const getData = response.data.payload
          this.setState({
            anotherProfile: {
              user: {
                ...getData,
                proficiency: []
              },
              edu: getData.educations,
              exp: getData.experiences,
              softSkill: getData.softSkills,
              router: this.props.router,
            },
            ...this.props,
            loading: false,
            success: true,
            anotherProfilePage: true
          }, this._setFriendAnotherData)
        }
      })
    }
    else {
      this.setState({
        loading: false,
        success: true,
        ...this.props,
        anotherProfilePage: false
      });
    }
  }

  _setFriendAnotherData = () => {
    const { anotherProfile } = this.state
    const url = `${API_USER_PROFILE_ANOTHER_PROFILE}about/${anotherProfile.user.id}`
    axios.get(url).then(response => {
      if (response.status == 200) {
        const data = {
          user: {
            ...anotherProfile.user
          },
          ...response.data.payload
        }
        this.props.setAboutProfile(data)
      }
    })
  }
  render() {

    let data = this.state;
    return (!this.state.loading ? (
      this.state.success ? (

        <TimelineLayout  profile={data}>
          <MainComponent anotherProfilePage={this.state.anotherProfilePage} profile={data}  />
          <div className='chatlist-position'>
          </div>
        </TimelineLayout>
      )
        :
        (<div>
          <Navbar />
          <div style={{
            marginTop: '25%',
            marginLeft: '25%',
            fontSize: '72px'
          }}>
            <span>404: User Not Found</span>
          </div>
        </div>)) :
      (<div>
        <Navbar />
        <div style={{
          marginTop: '25%',
          marginLeft: '45%',
          fontSize: '72px'
        }}>
          
            <img
              className={"loading-event-gif"}
              src={"static/images/image-loader/spinner-loader.gif"}
            />

        </div>
      </div>)
    )
  }
}

// About.getInitialProps = async ctx => {
//   const token = cookieToken(ctx)
//   const apiUrl = 'http://localhost:3000/api/v2/login'

//   const redirectOnError = () =>
//     process.browser
//       ? Router.push('/')
//       : ctx.res.writeHead(301, { Location: '/' })

//   try {
//     const response = await fetch(apiUrl, {
//       credentials: 'include',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: JSON.stringify({ token })
//       }
//     })

//     if (response.ok) {
//       return await response.json()
//     } else {
//       return redirectOnError()
//     }
//   } catch (error) {
//     return redirectOnError()
//   }
// }

const mapDispatchToProps = dispatch => {
  return {
    setProfile: bindActionCreators(setProfile, dispatch),
    setAboutProfile: bindActionCreators(setAboutProfile, dispatch)
  }
}
const mapStateToProps = (state) => {
  return {
    profile: state.profileReducer,
    aboutProfile: state.aboutProfileReducer
  }
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNamespaces(),
  withAuthSync,
  withRouter
)(About);