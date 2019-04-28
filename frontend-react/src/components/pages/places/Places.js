import React, { Component } from 'react';

import axios from 'axios';
import ApiList from './../../../ApiList';

import { Link } from 'react-router-dom';

import  { connect } from 'react-redux';

import {
    Table,
    Button,
    Icon,
    Modal,
    Form,
    TextArea
} from 'semantic-ui-react';

import {
    TimeInput
} from 'semantic-ui-calendar-react';
import RouterList from "../../../RouterList";

const mapStateToProps = state => ({
    ...state
});

class Places extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModalCreateNewPlace: false,

            places: [],

            sortDirection: 'ascending',
            sortColumn: 'id',
            sortPage: 1,
            sortLimit: 10,

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

    getPlaces = (sortUser = null) => {
        let sort = {
            column: this.state.sortColumn,
            direction: this.state.sortDirection,
            page: this.state.sortPage,
            limit: this.state.sortLimit
        };

        if (sortUser) {
            sort = sortUser;
        }

        axios.get(ApiList.places_getPlaces, {
            params: {
                token: this.props.userReducer.userToken,
                userId: this.props.userReducer.userData.id,

                sortColumn: sort.column,
                sortDirection: sort.direction,
                sortPage: sort.page,
                sortLimit: sort.limit
            }
        }).then((response) => {
            this.setState({places: response.data.places});
        });
    };

    saveNewPlace = () => {
        axios.get(`${ApiList.business_createPlaces}`, {
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


    removePlace = placeId => () => {
        axios.get(`${ApiList.business_removePlaces}`, {
            params: {
                token: this.props.userReducer.userToken,
                userId: this.props.userReducer.userData.id,
                id: placeId
            }
        }).then((response) => {
            this.getPlaces();
        });
    };



    handleSort = colName => () => {
        if (this.state.sortColumn !== colName) {
            this.setState({sortColumn: colName, sortDirection: 'ascending'});
            this.getPlaces({
                column: colName,
                direction: 'ascending',
                page: this.state.sortPage,
                limit: this.state.sortLimit
            });
            return
        }

        const direction = (this.state.sortDirection === 'ascending' ? 'descending' : 'ascending');

        this.setState({
            sortDirection: direction,
        });
        this.getPlaces({
            column: colName,
            direction: direction,
            page: this.state.sortPage,
            limit: this.state.sortLimit
        });
    };


    //FOR FORM
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

    /**
     * For business
     * @returns {null|*}
     */
    btnCreateNewPlace = () => {
        if (this.props.userReducer.userData.type !== 'business') {
            return '';
        }

        return (
            <Button icon compact color={'green'} labelPosition='left' onClick={ this.actionModalCreateNewPlace }>
                <Icon name='plus' />
                Добавить
            </Button>
        );
    };

    /**
     * For business
     * @returns {null|*}
     */
    actionModalCreateNewPlace = () => {
        this.setState({ showModalCreateNewPlace: !this.state.showModalCreateNewPlace });
    };

    /**
     * For business
     * @returns {null|*}
     */
    modalCreateNewPlace = () => {
        if (this.props.userReducer.userData.type !== 'business') {
            return '';
        }

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

                {
                    this.btnCreateNewPlace()
                }

                <Table sortable celled fixed>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                sorted={this.state.sortColumn === 'id' ? this.state.sortDirection : null}
                                onClick={ this.handleSort('id') }
                            >ID</Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={this.state.sortColumn === 'name' ? this.state.sortDirection : null}
                                onClick={ this.handleSort('name') }
                            >Название</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Настройки</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            this.state.places.map( (place) => (
                                <Table.Row key={place.id}>
                                    <Table.Cell>{ place.id }</Table.Cell>
                                    <Table.Cell>{ place.name }</Table.Cell>
                                    <Table.Cell>{ place.contactEmail }</Table.Cell>
                                    <Table.Cell>
                                        <Link to={RouterList.place.pathWithParams(place.id)} >
                                            <Button compact>Просмотр</Button>
                                        </Link>
                                        <Button compact>Статистика</Button>
                                        <Button compact color={'red'} onClick={ this.removePlace(place.id) }>Удалить</Button>
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

export default connect(mapStateToProps)(Places);
