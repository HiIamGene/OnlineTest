import React from "react";
import Detail from "./Detail";
import HealthEdit from "./HealthEdit";
import { Collapse } from "reactstrap";
import PlusButton from "./PlusButton";
import axios from "axios";
import dayjs from 'dayjs'
import _ from 'lodash'
import { compose } from 'recompose'
import { withToastManager } from 'react-toast-notifications';
import { withNamespaces } from "../../lib/i18n"
import { _error_handler } from "../../utils/errorHandler";
import { API_USER_ANOTHERPROFILE_V010001,API_USER_PROFILE_HEALTH, API_UPLOAD } from '../../constant/ENV'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
export default compose(withNamespaces("health"), withToastManager)(class healthData extends React.Component {
  static async getInitialProps(ctx) {
    return {
      namespacesRequired: ['health'],
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      isMount: false,
      editMode: -1,
      healthData: {
        medicalNo: "",
        issueBy: "",
        issueDate: "",
        expDate: "",
        healthId: "",
        attachDocument: []
      },
      data: [],
      errors: {}
    };
  }

  onChange(e) {
    const { target } = e
        const { name, value } = target
        if(name === 'medicalNo') {
            for(let i = 0; i < value.length; i++) {
                if(value.charAt(i) < '0' || value.charAt(i) > '9') {
                    return false
                }
            }
        }
    this.setState({
      healthData: {
        ...this.state.healthData,
        [e.target.name]: e.target.value
      }
    });
  }
  componentDidUpdate(prevProps) {

    // if(prevProps.data !== this.props.data){

    //   const data = !_.isEmpty(this.props.data) ? this.props.data.map(data=>({
    //     ...data,
    //     medicalNo : data.medicalNo,
    //     healthId : data.healthId,
    //     expDate : data.expDate,
    //     issueDate : data.issueDate,
    //     issueBy : data.issueBy
    //   })) : []
    //   this.setState({
    //     data : [
    //       ...this.state.data,
    //       ...data
    //     ]
    //   })
    // }
  }
  componentDidMount() {
    // const data = !_.isEmpty(this.props.data) ? this.props.data.map(data=>({
    //   ...data,
    //   medicalNo : data.medicalNo,
    //   healthId : data.healthId,
    //   expDate : data.expDate,
    //   issueDate : data.issueDate,
    //   issueBy : data.issueBy
    // })) : []
    this.fetchProfileHealth()
    this.setState({
      isMount: true,
      // data : [
      //   ...this.state.data,
      //   ...data
      // ]
    });
  }
  async fetchProfileHealth() {
    try {
      if (this.props.anotherProfile) {
        const response = await axios.get(API_USER_ANOTHERPROFILE_V010001+this.props.anotherProfileId)
        const { data } = response
        const { payload } = data
        const newData = payload.healths.map(value => (
          {
            healthId: value.healthId,
            medicalNo: value.medicalNo,
            issueBy: value.issueBy,
            issueDate: value.issueDate,
            expDate: value.expDate,
            attachDocument: value.documentations || []
          }
        ))

      }
      else {
        const response = await axios.get(API_USER_PROFILE_HEALTH)
        const { data } = response
        const { payload } = data

        const newData = payload.map(value => (
          {
            healthId: value.healthId,
            medicalNo: value.medicalNo,
            issueBy: value.issueBy,
            issueDate: value.issueDate,
            expDate: value.expDate,
            attachDocument: value.documentations || []
          }
        ))

        this.setState({
          data: newData
        })
        this.props.onChange("health", newData.length)
      }

    } catch (err) {
      _error_handler(this.props.toastManager, err)
    }
  }
  async onUploadImageForProfile(e, attribute) {
    try {
      let files = Array.from(e.target.files)
      const name = e.target.name
      files.map((file) => {
        var reader = new FileReader();
        reader.onload = async (upload) => {



          const inputData = {
            file: upload.target.result,
            path: "certificate/health",

            device: "WWW"
          }
          const response = await axios.post(API_UPLOAD + "/health", { ...inputData })
          const { data } = response
          const { payload } = data

          // console.log('payload',payload)
          this.setState({
            [attribute]: {
              ...this.state[attribute],
              ["attachDocument"]: [...this.state[attribute]["attachDocument"],
              { imageUrl: payload.url, name: payload.name }
              ]
            }
          })
        }

        reader.readAsDataURL(file);



      })
    }
    catch (err) {
      _error_handler(this.props.toastManager, err)
    }
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.state.editMode == 1) {
      const errors = this.validate(this.state.healthData)
      this.setState({ errors })
      const attachDocument = !_.isUndefined(this.state.healthData) ? this.state.healthData.attachDocument.map(data => (
        data.imageUrl || data.url
      )) : []
      if (Object.keys(errors).length == 0) {

        const healthData = {
          device: " ",
          medicalNo: this.state.healthData.medicalNo,
          issueBy: this.state.healthData.issueBy,
          issueDate: dayjs(this.state.healthData.issueDate).format("YYYY-MM-DD"),
          expDate: dayjs(this.state.healthData.expDate).format("YYYY-MM-DD"),
          attachDocumentation: attachDocument
        };

        axios
          .put(`${API_USER_PROFILE_HEALTH}/${this.state.healthData.healthId}`, healthData)
          .then(res => {

            const { data } = res
            const { payload } = data
            const index = this.state.data.findIndex(data => data.healthId == this.state.healthData.healthId)
            this.setState({
              editMode: -1,
              // data : [
              //   ...this.state.data,
              //   {
              //     expDate :payload.expDate,
              //     healthId : payload.healthId,
              //     issueBy : payload.issueBy,
              //     issueDate : payload.issueDate,
              //     medicalNo : payload.medicalNo
              //   }
              // ],
              healthData: {
                medicalNo: "",
                issueBy: "",
                issueDate: "",
                expDate: "",
                healthId: ""
              },
            })

            this.fetchProfileHealth()
            this.props.toastManager.add("Saved Successfully", {
              appearance: "success",
              autoDismiss: true
            });

          })
          .catch(err => {
            _error_handler(this.props.toastManager, err)
            // let messages = err.response.data.payload;
            // Object.keys(messages).map(key => {
            //   this.props.toastManager.add(messages[key], {
            //     appearance: "error",
            //     autoDismiss: true
            //   });
            // });
          });

      }
    } else {

      const errors = this.validate(this.state.healthData)
      this.setState({ errors })

      if (Object.keys(errors).length == 0) {
        const attachDocument = !_.isUndefined(this.state.healthData) ? this.state.healthData.attachDocument.map(data => (
          data.imageUrl || data.url
        )) : []
        const healthData = {
          medicalNo: this.state.healthData.medicalNo,
          issueBy: this.state.healthData.issueBy,
          issueDate: dayjs(this.state.healthData.issueDate).format("YYYY-MM-DD"),
          expDate: dayjs(this.state.healthData.expDate).format("YYYY-MM-DD"),
          attachDocumentation: attachDocument
        };
        axios
          .post(API_USER_PROFILE_HEALTH, healthData)
          .then(res => {

            const { data } = res
            const { payload } = data

            this.setState({
              editMode: -1,
              // data : [
              //   ...this.state.data,
              //   {
              //     expDate :payload.expDate,
              //     healthId : payload.healthId,
              //     issueBy : payload.issueBy,
              //     issueDate : payload.issueDate,
              //     medicalNo : payload.medicalNo
              //   }
              // ]

            })
            this.fetchProfileHealth()
            this.props.onChange("health", this.state.data.length)
            this.props.toastManager.add("Saved Successfully", {
              appearance: "success",
              autoDismiss: true
            });
          })
          .catch(err => {
            _error_handler(this.props.toastManager, err)
          });

      }
    }
  }
  onChangeDate(name, val, attribute) {
    this.setState({
      [attribute]: {
        ...this.state[attribute],
        [name]: val
      }
    })
  }
  validate(data) {
    let errors = {}

    if (_.isNull(data.issueDate) || data.issueDate === "") errors.issueDate = this.props.t("errorHealthDate")
    if (_.isNull(data.expDate) || data.expDate === "") errors.expDate = this.props.t("errorHealthDate")

    return errors
  }
  async onDelete(healthId = this.state.healthData.healthId) {
    // console.log(healthId)
    try {
      const response = await axios.delete(`${API_USER_PROFILE_HEALTH}/${healthId}`)
      const index = this.state.data.findIndex(data => data.healthId == healthId)
      this.setState({
        data: [
          ...this.state.data.slice(0, index),
          ...this.state.data.slice(index + 1)
        ],
        editMode: -1,
        healthData: {
          medicalNo: "",
          issueBy: "",
          issueDate: "",
          expDate: "",
          healthId: ""
        },
      })
      this.props.onChange("health", this.state.data.length)
    } catch (err) {
      _error_handler(this.props.toastManager, err)
    }
  }
  render() {
    const anotherProfile = this.props.anotherProfile
    const { editMode, errors, data, healthData } = this.state;
    const { t } = this.props
    // console.log(healthData)
    // console.log(data)
    return (
      <div>
        {anotherProfile ?

          <div>
            {
              editMode == -1 && data.map((value, key) => (

                <Detail
                  key={key}
                  certificate={"health"}
                  data={{

                    title: value.medicalNo,
                    firstSubtitle: value.issueBy,
                    issueDate: value.issueDate,
                    expiryDate: value.expDate,
                  }}
                  onDelete={() => this.onDelete(value.healthId)}
                  onEditMode={(data) => this.setState({
                    editMode: 1,
                    healthData: {
                      healthId: value.healthId,
                      medicalNo: value.medicalNo,
                      issueBy: value.issueBy,
                      issueDate: (value.issueDate),
                      expDate: (value.expDate),
                      attachDocument: value.attachDocument
                    }
                  })} />
              ))
            }
          </div>
          :
          <div>
            {editMode == -1 && _.isEmpty(data) ? (
              <div>

                <PlusButton
                  onClick={() => this.setState({ editMode: 0, healthData: { medicalNo: "", issueBy: "", issueDate: "", expDate: "", healthId: "", attachDocument: [] } })}
                  text={t("addYourHealthButton")}
                />

              </div>
            ) : (
                ""
              )}
            {editMode == -1 && !_.isEmpty(data) ? (
              <div>
                <PlusButton
                  onClick={() => this.setState({ editMode: 0, healthData: { medicalNo: "", issueBy: "", issueDate: "", expDate: "", healthId: "", attachDocument: [] } })}
                  text={t("addYourHealthButton")}
                />

              </div>
            ) : (
                ""
              )}
            {
              editMode == -1 && data.map((value, key) => (

                <Detail
                  key={key}
                  certificate={"health"}
                  data={{

                    title: value.medicalNo,
                    firstSubtitle: value.issueBy,
                    issueDate: value.issueDate,
                    expiryDate: value.expDate,
                  }}
                  onDelete={() => this.onDelete(value.healthId)}
                  onEditMode={(data) => this.setState({
                    editMode: 1,
                    healthData: {
                      healthId: value.healthId,
                      medicalNo: value.medicalNo,
                      issueBy: value.issueBy,
                      issueDate: (value.issueDate),
                      expDate: (value.expDate),
                      attachDocument: value.attachDocument
                    }
                  })} />
              ))
            }
            {!this.state.isMount ? null : <div>
              <Collapse isOpen={editMode == 0}>
                <HealthEdit
                  t={t}
                  onUploadImageForProfile={(e) => this.onUploadImageForProfile(e, "healthData")}
                  onChangeDate={(name, val) => this.onChangeDate(name, val, "healthData")}
                  errors={errors}
                  editMode={editMode}
                  onSubmit={(e) => { this.onSubmit(e); }}
                  onChange={this.onChange.bind(this)}
                  onEditMode={() => this.setState({ editMode: -1 })}
                  healthData={healthData}
                />
              </Collapse>

              <Collapse isOpen={editMode == 1}>

                <HealthEdit
                  t={t}
                  onUploadImageForProfile={(e) => this.onUploadImageForProfile(e, "healthData")}
                  onChangeDate={(name, val) => this.onChangeDate(name, val, "healthData")}
                  errors={errors}
                  editMode={editMode}
                  onDelete={this.onDelete.bind(this)}
                  onSubmit={(e) => { this.onSubmit(e); }}
                  onChange={this.onChange.bind(this)}
                  onEditMode={() => this.setState({ editMode: -1 })}
                  healthData={healthData}
                />
              </Collapse>
            </div>}

          </div>
        }
      </div>

    );
  }
})
