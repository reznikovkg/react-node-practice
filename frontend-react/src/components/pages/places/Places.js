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
    TextArea,
    Pagination,
    Input
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
            sortPageMax: 1,
            sortLimit: 10,
            sortSearch: '',

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

    getPlaces = (sortCustom = null) => {
        let sort = {
            column: this.state.sortColumn,
            direction: this.state.sortDirection,
            page: this.state.sortPage,
            limit: this.state.sortLimit,
            search: this.state.sortSearch
        };

        if (sortCustom) {
            sort.column = sortCustom.column ? sortCustom.column : sort.column;
            sort.direction = sortCustom.direction ? sortCustom.direction : sort.direction;
            sort.page = sortCustom.page ? sortCustom.page : sort.page;
            sort.limit = sortCustom.limit ? sortCustom.limit : sort.limit;
            sort.search = sortCustom.search ? sortCustom.search : sort.search;

        }

        axios.get(ApiList.places_getPlaces, {
            params: {
                token: this.props.userReducer.userToken,
                userId: this.props.userReducer.userData.id,

                sortColumn: sort.column,
                sortDirection: sort.direction,
                sortPage: sort.page,
                sortLimit: sort.limit,
                sortSearch: sort.search
            }
        }).then((response) => {
            this.setState({places: response.data.places, sortPageMax: response.data.sortPageMax });
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


    //FOR TABLE
    handleSearch = (e, { value }) => {
        this.getPlaces({
            search: value
        });
    };

    handleSort = colName => () => {
        if (this.state.sortColumn !== colName) {
            this.setState({sortColumn: colName, sortDirection: 'ascending'}, ()=>{this.getPlaces()});
            return
        }

        const direction = (this.state.sortDirection === 'ascending' ? 'descending' : 'ascending');

        this.setState({ sortDirection: direction }, ()=>{this.getPlaces()});
    };

    handlePaginationChange = (e, { activePage }) => {
        this.setState({sortPage: activePage}, ()=>{this.getPlaces()});
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
            <Button icon color={'green'} labelPosition='left' onClick={ this.actionModalCreateNewPlace }>
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
                {
                    this.modalCreateNewPlace()
                }
                <Input icon='search' size='small' placeholder='Поиск по названию' onChange={ this.handleSearch }/>
                <Table sortable celled>
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
                                            <Button size='mini'>Просмотр</Button>
                                        </Link>
                                        {
                                            (()=>{
                                                if (this.props.userReducer.userData.type === 'business') {
                                                    return(
                                                        <Button size='mini'>Статистика</Button>
                                                    );
                                                }
                                            })()
                                        }
                                        {
                                            (()=>{
                                                if (this.props.userReducer.userData.type !== 'default') {
                                                    return(
                                                        <Button size='mini' color={'red'} onClick={ this.removePlace(place.id) }>Удалить</Button>
                                                    );
                                                }
                                            })()
                                        }
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        }
                    </Table.Body>
                </Table>

                <Pagination
                    activePage={this.state.sortPage}
                    boundaryRange={1}
                    onPageChange={this.handlePaginationChange}
                    size='mini'
                    totalPages={this.state.sortPageMax}
                    firstItem={ false }
                    lastItem={ false }
                />
            </div>
        );
    }
}

export default connect(mapStateToProps)(Places);