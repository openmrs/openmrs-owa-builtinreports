import React, { Component } from 'react';
import './DataNotFound.css';

class InfoMessage extends Component {


    render() {
        return (
            <div className="InfoMessageWrapper">
                <div className="attentionSign">
                    <img src="img/info.png" width="80"/>
                </div>
                <div>
                    Please select { this.props.componentName != null && <span>{this.props.componentName}</span>}
                </div>

            </div>
        );
    }

}

export default InfoMessage;