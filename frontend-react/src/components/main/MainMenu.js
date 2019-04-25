import React, {Component} from 'react';

import {Link} from "react-router-dom";

import {
    Menu
} from 'semantic-ui-react';

import RouterList from './../../RouterList';

class MainMenu extends Component {
    render() {
        // const activeItem = 'friends';

        return (
            <Menu fixed={'top'} inverted>
                <Link to={ RouterList.homepage.path }>
                    <Menu.Item
                        link
                    >Главная</Menu.Item>
                </Link>

                <Menu.Item
                    position={'right'}
                    style={{ opacity: 0 }}
                >/</Menu.Item>

                <Link to={ RouterList.register.path }>
                    <Menu.Item
                        link
                        position='right'
                        color={'blue'}
                        active={ true }
                    >Регистрация</Menu.Item>
                </Link>

                <Link to={ RouterList.login.path }>
                    <Menu.Item
                        color={'green'}
                        active={ true }
                    >Авторизация</Menu.Item>
                </Link>
            </Menu>
        );
    }
}

export default MainMenu;