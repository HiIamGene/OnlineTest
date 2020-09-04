import {faPencilAlt , faTrash , faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const PersonalDetail = ({ label , value}) => (
    <div className="personald-containerPersonalDetail">
        
            <p className="personald-labelPersonalDetail cloud text-gray-2">{label}</p>
            <p className="personald-valuePersonalDetail cloud">{value}</p>
    </div>
)

export default PersonalDetail