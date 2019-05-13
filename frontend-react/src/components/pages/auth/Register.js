import React, { Component } from 'react';

import {
    Segment,
    Grid,
    Header,
    Form,
    Button,
    Checkbox,
    TextArea,
    Select, Label, Message
} from 'semantic-ui-react';

import axios from 'axios';

import ApiList from '../../../ApiList';

import  { connect } from 'react-redux';

import 'moment/locale/ru';

import {
    DateInput
} from 'semantic-ui-calendar-react';

import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';

import Style from './../../../const/style';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const mapStateToProps = state => ({
    ...state
});
const mapDispatchToProps = dispatch => ({

});

class Register extends Component{
    constructor(props) {
        super(props);

        if (this.props.userReducer.userToken) {
            this.props.history.push('/');
        }

        this.state = {
            step: 0,

            //FORM 1
            formUsername: '',
            formEmail: '',
            formPassword: '',
            formBusiness: false,

            validUsername: null,
            validEmail: null,
            validPassword: null,

            statusUsername: null,
            statusEmail: null,
            statusPassword: null,

            //FORM 2
            formName: '',
            formPhone: '',
            formBirthday: '01-01-2019',
            formGender: '',
            formAddress: '',
            formAbout: '',
            formPhoto: null,

            validName: null,
            validPhone: null,
            validGender: null,
            validAddress: null,
            validAbout: null,
            validPhoto: null,

            statusName: null,
            statusPhone: null,
            statusGender: null,
            statusAddress: null,
            statusAbout: null,
            statusPhoto: null
        };
    }

    toRegister = () => {
        const data = new FormData();
        data.append('file', this.state.formPhoto);
        data.append('username', this.state.formUsername);
        data.append('password', this.state.formPassword);
        data.append('email', this.state.formEmail);
        data.append('business', this.state.formBusiness);

        data.append('name', this.state.formName);
        data.append('phone', this.state.formPhone);
        data.append('birthday', this.state.formBirthday);
        data.append('gender', this.state.formGender);
        data.append('address', this.state.formAddress);
        data.append('about', this.state.formAbout);

        axios.post(`${ApiList.auth_register}`, data)
            .then((response) => {
                console.log('register ok');

                // Cookies.set('user_token', response.data.token, { expires: 7 });
                this.setState({step: this.state.step + 1});
            })
            .catch((error) => {
                this.setState({ error: error.response.data.error });
                console.log('error: ', error);
            });
    };

    // STEP 1
    handleChangeFormUsername = (e) => {
        this.setState({ formUsername: e.target.value }, this.checkValidUsername );
    };

    handleChangeFormEmail = (e) => {
        this.setState({ formEmail: e.target.value }, this.checkValidEmail );
    };

    handleChangeFormPassword = (e) => {
        this.setState({ formPassword: e.target.value }, this.checkValidPassword );
    };

    handleChangeFormBusiness = (e) => {
        this.setState({ formBusiness: !this.state.formBusiness });
    };

    classNameFormUsername = () => {
        if (this.state.validUsername === false) {
            return 'error';
        }
    };

    classNameFormEmail = () => {
        if (this.state.validEmail === false) {
            return 'error';
        }
    };

    classNameFormPassword = () => {
        if (this.state.validPassword === false) {
            return 'error';
        }
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

    viewStatusEmail = () => {
        if (this.state.validEmail === null) {
            return;
        }

        if (this.state.validEmail === false) {
            return (
                <Label basic color='red' pointing>
                    { this.state.statusEmail }
                </Label>
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

    checkValidEmail = () => {
        if (this.state.formEmail.length === 0) {
            this.setState({ validEmail: false, statusEmail: 'Email не должен быть пустым' });
            return
        }

        if (/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(this.state.formEmail)) {
            this.setState({ validEmail: true });
        } else {
            this.setState({ validEmail: false, statusEmail: 'Email должен соответствовать маске - user@yandex.ru' });
        }
    };

    toTwoStep = () => {
        if (this.state.validUsername && this.state.validEmail && this.state.validPassword ) {
            this.setState({ step: this.state.step + 1 })
        } else {
            this.checkValidUsername();
            this.checkValidEmail();
            this.checkValidPassword();
        }
    };

    //STEP 2
    handleChangeFormName = (e) => {
        this.setState({ formName: e.target.value }, this.checkValidName);
    };

    viewStatusName = () => {
        if (this.state.validName === null) {
            return;
        }

        if (this.state.validName === false) {
            return (
                <Label basic color='red' pointing>
                    { this.state.statusName }
                </Label>
            );
        }
    };

    classNameFormName = () => {
        if (this.state.validName === false) {
            return 'error';
        }
    };

    checkValidName = () => {
        if (this.state.formName.length === 0) {
            this.setState({ validName: false, statusName: 'Имя не должно быть пустым' });
            return
        }

        if (/^[a-zA-Zа-яА-Я]+$/.test(this.state.formName)) {
            this.setState({ validName: true });
        } else {
            this.setState({ validName: false, statusName: 'Имя должно содержать только латинские и/или русские буквы' });
        }
    };

    handleChangeFormPhone = (e) => {
        this.setState({ formPhone: e.target.value }, this.checkValidPhone);
    };

    viewStatusPhone = () => {
        if (this.state.validPhone === null) {
            return;
        }

        if (this.state.validPhone === false) {
            return (
                <Label basic color='red' pointing>
                    { this.state.statusPhone }
                </Label>
            );
        }
    };

    classNameFormPhone = () => {
        if (this.state.validPhone === false) {
            return 'error';
        }
    };

    checkValidPhone = () => {
        if (this.state.formPhone.length === 0) {
            this.setState({ validPhone: false, statusPhone: 'Телефон не должен быть пустым' });
            return
        }

        if (/^[0-9]+$/.test(this.state.formPhone)) {
            // /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
            this.setState({ validPhone: true });
        } else {
            this.setState({ validPhone: false, statusPhone: 'Телефон может содержать только цифры' });
        }
    };

    handleChangeFormBirthday = (event, {name, value}) => {
        this.setState({ formBirthday: value });
    };

    handleChangeFormGender = (event, {name, value}) => {
        this.setState({ formGender: value }, this.checkValidGender );
    };

    viewStatusGender = () => {
        if (this.state.validGender === null) {
            return;
        }

        if (this.state.validGender === false) {
            return (
                <Label basic color='red' pointing>
                    { this.state.statusGender }
                </Label>
            );
        }
    };

    classNameFormGender = () => {
        if (this.state.validGender === false) {
            return 'error';
        }
    };

    checkValidGender = () => {
        if (this.state.formGender === '') {
            this.setState({ validGender: false, statusGender: 'Необходимо выбрать пол' });
            return;
        }

        this.setState({ validGender: true });
    };

    handleChangeFormAddress = (e) => {
        this.setState({ formAddress: e.target.value }, this.checkValidAddress);
    };

    viewStatusAddress = () => {
        if (this.state.validAddress === null) {
            return;
        }

        if (this.state.validAddress === false) {
            return (
                <Label basic color='red' pointing>
                    { this.state.statusAddress }
                </Label>
            );
        }
    };

    classNameFormAddress = () => {
        if (this.state.validAddress === false) {
            return 'error';
        }
    };

    checkValidAddress = () => {
        if (this.state.formAddress === '') {
            this.setState({ validAddress: false, statusAddress: 'Необходимо указать место проживания' });
            return;
        }

        this.setState({ validAddress: true });
    };

    onPlacesChanged = () => {
        const places = this.state.formAddressSearchBox.getPlaces();

        this.setState({ formAddressPlaces: places });

        if (places.name) {
            this.setState({ formAddress: places.name }, this.checkValidAddress );
            return;
        }

        if (places[0].formatted_address) {
            this.setState({ formAddress: places[0].formatted_address }, this.checkValidAddress );
            return;
        }

        if (places[0].name) {
            this.setState({ formAddress: places[0].name }, this.checkValidAddress );
        }
    };
    onSearchBoxMounted = ref => {
        this.setState({formAddressSearchBox : ref});
    };


    handleChangeFormAbout = (e) => {
        this.setState({ formAbout: e.target.value }, this.checkValidAbout );
    };


    viewStatusAbout = () => {
        if (this.state.validAbout === null) {
            return;
        }

        if (this.state.validAbout === false) {
            return (
                <Label basic color='red' pointing>
                    { this.state.statusAbout }
                </Label>
            );
        }
    };

    classNameFormAbout = () => {
        if (this.state.validAbout === false) {
            return 'error';
        }
    };

    checkValidAbout = () => {
        if (this.state.formAbout === '') {
            this.setState({ validAbout: false, statusAbout: 'Необходимо указать информацию о себе' });
            return;
        }

        this.setState({ validAbout: true });
    };

    handleChangeFormPhoto = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                pictureFile: file,
                pictureUrl: reader.result
            }, this.checkValidPhoto );
        };

        reader.readAsDataURL(file);
    };


    viewStatusPhoto = () => {
        if (this.state.validPhoto === null) {
            return;
        }

        if (this.state.validPhoto === false) {
            return (
                <Label basic color='red' pointing>
                    { this.state.statusPhoto }
                </Label>
            );
        }
    };

    classNameFormPhoto = () => {
        if (this.state.validPhoto === false) {
            return 'error';
        }
    };

    checkValidPhoto = () => {
        if (this.state.pictureUrl) {
            this.setState({ validPhoto: true });
            return;
        }

        this.setState({ validPhoto: false, statusPhoto: 'Необходимо установить фото' });
    };

    getCropper = () => {
        if (this.state.pictureFile) {
            return (
                <Cropper
                    ref={ cropper => { this.cropper = cropper; } }
                    src={ this.state.pictureUrl }
                    style={ Style.cropper }
                    aspectRatio={1}
                    guides={false}  />
            );
        }
    };

    savePhoto = () => {
        if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
            return;
        }
        this.setState({
            cropResult: this.cropper.getCroppedCanvas().toDataURL()
        });

        this.cropper.getCroppedCanvas().toBlob(blob => {
            this.setState({
                formPhoto: blob
            });
        });
    };


    toThreeStep = () => {
        if (this.state.validName && this.state.validPhone && this.state.validGender && this.state.validAddress && this.state.validAbout && this.state.validPhoto) {
            this.savePhoto();
            this.setState({ step: this.state.step + 1 });
        } else {
            this.checkValidName();
            this.checkValidPhone();
            this.checkValidGender();
            this.checkValidAddress();
            this.checkValidAbout();
            this.checkValidPhoto();
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

    render() {
        const steps = [
            {
                jsx: (
                    <Form id={'form1'}>
                        <Form.Field className={ this.classNameFormUsername() }>
                            <label>Логин</label>
                            <input placeholder='Введите логин' value={this.state.formUsername} onChange={ this.handleChangeFormUsername }/>
                            {
                                this.viewStatusUsername()
                            }
                        </Form.Field>
                        <Form.Field className={ this.classNameFormEmail() }>
                            <label>Email</label>
                            <input placeholder='Введите email' value={this.state.formEmail} onChange={ this.handleChangeFormEmail }/>
                            {
                                this.viewStatusEmail()
                            }
                        </Form.Field>
                        <Form.Field className={ this.classNameFormPassword() }>
                            <label>Пароль</label>
                            <input placeholder='Введите пароль' type='password' value={this.state.formPassword} onChange={ this.handleChangeFormPassword }/>
                            {
                                this.viewStatusPassword()
                            }
                        </Form.Field>
                        <Form.Field>
                            <Checkbox checked={this.state.formBusiness} label={<label>Бизнес-аккаунт</label>} toggle
                                      onChange={ this.handleChangeFormBusiness }/>
                        </Form.Field>

                        <Grid style={ Style.grid } columns={1}>
                            <Grid.Column floated='right' textAlign='right'>
                                <Button color='blue' compact onClick={ this.toTwoStep }>Вперед</Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                )
            },
            {
                jsx: (
                    <Form id={'form2'}>
                        <Form.Field className={ this.classNameFormName() }>
                            <label>Имя</label>
                            <input placeholder='Введите имя' value={this.state.formName} onChange={ this.handleChangeFormName }/>
                            {
                                this.viewStatusName()
                            }
                        </Form.Field>
                        <Form.Field className={ this.classNameFormPhone() }>
                            <label>Телефон</label>
                            <input placeholder='Введите пароль' value={this.state.formPhone} onChange={ this.handleChangeFormPhone }/>
                            {
                                this.viewStatusPhone()
                            }
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
                        <Form.Field className={ this.classNameFormGender() }>
                            <label>Пол</label>
                            <Select placeholder='Выберете пол' value={this.state.formGender} onChange={ this.handleChangeFormGender } options={[{ text: 'Мужской', value: 'm' }, { text: 'Женский', value: 'w' }]} />
                            {
                                this.viewStatusGender()
                            }
                        </Form.Field>
                        <Form.Field className={ this.classNameFormAddress() }>
                            <label>Место проживания</label>
                            <StandaloneSearchBox
                                googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyAus17T4GYjhlS9cQ-iRWaE09t788ot3es&v=3.exp&libraries=geometry,drawing,places"}

                                ref={this.onSearchBoxMounted}
                                onPlacesChanged={this.onPlacesChanged}
                                onChange={ this.handleChangeFormAddress }
                            >
                                <input placeholder='Введите место проживания' value={this.state.formAddress} onChange={ this.handleChangeFormAddress }/>
                            </StandaloneSearchBox>
                            {
                                this.viewStatusAddress()
                            }
                        </Form.Field>
                        <Form.Field className={ this.classNameFormAbout() }>
                            <label>О себе</label>
                            <TextArea placeholder='Введите информацию о себе' value={this.state.formAbout} onChange={ this.handleChangeFormAbout }/>
                            {
                                this.viewStatusAbout()
                            }
                        </Form.Field>
                        <Form.Field className={ this.classNameFormPhoto() }>
                            <label>Фото</label>
                            <input type='file' placeholder='Выберете фото' onChange={ this.handleChangeFormPhoto }/>
                            {
                                this.getCropper()
                            }
                            {
                                this.viewStatusPhoto()
                            }
                        </Form.Field>

                        <Grid style={ Style.grid } columns={2}>
                            <Grid.Column floated='left'>
                                <Button color='grey' compact onClick={ () =>{ this.setState({step:this.state.step - 1})} }>Назад</Button>
                            </Grid.Column>
                            <Grid.Column floated='right' textAlign='right'>
                                <Button color='blue' compact onClick={ this.toThreeStep }>Вперед</Button>
                            </Grid.Column>
                        </Grid>
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
                        <p>Фото: <img src={ this.state.cropResult } alt=""/></p>

                        <Grid style={ Style.grid } columns={1}>
                            <Grid.Column floated='right' textAlign='right'>
                                <Button color='green' compact onClick={ this.toRegister }>Завершить</Button>
                            </Grid.Column>
                        </Grid>
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
                                this.viewError()
                            }
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
