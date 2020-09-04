import {faPencilAlt , faTrash , faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default ({label , number}) => (
    <div className="containerSkillDetail">
        <p style={{padding : 0 , margin : 0}}>{label}</p>
        <div style={{
                display : "flex",
                alignItems : "center"
            }} >
                <FontAwesomeIcon 
                    style={{
                        border : "1px solid black",
                        borderRadius : "50%",
                        width : "13px",
                        height  :" 13px",
                        backgroundColor :"black"
                    }}
                    color={"rgb(185,91,95)"} icon={faCheckCircle} size="lg" fixedWidth  
                />
                <p style={{color : "rgb(185,91,95)" , fontWeight : "bold" , padding : "0 " , margin : "0 7px"}}>{number}</p>
            </div>
        <style jsx>{`
            .containerSkillDetail{
                display : flex;
                justify-content :space-between;
            }
        `}</style>
    </div>
)