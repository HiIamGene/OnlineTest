import React from "react"


function Preview(props) {
    return(<div dangerouslySetInnerHTML={{__html: props.preview}} />)
}


export default Preview