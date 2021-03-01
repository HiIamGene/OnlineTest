import React, { useState } from 'react';
//import instance from '../constants/action.js';
import { connect } from 'react-redux';
const mapStateToProps = state  => {
    return {
        count: state.counters.count,
        value: state.counters.value

    };
};
const mapDispatchToProps = dispatch => {
    return {
        handleIncrementClick: () => dispatch({ type: 'INCREMENT' }),
        handleDecrementClick: () => dispatch({ type: 'DECREMENT' }),
        handleSetdata: (value) => dispatch({ 
            type: "change",
            value: value })
    }
};
function Example(props) {
    
    return (
        <div className="container">
            <div className="columns column is-12">
                <h1>Counter :{props.count}</h1>
                <h1>Value :{props.value}</h1>
            </div>
            <input onChange={e=>props.handleSetdata(e.target.value)}></input>
            <button onClick={props.handleDecrementClick}>Decrement</button>
            <button onClick={props.handleIncrementClick}>Increment</button>
        </div>
    )

}
//const AppWithConnect = connect(mapStateToProps)(Example)
export default connect(mapStateToProps, mapDispatchToProps)(Example)