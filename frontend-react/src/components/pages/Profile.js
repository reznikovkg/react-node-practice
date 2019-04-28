import React, { Component } from 'react';
import {connect} from "react-redux";

const mapStateToProps = state => (state);

class Profile extends Component{
    typeUser = () => {
        switch (this.props.userReducer.userData.type) {
            case 'business':
                return 'Бизнес';
            case 'admin':
                return 'Админ';
            case 'default':
                return 'Обычный';
            default:
                return 'Да что ты такое?!'
        }
    }

    render() {
        return (
            <div>
                <h3>Пользователь: { this.props.userReducer.userData.username }</h3>
                <p>Тип аккаунта: <b>{ this.typeUser() }</b></p>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Profile);
