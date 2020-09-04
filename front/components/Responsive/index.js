import MediaQuery  from 'react-responsive';
import React from "react"
import {WIDTH_BREAKPOINT} from "../../constant/responsive"

export const Desktop = props => <MediaQuery {...props} minDeviceWidth={WIDTH_BREAKPOINT}/>;
export const Mobile = props => <MediaQuery {...props} maxDeviceWidth={WIDTH_BREAKPOINT-1} />;
