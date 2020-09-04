import { faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export default ({levelText , checked , index , onClick}) => (
    <div onClick={onClick} className="containerLanguageElement">
        <p style={{padding :0 , margin : 0}}>{levelText}</p>
        {
            checked != index ? 
            <div style={{
                width :"24px",
                height : "24px",
                backgroundColor : "white",
                border : "1px solid black",
                borderRadius : "50%",
                textAlign : "center"
            }}>            
            </div>
            :
            <FontAwesomeIcon 
                style={{
                    border : "1px solid black",
                    borderRadius : "50%",
                    width : "24px",
                    height  :"24px",
                    backgroundColor :"black"
                }}
                color={"rgb(72,101,154)"} icon={faCheckCircle} size="lg" fixedWidth  
            />
        }
       
       
        <style jsx>{`
            .containerLanguageElement{
                display : flex;
                textAlign : center ; 
                background-color : rgb(240,240,240); 
                padding : 10px 0px;
                justify-content : center;
                align-items : center;
                flex-direction : column;
                cursor : pointer;
            }
        `}</style>
    </div>
)