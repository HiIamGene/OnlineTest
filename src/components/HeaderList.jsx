import React, { useState, useEffect } from "react"
import { Button, Row, Col, Empty } from 'antd';
import history from "../utils/history";
import { connect } from 'react-redux';
const mapStateToProps = state => {
    return {
        headerlist: state.scoreTest.headerlist,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setHeader: (value) => dispatch({ type: 'setHeader', header: value }),

    };
}
function HeaderList(props) {
    const onClickTest =(e)=>{
        props.setHeader(e)
        history.push(`/Teacher/ScoreStudent`)
    }
    const classlistOut = () => {
        if (props.headerlist === null) {
            return <Empty style={{
                marginLeft: "auto",
                marginRight: "auto"
            }}
                description={false} />
        }
        else {
            return props.headerlist.map((e, index) =>

                    <Button onClick={()=>onClickTest(e)} type="primary" htmlType="submit" className="login-form-button" style={{ fontSize: 30, background: '#F4A940', color: '#FFFFFF', width: 1400, height: 126, marginTop: 30, textAlign: 'left' }}>
                        <Row type="flex" justify="space-around">
                            <Col span={24}>{e.name}</Col>

                        </Row>
                    </Button>

            )
        }
    }

    return (
        classlistOut()

    )

}



export default connect(mapStateToProps, mapDispatchToProps)(HeaderList)