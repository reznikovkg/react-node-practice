'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Users', [
            {
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
            }

        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
