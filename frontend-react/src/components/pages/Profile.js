import React, { Component } from 'react';
import {connect} from "react-redux";

const mapStateToProps = state => (state);

class Profile extends Component{
    render() {
        return (
            <div>
                <h3>Пользователь: { this.props.userReducer.userData.username }</h3>
                <p>Это главная страница</p>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Profile);
