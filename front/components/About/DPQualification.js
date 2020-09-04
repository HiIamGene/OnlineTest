import React from 'react'
import Detail from './DPQualificationDetail'
import { connect } from 'react-redux';
import { fetchAboutDp } from "../../services/aboutService";
import { setAboutDp } from "../../redux/actions/aboutAction";
import { API_USER_ANOTHERPROFILE_V010001 } from '../../constant/ENV'
import axios from 'axios'
export default connect(store => {
    return {
        dps: store.aboutReducer.dps,
        dp: store.aboutReducer.dp
    }
}, { setAboutDp })(class DPQualification extends React.Component {
    constructor(props) {
        super(props)
    }


    async componentDidMount() {
        if (this.props.anotherProfile) {
            const response = await axios.get(API_USER_ANOTHERPROFILE_V010001+this.props.anotherProfileId)
            const { data } = response
            const { payload } = data
            this.props.setAboutDp(payload.dps)
        }
        else {
            this.props.setAboutDp(await fetchAboutDp());
        }
    }

    render() {
        const anotherProfile = this.props.anotherProfile
        return (
            <div>
                <Detail
                    title="DP Basic / Introduction"
                    mode={"add"} type={"BASIC"}
                    plusText={"Add More DP Basic / Introduction"}
                    data={"BASIC" in this.props.dps ? this.props.dps["BASIC"] : []
                    }
                    anotherProfile={anotherProfile}
                />
                <br />
                <Detail
                    title="DP Advance / Simulator"
                    mode={"add"} type={"ADVANCE"}
                    plusText={"Add More DP Advance / Simulator"}
                    data={"ADVANCE" in this.props.dps ? this.props.dps["ADVANCE"] : []}
                    anotherProfile={anotherProfile}
                />
                <br />
                <Detail
                    title="DP License Limited"
                    mode={"add"} type={"LICENSE-LIMITED"}
                    plusText={"Add More DP License Limited"}
                    data={"LICENSE-LIMITED" in this.props.dps ? this.props.dps["LICENSE-LIMITED"] : []}
                    anotherProfile={anotherProfile}
                />
                <br />
                <Detail
                    title="DP License Unlimited"
                    mode={"add"} type={"LICENSE-UNLIMITED"}
                    plusText={"Add More DP License Unlimited"}
                    data={"LICENSE-UNLIMITED" in this.props.dps ? this.props.dps["LICENSE-UNLIMITED"] : []}
                    anotherProfile={anotherProfile}
                />
                <br />
                <Detail
                    title="DP Logbook IMCA/NI"
                    mode={"add"} type={"LOGBOOK"}
                    plusText={"Add More DP Logbook IMCA/NI"}
                    data={"LOGBOOK" in this.props.dps ? this.props.dps["LOGBOOK"] : []}
                    anotherProfile={anotherProfile}
                />
                <br />
                <Detail
                    title="DP Maintenance 1"
                    mode={"add"} type={"MAINTENANCE-1"}
                    plusText={"Add More Maintenance 1"}
                    data={"MAINTENANCE-1" in this.props.dps ? this.props.dps["MAINTENANCE-1"] : []}
                    anotherProfile={anotherProfile}
                />
                <br />
                <Detail
                    title="DP Maintenance 2"
                    mode={"add"} type={"MAINTENANCE-2"}
                    plusText={"Add More Maintenance 2"}
                    data={"MAINTENANCE-2" in this.props.dps ? this.props.dps["MAINTENANCE-2"] : []}
                    anotherProfile={anotherProfile}
                />
                <br />
                <Detail
                    title="DP Refresher"
                    mode={"add"} type={"REFRESHER"}
                    plusText={"Add More Refresher"}
                    data={"REFRESHER" in this.props.dps ? this.props.dps["REFRESHER"] : []}
                    anotherProfile={anotherProfile}
                />


            </div>
        )
    }
});