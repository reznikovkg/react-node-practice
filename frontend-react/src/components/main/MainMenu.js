import React, {Component} from 'react';

import { Link, withRouter } from "react-router-dom";

import {
    Menu
} from 'semantic-ui-react';

import RouterList from './../../RouterList';
import {connect} from "react-redux";
import Cookies from 'js-cookie';

const mapStateToProps = state => (state);

const mapDispatchToProps = dispatch => ({
    removeToken: (payload) => dispatch({ type:'REMOVE_USER_TOKEN', payload })
});



class MainMenu extends Component {


    render() {
        // const activeItem = 'friends';
        const userExit = () => {
            this.props.removeToken('remove token');
            Cookies.set('user_token','',{expires: -1});
            this.props.history.push('/');
        };

        const btnRight = () => {
            if (this.props.userReducer.userToken) {
                return [
                    {
                        jsx: (
                            <Link to={ RouterList.profile.path } key={1}>
                                <Menu.Item
                                    link
                                    position='right'
                                    style={{textTransform: 'uppercase'}}
                                >
                                    <span>{ this.props.userReducer.userData.username }</span>
                                </Menu.Item>
                            </Link>
                        )
                    },
                    {
                        jsx: (
                            <Menu.Item
                                key={2}
                                link
                                color={'red'}
                                active={ true }
                                onClick={ userExit }
                            >Выйти</Menu.Item>
                        )
                    }
                ]
            } else {
                return [
                    {
                        jsx: (
                            <Link to={ RouterList.register.path } key={1}>
                                <Menu.Item
                                    link
                                    position='right'
                                    color={'blue'}
                                    active={ true }
                                >Регистрация</Menu.Item>
                            </Link>
                        )
                    },
                    {
                        jsx: (
                            <Link to={ RouterList.login.path } key={2}>
                                <Menu.Item
                                    color={'green'}
                                    active={ true }
                                >Авторизация</Menu.Item>
                            </Link>
                        )
                    }
                ]
            }
        };

        const btnLeft = () => {

            if (!this.props.userReducer.userToken) {
                return [];
            }

            switch (this.props.userReducer.userData.type) {
                case 'admin':
                    return [
                        {
                            jsx: (
                                <Link to={ RouterList.places.path } key={1}>
                                    <Menu.Item
                                        link
                                    >Список мест</Menu.Item>
                                </Link>
                            )
                        },
                        {
                            jsx: (
                                <Link to={ RouterList.users.path } key={2}>
                                    <Menu.Item
                                        link
                                    >Список пользователей</Menu.Item>
                                </Link>
                            )
                        }
                    ];
                case 'business':
                    return [
                        {
                            jsx: (
                                <Link to={ RouterList.places.path } key={1}>
                                    <Menu.Item
                                        link
                                    >Мой список мест</Menu.Item>
                                </Link>
                            )
                        }
                    ];
                case 'default':
                    return [
                        {
                            jsx: (
                                <Link to={ RouterList.places.path } key={1}>
                                    <Menu.Item
                                        link
                                    >Список мест</Menu.Item>
                                </Link>
                            )
                        }
                    ];
                default:
                    return [];
            }
        };


        return (
            <div>
                <Menu fixed={'top'} inverted>
                    <Link to={ RouterList.homepage.path }>
                        <Menu.Item
                            link
                        >Главная</Menu.Item>
                    </Link>

                    {
                        btnLeft().map( btn => (btn.jsx) )
                    }

                    <Menu.Item
                        position={'right'}
                        style={{ opacity: 0 }}
                    >/</Menu.Item>

                    {
                        btnRight().map( btn => (btn.jsx) )
                    }
                </Menu>
            </div>
        );
    }
}

export default  withRouter(connect(mapStateToProps, mapDispatchToProps)(MainMenu));