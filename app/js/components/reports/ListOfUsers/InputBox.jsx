import React, { Component } from 'react';
import './InputBox.css';


/**
 * This component will render the input div which appear at the top of the page
 * 
 * @input: Boolean
 * @desc: Toogle button to decide whether to 
 *         |-show deleted users - 1
 *         |-active users - 0
 */
class InputBox extends Component {


    render() {
        return (
            <div className="inputBoxWrapper">
                <label className="textLabel">Show deleted users: </label>
                <div className="toggleContainer">
                    <label className="switch">
                        <input type="checkbox" onChange = {this.props.listener}/>
                        <span className="slider round"></span>
                    </label>
                </div>
            </div>);
    }
}


export default InputBox;