import React  from 'react';
import { Layout, Row,  Button } from 'antd';
import { ContentContainer, Container } from '../../components/Styles';
import SideMenu from '../../components/SideMenu';
import Head from '../../components/Head';
import Profile from '../../assets/icon/Profile.png';
import API from "../../constants/api.jsx";
import axios from 'axios';

class UserInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: "",
      surname: "",
      email: "",
      edit: false,
      form: 1,
      key:"2"
    }
  }
  toggleEdit = () => {
    if (this.state.edit) {
      if (this.state.firstname || this.state.surname || this.state.email) {
        axios.post(API.V1.TEACHER.INFO.EDITINFO, {
          "Firstname": this.state.firstname,
          "Surname": this.state.surname ,
          "Email":  this.state.email
          //ไม่ได้เช็คถ้าไม่ได้แก้
        }, {
          headers: {
            'Authorization': localStorage.getItem('token'),
          }
        }).then(res => {
          this.setState({ userinfo: res.data })
        }).catch(err => {
          console.warn(err);
        })
      }
    }
    this.setState({ edit: !this.state.edit });

    //props.handleValue(adProp);
  }
  updatefirstname(value) {
    this.setState({ firstname: value })
  }
  updatesurname(value) {
    this.setState({ surname: value })
  }
  updateemail(value) {
    this.setState({ email: value })
  }
  componentWillMount() {
    axios.post(API.V1.TEACHER.INFO.GETINFO, {
    }, {
      headers: {
        'Authorization': localStorage.getItem('token'),
      }
    }).then(res => {
      this.setState({ firstname: res.data.Firstname })
      this.setState({ surname: res.data.Surname })
      this.setState({ email: res.data.Email })
    }).catch(err => {
      console.warn(err);
    })
  }

  render() {
    return (
      <Container>
        <Layout>
          <SideMenu keyValue={this.state.key} form={this.state.form} />
          <Layout  style={{ marginLeft: 180 }}>
          <ContentContainer >
            <Head />{this.state.edit ?
              <div>

                  <Row gutter={16} type="flex" justify="space-around">
                  </Row>
                  <img src={Profile} alt={"Profile"} style={{ height: 200, marginLeft: 150 }} />
                  <div style={{ marginLeft: 150, fontSize: 30, fontWeight: "bold" }} >T.testteacher</div>
                  <div style={{ marginLeft: 150, fontSize: 30 }} >Name : <input onChange={e => this.updatefirstname(e.target.value)} defaultValue={this.state.firstname}></input></div>

                  <div style={{ marginLeft: 150, fontSize: 30 }} >Surname : <input onChange={e => this.updatesurname(e.target.value)} defaultValue={this.state.surname}></input></div>
                  <div style={{ marginLeft: 150, fontSize: 30 }} >E-mail : <input onChange={e => this.updateemail(e.target.value)} defaultValue={this.state.email} tyle={{ height: 50 }}></input></div>
                  <div style={{ marginLeft: 1200, marginTop: 200 }}>
                    <Button onClick={() => this.toggleEdit()} style={{ background: "#F43A09", color: "#ffffff", width: 300, height: 70, fontSize: 30 }}>Save</Button>
                  </div>

              </div> : <div>

                  <Row gutter={16} type="flex" justify="space-around">
                  </Row>
                  <img src={Profile}  alt={"Profile"} style={{ height: 200, marginLeft: 150 }} />
                  <div style={{ marginLeft: 150, fontSize: 30, fontWeight: "bold" }} >T.testteacher</div>
                  <div style={{ marginLeft: 150, fontSize: 30 }} >Name : {this.state.firstname}</div>

                  <div style={{ marginLeft: 150, fontSize: 30 }} >Surname : {this.state.surname}</div>
                  <div style={{ marginLeft: 150, fontSize: 30 }} >E-mail : {this.state.email}</div>
                  <div style={{ marginLeft: 1200, marginTop: 200 }}>
                    <Button onClick={() => this.toggleEdit()} style={{ background: "#F43A09", color: "#ffffff", width: 300, height: 70, fontSize: 30 }}>Edit</Button>
                  </div>

              </div>}
              </ContentContainer >
          </Layout>
        </Layout>
      </Container >
    );
  }
}

export default UserInfo;