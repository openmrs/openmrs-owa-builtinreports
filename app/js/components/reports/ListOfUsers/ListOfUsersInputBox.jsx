import React, { Component } from 'react';
import './ListOfUsersInputBox.css';


/**
 * This component will render the input div which appear at the top of the page
 * 
 * @input: Boolean
 * @desc: Toogle button to decide whether to 
 *         |-show deleted users - 1
 *         |-active users - 0
 */
class ListOfUsersInputBox extends Component {


    render() {
        return (
            <div className="inputBoxWrapper">
                <div className="innerWrapper">
                    <label className="textLabel">Show deleted users: </label>
                    <div className="toggleContainerLOU">
                        <label className="switch">
                            <input type="checkbox" onChange={this.props.listener} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>
            </div>);
    }
}


export default ListOfUsersInputBox;