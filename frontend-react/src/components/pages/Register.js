import React, { Component } from 'react';

import {
    Segment,
    Grid,
    Header,
    Form,
    Button
} from 'semantic-ui-react';

import axios from 'axios';
import Cookies from 'js-cookie';
import ApiList from './../../ApiList';

import  { connect } from 'react-redux';

const mapStateToProps = state => ({
    ...state
});
const mapDispatchToProps = dispatch => ({

});

class Register extends Component{
    constructor(props) {
        super(props);

        this.state = {
            step: 0,
            form: {
                username: '',
                email: '',
                password: '',

            }
        };
    }

    toRegister = () => {
        axios.get(`${ApiList.auth_login.path}`, {
            params: {
                username: this.state.form.username,
                password: this.state.form.password
            }
        })
            .then((response) => {
                Cookies.set('user_token', response.data.token, { expires: 7 });
                this.props.setToken(response.data.token);
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
        if (this.props.userReducer.userToken) {
            this.props.history.push('/');
        }

        const steps = [
            {
                jsx: (
                    <Form>
                        <Form.Field>
                            <label>Логин</label>
                            <input placeholder='Введите логин' onChange={ this.handleChangeFormUsername }/>
                        </Form.Field>
                        <Form.Field>
                            <label>Email</label>
                            <input placeholder='Введите email' onChange={ this.handleChangeFormUsername }/>
                        </Form.Field>
                        <Form.Field>
                            <label>Пароль</label>
                            <input placeholder='Введите пароль' type='password' onChange={ this.handleChangeFormPassword }/>
                        </Form.Field>
                        <Form.Field>
                            <label>Бизнес-аккаунт</label>
                            <input placeholder='Введите пароль' type='password' onChange={ this.handleChangeFormPassword }/>
                        </Form.Field>
                    </Form>
                )
            },
            {
                jsx: (
                    <Form>
                        <Form.Field>
                            <label>Имя</label>
                            <input placeholder='Введите имя' onChange={ this.handleChangeFormUsername }/>
                        </Form.Field>
                        <Form.Field>
                            <label>Телефон</label>
                            <input placeholder='Введите пароль' type='password' onChange={ this.handleChangeFormPassword }/>
                        </Form.Field>
                        <Form.Field>
                            <label>Дата рождения</label>
                            <input placeholder='Введите пароль' type='password' onChange={ this.handleChangeFormPassword }/>
                        </Form.Field>
                        <Form.Field>
                            <label>Пол</label>
                            <input placeholder='Введите пароль' type='password' onChange={ this.handleChangeFormPassword }/>
                        </Form.Field>
                        <Form.Field>
                            <label>Место проживания</label>
                            <input placeholder='Введите пароль' type='password' onChange={ this.handleChangeFormPassword }/>
                        </Form.Field>
                        <Form.Field>
                            <label>О себе</label>
                            <input placeholder='Введите пароль' type='password' onChange={ this.handleChangeFormPassword }/>
                        </Form.Field>
                        <Form.Field>
                            <label>Фото</label>
                            <input placeholder='Введите пароль' type='password' onChange={ this.handleChangeFormPassword }/>
                        </Form.Field>
                    </Form>
                )
            },
            {
                jsx: (
                    <Form>
                        Проверьте введенные данные
                        <Form.Field>
                            <label>Логин</label>
                            <input placeholder='Введите логин' onChange={ this.handleChangeFormUsername }/>
                        </Form.Field>
                    </Form>
                )
            }
        ];

        return (
            <div>
                <Grid centered columns={2}>
                    <Grid.Column>
                        <Segment color='blue'>
                            <Header>Регистрация</Header>
                            {
                                steps[this.state.step].jsx
                            }
                            <Button type='submit' color='green' onClick={ () =>{ this.setState({step:this.state.step + 1})} }>Дальше</Button>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
