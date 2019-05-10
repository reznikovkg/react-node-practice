import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

import {
    Segment,
    Grid,
    Header,
    Form,
    Button,
    Label,
    Message
} from 'semantic-ui-react';

import axios from 'axios';
import Cookies from 'js-cookie';
import ApiList from '../../../ApiList';

import  { connect } from 'react-redux';

const mapStateToProps = state => ({
    ...state
});
const mapDispatchToProps = dispatch => ({
    setToken: (payload) => dispatch({ type:'SET_USER_TOKEN', payload })
});

class Login extends Component{
    constructor(props) {
        super(props);

        if (this.props.userReducer.userToken) {
            this.props.history.push('/');
        }

        this.state = {
            formUsername: '',
            formPassword: '',

            validUsername: null,
            validPassword: null,

            statusUsername: null,
            statusPassword: null
        };
    }

    toLogin = () => {
        if ((!this.state.validUsername) || (!this.state.validPassword)) {
            this.checkValidUsername();
            this.checkValidPassword();
            return;
        }

        axios.get(`${ApiList.auth_login}`, {
            params: {
                username: this.state.formUsername,
                password: this.state.formPassword
            }
        })
            .then((response) => {
                Cookies.set('user_token', response.data.token, { expires: 7 });
                this.props.setToken(response.data.token);
                this.props.history.push('/profile');

            })
            .catch((error) => {
                this.setState({ error: error.response.data.error });
                this.props.setToken(null);
            })
    };

    viewStatusUsername = () => {
        if (this.state.validUsername === null) {
            return;
        }

        if (this.state.validUsername === false) {
            return (
                <Label basic color='red' pointing>
                    { this.state.statusUsername }
                </Label>
            );
        }
    };

    viewStatusPassword = () => {
        if (this.state.validPassword === null) {
            return;
        }

        if (this.state.validPassword === false) {
            return (
                <Label basic color='red' pointing>
                    { this.state.statusPassword }
                </Label>
            );

        }
    };

    viewError = () => {
        if (this.state.error) {
            return (
                <Form.Field>
                    <Message negative>
                        <Message.Header>Ошибка</Message.Header>
                        <p>{ this.state.error }</p>
                    </Message>
                </Form.Field>
            );

        }
    };

    checkValidUsername = () => {
        if (this.state.formUsername.length === 0) {
            this.setState({ validUsername: false, statusUsername: 'Логин не должен быть пустым' });
            return
        }

        if (/^[a-zA-Z0-9]+$/.test(this.state.formUsername)) {
            this.setState({ validUsername: true });
        } else {
            this.setState({ validUsername: false, statusUsername: 'Логин должен содержать только латинские буквы и цифры.' });
        }
    };

    checkValidPassword = () => {
        if (this.state.formPassword.length === 0) {
            this.setState({ validPassword: false, statusPassword: 'Пароль не должен быть пустым' });
            return
        }

        if (/^[a-zA-Z0-9*#!+]+$/.test(this.state.formPassword)) {
            this.setState({ validPassword: true });
        } else {
            this.setState({ validPassword: false, statusPassword: 'Пароль должен содержать только латинские буквы, цифры и символы: *, #, !, +.' });
        }
    };

    handleChangeFormUsername = (e) => {
        this.setState({ formUsername: e.target.value }, this.checkValidUsername);
    };

    handleChangeFormPassword = (e) => {
        this.setState({ formPassword: e.target.value }, this.checkValidPassword);
    };

    classNameFormUsername = () => {
        if (this.state.validUsername === false) {
            return 'error';
        }
    };

    classNameFormPassword = () => {
        if (this.state.validPassword === false) {
            return 'error';
        }
    };

    render() {

        return (
            <div>
                <Grid centered columns={2}>
                    <Grid.Column>
                        <Segment color='green'>
                            <Header>Авторизация</Header>
                            <Form>
                                <Form.Field className={ this.classNameFormUsername() }>
                                    <label>Логин</label>
                                    <input placeholder='Введите логин' onChange={ this.handleChangeFormUsername }/>
                                    {
                                        this.viewStatusUsername()
                                    }
                                </Form.Field>
                                <Form.Field className={ this.classNameFormPassword() }>
                                    <label>Пароль</label>
                                    <input placeholder='Введите пароль' type='password' onChange={ this.handleChangeFormPassword }/>
                                    {
                                        this.viewStatusPassword()
                                    }
                                </Form.Field>
                                {
                                    this.viewError()
                                }
                                <Button type='submit' color='green' onClick={ this.toLogin }>Войти</Button>
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
