import React, {Component} from 'react';

import {Link} from "react-router-dom";

import {
    Menu
} from 'semantic-ui-react';

import RouterList from './../../RouterList';
import {connect} from "react-redux";


const mapStateToProps = state => (state);

const mapDispatchToProps = dispatch => ({
    removeToken: (payload) => dispatch({ type:'REMOVE_USER_TOKEN', payload })
});



class MainMenu extends Component {


    render() {
        // const activeItem = 'friends';
        const userExit = () => {
            this.props.removeToken('remove token');
        };

        const btnRight = () => {
            if (this.props.userReducer.userToken) {
                return [
                    {
                        jsx: (
                            <Link to={ RouterList.register.path } key={1}>
                                <Menu.Item
                                    link
                                    position='right'
                                    color={'blue'}
                                    active={ true }
                                >{ this.props.userReducer.userData.username }</Menu.Item>
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
                                <Link to={ RouterList.homepage.path } key={1}>
                                    <Menu.Item
                                        link
                                    >хело</Menu.Item>
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

export default  connect(mapStateToProps, mapDispatchToProps)(MainMenu);