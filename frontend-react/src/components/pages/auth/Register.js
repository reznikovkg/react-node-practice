import React, { Component } from 'react';

import {
    Segment,
    Grid,
    Header,
    Form,
    Button,
    Checkbox,
    TextArea,
    Select
} from 'semantic-ui-react';

import axios from 'axios';

import ApiList from '../../../ApiList';

import  { connect } from 'react-redux';

import 'moment/locale/ru';

import {
    DateInput
} from 'semantic-ui-calendar-react';

import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';

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

            formUsername: '',
            formEmail: '',
            formPassword: '',
            formBusiness: false,

            formName: '',
            formPhone: '',
            formBirthday: '01-01-2019',
            formGender: '',
            formAddress: '',
            formAbout: '',
            formPhoto: ''
        };
    }

    toRegister = () => {
        axios.get(`${ApiList.auth_register}`, {
            params: {
                username: this.state.formUsername,
                password: this.state.formPassword,
                email: this.state.formEmail,
                business: this.state.formBusiness,

                name: this.state.formName,
                phone: this.state.formPhone,
                birthday: this.state.formBirthday,
                gender: this.state.formGender,
                address: this.state.formAddress,
                about: this.state.formAbout
            }
        })
            .then((response) => {
                console.log('register ok');

                // Cookies.set('user_token', response.data.token, { expires: 7 });
                this.setState({step: this.state.step + 1});
            })
            .catch((error) => {
                console.log('error: ', error);
            })
    };

    // STEP 1
    handleChangeFormUsername = (e) => {
        this.setState({ formUsername: e.target.value });
    };

    handleChangeFormEmail = (e) => {
        this.setState({ formEmail: e.target.value });
    };

    handleChangeFormPassword = (e) => {
        this.setState({ formPassword: e.target.value });
    };

    handleChangeFormBusiness = (e) => {
        this.setState({ formBusiness: !this.state.formBusiness });
    };

    //STEP 2
    handleChangeFormName = (e) => {
        this.setState({ formName: e.target.value });
    };

    handleChangeFormPhone = (e) => {
        this.setState({ formPhone: e.target.value });
    };

    handleChangeFormBirthday = (event, {name, value}) => {
        this.setState({ formBirthday: value });
    };

    handleChangeFormGender = (event, {name, value}) => {
        this.setState({ formGender: value });
    };

    handleChangeFormAddress = (e) => {
        this.setState({ formAddress: e.target.value });
    };

    onPlacesChanged = () => {
        const places = this.state.formAddressSearchBox.getPlaces();

        this.setState({ formAddressPlaces: places });

        if (places.name) {
            this.setState({ formAddress: places.name });
            return;
        }

        if (places[0].formatted_address) {
            this.setState({ formAddress: places[0].formatted_address });
            return;
        }

        if (places[0].name) {
            this.setState({ formAddress: places[0].name });
        }
    };
    onSearchBoxMounted = ref => {
        this.setState({formAddressSearchBox : ref});
    };


    handleChangeFormAbout = (e) => {
        this.setState({ formAbout: e.target.value });
    };

    handleChangeFormPhoto = (event, {name, value}) => {
        this.setState({ formBirthday: value });
    };

    render() {
        if (this.props.userReducer.userToken) {
            this.props.history.push('/');
        }

        const steps = [
            {
                jsx: (
                    <Form id={'form1'}>
                        <Form.Field>
                            <label>Логин</label>
                            <input placeholder='Введите логин' value={this.state.formUsername} onChange={ this.handleChangeFormUsername }/>
                        </Form.Field>
                        <Form.Field>
                            <label>Email</label>
                            <input placeholder='Введите email' value={this.state.formEmail} onChange={ this.handleChangeFormEmail }/>
                        </Form.Field>
                        <Form.Field>
                            <label>Пароль</label>
                            <input placeholder='Введите пароль' type='password' value={this.state.formPassword} onChange={ this.handleChangeFormPassword }/>
                        </Form.Field>
                        <Form.Field>
                            <Checkbox checked={this.state.formBusiness} label={<label>Бизнес-аккаунт</label>} toggle
                                      onChange={ this.handleChangeFormBusiness }/>
                        </Form.Field>
                    </Form>
                )
            },
            {
                jsx: (
                    <Form id={'form2'}>
                        <Form.Field>
                            <label>Имя</label>
                            <input placeholder='Введите имя' value={this.state.formName} onChange={ this.handleChangeFormName }/>
                        </Form.Field>
                        <Form.Field>
                            <label>Телефон</label>
                            <input placeholder='Введите пароль' value={this.state.formPhone} onChange={ this.handleChangeFormPhone }/>
                        </Form.Field>
                        <Form.Field>
                            <label>Дата рождения</label>
                            <DateInput
                                name="date"
                                placeholder="Дата рождения"
                                value={ this.state.formBirthday }
                                iconPosition="left"
                                onChange={ this.handleChangeFormBirthday }
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Пол</label>
                            <Select placeholder='Выберете пол' value={this.state.formGender} onChange={ this.handleChangeFormGender } options={[{ text: 'Мужской', value: 'm' }, { text: 'Женский', value: 'w' }]} />
                        </Form.Field>
                        <Form.Field>
                            <label>Место проживания</label>
                            <StandaloneSearchBox
                                googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyAus17T4GYjhlS9cQ-iRWaE09t788ot3es&v=3.exp&libraries=geometry,drawing,places"}

                                ref={this.onSearchBoxMounted}
                                onPlacesChanged={this.onPlacesChanged}
                                onChange={ this.handleChangeFormAddress }
                            >
                                <input placeholder='Введите место проживания' value={this.state.formAddress} onChange={ this.handleChangeFormAddress }/>
                            </StandaloneSearchBox>
                        </Form.Field>
                        <Form.Field>
                            <label>О себе</label>
                            <TextArea placeholder='Введите информацию о себе' value={this.state.formAbout} onChange={ this.handleChangeFormAbout }/>
                        </Form.Field>
                        <Form.Field>
                            <label>Фото</label>
                            <input placeholder='Введите пароль' type='password' onChange={ this.handleChangeFormPhoto }/>
                        </Form.Field>
                    </Form>
                )
            },
            {
                jsx: (
                    <Form id={'form3'}>
                        <h3>Проверьте введенные данные</h3>
                        <p>Логин: <b>{ this.state.formUsername }</b></p>
                        <p>Email: <b>{ this.state.formEmail }</b></p>
                        <p>Тип аккаунта: <b>{ (() => {
                            if (this.state.formBusiness) {
                                return 'Бизнес'
                            } else {
                                return 'Обычный'
                            }
                        })() }</b></p>
                        <p>Имя: <b>{ this.state.formName }</b></p>
                        <p>Дата рождения: <b>{ this.state.formBirthday }</b></p>
                        <p>Пол: <b>{ (() => {
                            if (this.state.formGender === 'm') {
                                return 'Мужской'
                            } else {
                                return 'Женский'
                            }
                        })() }</b></p>
                        <p>Место проживания: <b>{ this.state.formAddress }</b></p>
                        <p>О себе: <b>{ this.state.formAbout }</b></p>
                        <p>Фото: <b>{ this.state.formPhoto }</b></p>
                    </Form>
                )
            },
            {
                jsx: (
                    <Form id={'form4'}>
                        <h3>На вашу почту отправлено письмо!</h3>
                        <p>Подтвердите свою учетную запись</p>
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
                            {
                                (() => {
                                    if (this.state.step < 3) {
                                        return (
                                            <Grid style={{marginTop: '14px' }} columns={2}>
                                                <Grid.Column floated='left'>
                                                    {
                                                        (() => {
                                                            if (this.state.step > 0) {
                                                                return (
                                                                    <Button color='grey' compact onClick={ () =>{ this.setState({step:this.state.step - 1})} }>Назад</Button>
                                                                )
                                                            }
                                                        })()
                                                    }
                                                </Grid.Column>
                                                <Grid.Column floated='right' textAlign='right'>
                                                    {
                                                        (() => {
                                                            if (this.state.step < 2) {
                                                                return (
                                                                    <Button color='blue' compact onClick={ () =>{ this.setState({step:this.state.step + 1})} }>Вперед</Button>
                                                                )
                                                            } else {
                                                                return (
                                                                    <Button color='green' compact onClick={ this.toRegister }>Завершить</Button>
                                                                )
                                                            }
                                                        })()
                                                    }

                                                </Grid.Column>
                                            </Grid>
                                        );
                                    }
                                })()
                            }
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
