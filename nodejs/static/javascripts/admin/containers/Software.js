import React, { Component } from 'react';
import { connect }          from 'react-redux';

class Platform extends Component {
    render() {
        let { software } = this.props;
        return (
            <div className="platform">
                <div className="platform-title">Platform Information</div>
                <div className="platform-info">
                    <span className="platform-label">Platform Name:</span>
                    <span>{software.name}</span>
                </div>
                <div className="platform-info">
                    <span className="platform-label">Platform Version:</span>
                    <span>{software.version}</span>
                </div>
                <div className="platform-info">
                    <span className="platform-label">Latest Version:</span>
                    <span></span>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        software: state.software
    };
}

export default connect(mapStateToProps)(Platform);