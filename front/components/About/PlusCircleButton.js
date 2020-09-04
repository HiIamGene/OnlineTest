import {faPlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default ({index,onEditMode , textIconButton}) => (
    <div onClick={()=>onEditMode(index)} className="containerIdentityDetailPlus">
        <div className="plusIconEducation" >
            <FontAwesomeIcon color={"rgb(60,102,180)"} icon={faPlus} fixedWidth/>
        </div>      
        <p style={{padding : "0" , margin : "0px 10px" , fontSize :"12.8px" , color : "rgb(60,102,180)"}}>{textIconButton}</p>
        <style jsx>{`
         .containerIdentityDetailPlus{
            display : flex;
            align-items : center;
            cursor : pointer;
            
        }
        .containerIdentityDetailPlusIcon{
            border : 1px solid rgb(60,102,180);
            border-radius : 50%;
            display : inline-flex;
            align-items : center;
            justify-content : center;
            width :25px;
            height : 25px;
            margin  :10px 0px;
            
        }
        `}</style>           
    </div>
)