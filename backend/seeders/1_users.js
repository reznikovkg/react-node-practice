'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
                id: 1,
                username: 'admin',
                email: 'admin@ru.ru',
                password: 'admin',
                token: 'admin',
                isActivate: 1,
                type: 'admin',
                name: 'admin',
                birthday: '1990-05-06',
                gender: 'm',
                phone: '79001234567',
                address: 'Воронеж',
                photo: 'public/user/admin.jpg',
                createdAt: '2019-04-23',
                updatedAt: '2019-04-23',
            },
            {
                id: 2,
                username: 'business',
                email: 'business@ru.ru',
                password: 'business',
                token: 'business',
                isActivate: 1,
                type: 'business',
                name: 'business',
                birthday: '1990-05-05',
                gender: 'm',
                phone: '79001234567',
                address: 'Воронеж',
                photo: 'public/user/business.jpg',
                createdAt: '2019-04-23',
                updatedAt: '2019-04-23',
            },
            {
                id: 3,
                username: 'business2',
                email: 'business2@ru.ru',
                password: 'business2',
                token: 'business2',
                isActivate: 1,
                type: 'business',
                name: 'business',
                birthday: '1990-05-05',
                gender: 'm',
                phone: '79001234567',
                address: 'Воронеж',
                photo: 'public/user/business.jpg',
                createdAt: '2019-04-23',
                updatedAt: '2019-04-23',
            },
            {
                id: 4,
                username: 'default',
                email: 'default@ru.ru',
                password: 'default',
                token: 'default',
                isActivate: 1,
                type: 'default',
                name: 'default',
                birthday: '1990-05-07',
                gender: 'm',
                phone: '79001234567',
                address: 'Воронеж',
                photo: 'public/user/default.jpg',
                createdAt: '2019-04-23',
                updatedAt: '2019-04-23',
            },
            {
                id: 5,
                username: 'default1',
                email: 'default1@ru.ru',
                password: 'default1',
                token: 'default1',
                isActivate: 1,
                type: 'default',
                name: 'default1',
                birthday: '1990-05-07',
                gender: 'm',
                phone: '79001234567',
                address: 'Воронеж',
                photo: 'public/user/default.jpg',
                createdAt: '2019-04-23',
                updatedAt: '2019-04-23',
            },
            {
                id: 6,
                username: 'default2',
                email: 'default2@ru.ru',
                password: 'default2',
                token: 'default2',
                isActivate: 1,
                type: 'default',
                name: 'default1',
                birthday: '1990-05-07',
                gender: 'm',
                phone: '79001234567',
                address: 'Воронеж',
                photo: 'public/user/default.jpg',
                createdAt: '2019-04-23',
                updatedAt: '2019-04-23',
            },
            {
                id: 7,
                username: 'default3',
                email: 'default3@ru.ru',
                password: 'default3',
                token: 'default3',
                isActivate: 1,
                type: 'default',
                name: 'default3',
                birthday: '1990-05-07',
                gender: 'm',
                phone: '79001234567',
                address: 'Воронеж',
                photo: 'public/user/default.jpg',
                createdAt: '2019-04-23',
                updatedAt: '2019-04-23',
            },
            {
                id: 8,
                username: 'default4',
                email: 'default4@ru.ru',
                password: 'default4',
                token: 'default4',
                isActivate: 1,
                type: 'default',
                name: 'default1',
                birthday: '1990-05-07',
                gender: 'm',
                phone: '79001234567',
                address: 'Воронеж',
                photo: 'public/user/default.jpg',
                createdAt: '2019-04-23',
                updatedAt: '2019-04-23',
            },
            {
                id: 9,
                username: 'default5',
                email: 'default5@ru.ru',
                password: 'default5',
                token: 'default5',
                isActivate: 1,
                type: 'default',
                name: 'default5',
                birthday: '1990-05-07',
                gender: 'm',
                phone: '79001234567',
                address: 'Воронеж',
                photo: 'public/user/default.jpg',
                createdAt: '2019-04-23',
                updatedAt: '2019-04-23',
            },
            {
                id: 10,
                username: 'default6',
                email: 'default6@ru.ru',
                password: 'default6',
                token: 'default6',
                isActivate: 1,
                type: 'default',
                name: 'default6',
                birthday: '1990-05-07',
                gender: 'm',
                phone: '79001234567',
                address: 'Воронеж',
                photo: 'public/user/default.jpg',
                createdAt: '2019-04-23',
                updatedAt: '2019-04-23',
            },
            {
                id: 11,
                username: 'default7',
                email: 'default7@ru.ru',
                password: 'default7',
                token: 'default7',
                isActivate: 1,
                type: 'default',
                name: 'default7',
                birthday: '1990-05-07',
                gender: 'm',
                phone: '79001234567',
                address: 'Воронеж',
                photo: 'public/user/default.jpg',
                createdAt: '2019-04-23',
                updatedAt: '2019-04-23',
            },
            {
                id: 12,
                username: 'default8',
                email: 'default8@ru.ru',
                password: 'default8',
                token: 'default8',
                isActivate: 1,
                type: 'default',
                name: 'default8',
                birthday: '1990-05-07',
                gender: 'm',
                phone: '79001234567',
                address: 'Воронеж',
                photo: 'public/user/default.jpg',
                createdAt: '2019-04-23',
                updatedAt: '2019-04-23',
            },
            {
                id: 13,
                username: 'default9',
                email: 'default9@ru.ru',
                password: 'default9',
                token: 'default9',
                isActivate: 1,
                type: 'default',
                name: 'default9',
                birthday: '1990-05-07',
                gender: 'm',
                phone: '79001234567',
                address: 'Воронеж',
                photo: 'public/user/default.jpg',
                createdAt: '2019-04-23',
                updatedAt: '2019-04-23',
            },
            {
                id: 14,
                username: 'default10',
                email: 'default10@ru.ru',
                password: 'default10',
                token: 'default10',
                isActivate: 1,
                type: 'default',
                name: 'default10',
                birthday: '1990-05-07',
                gender: 'm',
                phone: '79001234567',
                address: 'Воронеж',
                photo: 'public/user/default.jpg',
                createdAt: '2019-04-23',
                updatedAt: '2019-04-23',
            },
            {
                id: 15,
                username: 'default11',
                email: 'default11@ru.ru',
                password: 'default11',
                token: 'default11',
                isActivate: 1,
                type: 'default',
                name: 'default11',
                birthday: '1990-05-07',
                gender: 'm',
                phone: '79001234567',
                address: 'Воронеж',
                photo: 'public/user/default.jpg',
                createdAt: '2019-04-23',
                updatedAt: '2019-04-23',
            },
            {
                id: 16,
                username: 'default12',
                email: 'default12@ru.ru',
                password: 'default12',
                token: 'default12',
                isActivate: 1,
                type: 'default',
                name: 'default12',
                birthday: '1990-05-07',
                gender: 'm',
                phone: '79001234567',
                address: 'Воронеж',
                photo: 'public/user/default.jpg',
                createdAt: '2019-04-23',
                updatedAt: '2019-04-23',
            },
            {
                id: 17,
                username: 'default13',
                email: 'default13@ru.ru',
                password: 'default13',
                token: 'default13',
                isActivate: 1,
                type: 'default',
                name: 'default13',
                birthday: '1990-05-07',
                gender: 'm',
                phone: '79001234567',
                address: 'Воронеж',
                photo: 'public/user/default.jpg',
                createdAt: '2019-04-23',
                updatedAt: '2019-04-23',
            },
            {
                id: 18,
                username: 'default14',
                email: 'default14@ru.ru',
                password: 'default14',
                token: 'default14',
                isActivate: 1,
                type: 'default',
                name: 'default1',
                birthday: '1990-05-07',
                gender: 'm',
                phone: '79001234567',
                address: 'Воронеж',
                photo: 'public/user/default.jpg',
                createdAt: '2019-04-23',
                updatedAt: '2019-04-23',
            },
            {
                id: 19,
                username: 'default15',
                email: 'default15@ru.ru',
                password: 'default15',
                token: 'default15',
                isActivate: 1,
                type: 'default',
                name: 'default1',
                birthday: '1990-05-07',
                gender: 'm',
                phone: '79001234567',
                address: 'Воронеж',
                photo: 'public/user/default.jpg',
                createdAt: '2019-04-23',
                updatedAt: '2019-04-23',
            },
            {
                id: 20,
                username: 'default16',
                email: 'default16@ru.ru',
                password: 'default16',
                token: 'default16',
                isActivate: 1,
                type: 'default',
                name: 'default1',
                birthday: '1990-05-07',
                gender: 'm',
                phone: '79001234567',
                address: 'Воронеж',
                photo: 'public/user/default.jpg',
                createdAt: '2019-04-23',
                updatedAt: '2019-04-23',
            },
            {
                id: 21,
                username: 'default17',
                email: 'default17@ru.ru',
                password: 'default17',
                token: 'default17',
                isActivate: 1,
                type: 'default',
                name: 'default17',
                birthday: '1990-05-07',
                gender: 'm',
                phone: '79001234567',
                address: 'Воронеж',
                photo: 'public/user/default.jpg',
                createdAt: '2019-04-23',
                updatedAt: '2019-04-23',
            },
            {
                id: 22,
                username: 'default18',
                email: 'default18@ru.ru',
                password: 'default18',
                token: 'default18',
                isActivate: 1,
                type: 'default',
                name: 'default1',
                birthday: '1990-05-07',
                gender: 'm',
                phone: '79001234567',
                address: 'Воронеж',
                photo: 'public/user/default.jpg',
                createdAt: '2019-04-23',
                updatedAt: '2019-04-23',
            },
            {
                id: 23,
                username: 'default19',
                email: 'default19@ru.ru',
                password: 'default19',
                token: 'default19',
                isActivate: 1,
                type: 'default',
                name: 'default19',
                birthday: '1990-05-07',
                gender: 'm',
                phone: '79001234567',
                address: 'Воронеж',
                photo: 'public/user/default.jpg',
                createdAt: '2019-04-23',
                updatedAt: '2019-04-23',
            },
            {
                id: 24,
                username: 'default20',
                email: 'default20@ru.ru',
                password: 'default20',
                token: 'default20',
                isActivate: 1,
                type: 'default',
                name: 'default20',
                birthday: '1990-05-07',
                gender: 'm',
                phone: '79001234567',
                address: 'Воронеж',
                photo: 'public/user/default.jpg',
                createdAt: '2019-04-23',
                updatedAt: '2019-04-23',
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
