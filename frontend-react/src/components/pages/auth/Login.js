import React, { Component } from 'react';

import { withRouter } from "react-router-dom";

import {
    Segment,
    Grid,
    Header,
    Form,
    Button
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
            form: {
                username: '',
                password: ''
            }
        };
    }

    toLogin = () => {
        axios.get(`${ApiList.auth_login}`, {
            params: {
                username: this.state.form.username,
                password: this.state.form.password
            }
        })
            .then((response) => {
                Cookies.set('user_token', response.data.token, { expires: 7 });
                this.props.setToken(response.data.token);
                this.props.history.push('/profile');

            })
            .catch((error) => {
                console.log('error: ', error);
                this.props.setToken(null);
            })
    };

    handleChangeFormUsername = (e) => {
        this.setState({ form: {
            username: e.target.value,
            password: this.state.form.password
        } })
    };

    handleChangeFormPassword = (e) => {
        this.setState({ form: {
            username: this.state.form.username,
            password: e.target.value
        } })
    };

    render() {

        return (
            <div>
                <Grid centered columns={2}>
                    <Grid.Column>
                        <Segment color='green'>
                            <Header>Авторизация</Header>
                            <Form>
                                <Form.Field>
                                    <label>Логин</label>
                                    <input placeholder='Введите логин' onChange={ this.handleChangeFormUsername }/>
                                </Form.Field>
                                <Form.Field>
                                    <label>Пароль</label>
                                    <input placeholder='Введите пароль' type='password' onChange={ this.handleChangeFormPassword }/>
                                </Form.Field>
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
