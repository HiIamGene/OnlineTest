import {faPlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default ({text , onClick}) => (
    <div onClick={onClick} className="about-plus-button1" >
        <div className="plusIconEducation" >
            <FontAwesomeIcon color={"rgb(60,102,180)"} icon={faPlus} fixedWidth/>
        </div>
        <div>
            <p className={"about-plus-button2 cloud"}>{text}</p>
        </div>
    </div>
)