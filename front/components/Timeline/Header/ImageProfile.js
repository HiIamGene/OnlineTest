import React from "react"
import { WIDTH_BREAKPOINT } from "../../../constant/responsive"
import { DEFAULT_AVATAR_URL } from "../../../constant";
import { imageWithToken } from "../../../utils/image";

const ImageProfile = ({ className = "", onChangeProfileClick, url, anotherProfile }) => (
    <div className={"timeline-img-profile " + className}> {!anotherProfile ?
        <div className={"timeline-change-profile timeline-hide-mobile2"} onClick={onChangeProfileClick}>

            <i className="fas fa-camera"></i>

        </div>
        :
        null
    }
        <img src={url ? imageWithToken(url) : DEFAULT_AVATAR_URL} alt="" className={"image"} />
    </div>
)

export default ImageProfile
