import React from "react"
import { connect } from 'react-redux';
const mapStateToProps = state => {
    return {
        headers: state.createTest.headers,
        questionList: state.createTest.questionList,

    };
};
//<div dangerouslySetInnerHTML={{__html: props.preview}} />
const mapDispatchToProps = dispatch => {
    return {
        setHeader: (value) => dispatch({ type: 'setStateHeaders', headers: value }),
    };
}

function Preview(props) {
    return (
        <div>
            {Object.entries(props.headers).map(([columnId, column], index) => {
                < div >
                    {props.headers[columnId].name}
                    {column.items.map((item, index) => {
                        <div>
                            {index}
                        </div>
                    })}
                </div>

            })}
        </div >
    )
}


export default connect(mapStateToProps, mapDispatchToProps)(Preview)