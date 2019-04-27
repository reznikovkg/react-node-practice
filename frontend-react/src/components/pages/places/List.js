import React, { Component } from 'react';

import axios from 'axios';
import ApiList from './../../../ApiList';

import  { connect } from 'react-redux';

import {
    Table,
    Button,
    Icon,
    Modal, Form, Checkbox, TextArea
} from 'semantic-ui-react';

import {
    DateInput,
    TimeInput
} from 'semantic-ui-calendar-react';

const mapStateToProps = state => ({
    ...state
});

class List extends Component{
    constructor(props) {
        super(props);

        this.state = {
            showModalCreateNewPlace: false,

            places: [],


            formName: '',
            formDescription: '',
            formAddress: '',
            formContactEmail: '',
            formContactPhone: '',
            formWorkingTimeStart: '',
            formWorkingTimeFinish: '',
            formPicture: ''
        };

        this.getPlaces();
    }

    actionModalCreateNewPlace = () => {
        this.setState({ showModalCreateNewPlace: !this.state.showModalCreateNewPlace });
    };

    getPlaces = () => {
        axios.get(ApiList.business_allPlaces, {
            params: {
                token: this.props.userReducer.userToken,
                userId: this.props.userReducer.userData.id
            }
        }).then((response) => {
            this.setState({places: response.data.places});
        });
    };

    handleChangeFormName = (e) => {
        this.setState({ formName: e.target.value });
    };

    handleChangeFormDescription = (e) => {
        this.setState({ formDescription: e.target.value });
    };

    handleChangeFormContactEmail = (e) => {
        this.setState({ formContactEmail: e.target.value });
    };

    handleChangeFormContactPhone = (e) => {
        this.setState({ formContactPhone: e.target.value });
    };

    handleChangeFormWorkingTimeStart = (event, {name, value}) => {
        this.setState({ formWorkingTimeStart: value });
    };

    handleChangeFormWorkingTimeFinish = (event, {name, value}) => {
        this.setState({ formWorkingTimeFinish: value });
    };


    saveNewPlace = () => {
        axios.get(`${ApiList.business_sendPlaces}`, {
            params: {
                token: this.props.userReducer.userToken,
                userId: this.props.userReducer.userData.id,
                name: this.state.formName,
                description: this.state.formDescription,
                address: this.state.formAddress,
                contactEmail: this.state.formContactEmail,
                contactPhone: this.state.formContactPhone,
                workingTimeStart: this.state.formWorkingTimeStart,
                workingTimeFinish: this.state.formWorkingTimeFinish,
                picture: this.state.formPicture
            }
        }).then((response) => {
            this.actionModalCreateNewPlace();
            this.getPlaces();
        });
    };

    modalCreateNewPlace = () => {
        return (
            <Modal size={'tiny'} open={this.state.showModalCreateNewPlace} onClose={this.actionModalCreateNewPlace} closeIcon>
                <Modal.Header>Добавить новое место</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Form>
                            <Form.Field>
                                <label>Название</label>
                                <input placeholder='Введите название' value={this.state.formName} onChange={ this.handleChangeFormName }/>
                            </Form.Field>
                            <Form.Field>
                                <label>Описание</label>
                                <TextArea placeholder='Введите описание' value={this.state.formDescription} onChange={ this.handleChangeFormDescription }/>
                            </Form.Field>
                            <Form.Field>
                                <label>Контактный email</label>
                                <input placeholder='Введите email' value={this.state.formContactEmail} onChange={ this.handleChangeFormContactEmail }/>
                            </Form.Field>
                            <Form.Field>
                                <label>Контактный телефон</label>
                                <input placeholder='Введите телефон' value={this.state.formContactPhone} onChange={ this.handleChangeFormContactPhone }/>
                            </Form.Field>
                            <Form.Field>
                                <label>Начало рабочего дня</label>
                                <TimeInput
                                    placeholder="Начало рабочего дня"
                                    value={ this.state.formWorkingTimeStart }
                                    iconPosition="left"
                                    onChange={ this.handleChangeFormWorkingTimeStart }/>
                            </Form.Field>
                            <Form.Field>
                                <label>Конец рабочего дня</label>
                                <TimeInput
                                    placeholder="Конец рабочего дня"
                                    value={ this.state.formWorkingTimeFinish }
                                    iconPosition="left"
                                    onChange={ this.handleChangeFormWorkingTimeFinish }/>
                            </Form.Field>
                        </Form>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='black' onClick={ this.actionModalCreateNewPlace }>
                        Отмена
                    </Button>
                    <Button
                        positive
                        icon='checkmark'
                        labelPosition='right'
                        content="Добавить"
                        onClick={ this.saveNewPlace }
                    />
                </Modal.Actions>
            </Modal>
        )
    };

    render() {
        return (
            <div>
                <h3>Список мест</h3>

                <Button icon compact color={'green'} labelPosition='left' onClick={ this.actionModalCreateNewPlace }>
                    <Icon name='plus' />
                    Добавить
                </Button>

                <Table basic>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Название</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Настройки</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            this.state.places.map( (place) => (
                                    <Table.Row key={place.id}>
                                        <Table.Cell>{ place.name }</Table.Cell>
                                        <Table.Cell>{ place.email }</Table.Cell>
                                        <Table.Cell>
                                            <Button compact>Просмотр</Button>
                                            <Button compact>Статистика</Button>
                                            <Button compact>Удалить</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                        }
                    </Table.Body>
                </Table>

                {
                    this.modalCreateNewPlace()
                }

            </div>
        );
    }
}

export default connect(mapStateToProps)(List);
