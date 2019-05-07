import React, { Component } from 'react';

import axios from 'axios';
import ApiList from './../../../ApiList';


import  { connect } from 'react-redux';

import {
    Table,
    Button,
    Pagination,
    Input
} from 'semantic-ui-react';

const mapStateToProps = state => ({
    ...state
});

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],

            sortDirection: 'ascending',
            sortColumn: 'id',
            sortPage: 1,
            sortPageMax: 1,
            sortLimit: 10,
            sortSearch: ''

        };

        this.getUsers();
    }

    getUsers = (sortCustom = null) => {
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

        axios.get(ApiList.admin_getUsers, {
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
            this.setState({users: response.data.users, sortPageMax: response.data.sortPageMax });
        })
            .catch((error) => {
                console.log('error: ', error);
            });
    };


    removeUser = userId => () => {
        axios.get(`${ApiList.admin_removeUser}`, {
            params: {
                token: this.props.userReducer.userToken,
                userId: this.props.userReducer.userData.id,
                id: userId
            }
        }).then((response) => {
            this.getUsers();
        })
            .catch((error) => {
                console.log('error: ', error);
            });
    };

    //FOR TABLE
    handleSearch = (e, { value }) => {
        this.getUsers({
            search: value
        });
    };

    handleSort = colName => () => {
        if (this.state.sortColumn !== colName) {
            this.setState({sortColumn: colName, sortDirection: 'ascending'}, ()=>{this.getUsers()});
            return
        }

        const direction = (this.state.sortDirection === 'ascending' ? 'descending' : 'ascending');

        this.setState({ sortDirection: direction }, ()=>{this.getUsers()});
    };

    handlePaginationChange = (e, { activePage }) => {
        this.setState({sortPage: activePage}, ()=>{this.getUsers()});
    };


    render() {
        return (
            <div>
                <h3>Список ползователей</h3>
                <Input icon='search' size='small' placeholder='Поиск по имени пользователя' onChange={ this.handleSearch }/>
                <Table sortable celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                sorted={this.state.sortColumn === 'id' ? this.state.sortDirection : null}
                                onClick={ this.handleSort('id') }
                            >ID</Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={this.state.sortColumn === 'username' ? this.state.sortDirection : null}
                                onClick={ this.handleSort('username') }
                            >Имя пользователя</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Настройки</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            this.state.users.map( (user) => (
                                <Table.Row key={user.id}>
                                    <Table.Cell>{ user.id }</Table.Cell>
                                    <Table.Cell>{ user.username }</Table.Cell>
                                    <Table.Cell>{ user.email }</Table.Cell>
                                    <Table.Cell>
                                        <Button size='mini' color={'red'} onClick={ this.removeUser(user.id) }>Удалить</Button>
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

export default connect(mapStateToProps)(Users);
