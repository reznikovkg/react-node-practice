'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('Reviews', [
            {
                rating: 1,
                comment: 'плохо',

                userId: 4,
                placeId: 1,
                createdAt: '2019-04-23',
                updatedAt: '2019-05-01'
            },
            {
                rating: 3,
                comment: 'норм',

                userId: 5,
                placeId: 1,
                createdAt: '2019-04-23',
                updatedAt: '2019-05-02'
            },
            {
                rating: 5,
                comment: 'хорошо',

                userId: 6,
                placeId: 1,
                createdAt: '2019-04-23',
                updatedAt: '2019-05-04'
            },
            {
                rating: 5,
                comment: 'блеск',

                userId: 6,
                placeId: 1,
                createdAt: '2019-04-23',
                updatedAt: '2019-05-05'
            },
            {
                rating: 1,
                comment: 'отстой',

                userId: 7,
                placeId: 1,
                createdAt: '2019-04-23',
                updatedAt: '2019-05-06'
            },
            {
                rating: 3,
                comment: 'ну такое',

                userId: 8,
                placeId: 1,
                createdAt: '2019-04-23',
                updatedAt: '2019-05-06'
            },
            {
                rating: 4,
                comment: 'нравится',

                userId: 9,
                placeId: 1,
                createdAt: '2019-04-23',
                updatedAt: '2019-05-06'
            },
            {
                rating: 1,
                comment: 'ужас',

                userId: 10,
                placeId: 1,
                createdAt: '2019-04-23',
                updatedAt: '2019-05-07'
            },
            {
                rating: 1,
                comment: '**** *****!!!11',

                userId: 11,
                placeId: 1,
                createdAt: '2019-04-23',
                updatedAt: '2019-05-08'
            },
            {
                rating: 2,
                comment: 'имейте совесть',

                userId: 12,
                placeId: 1,
                createdAt: '2019-04-23',
                updatedAt: '2019-05-09'
            },
            {
                rating: 5,
                comment: 'а мне норм',

                userId: 13,
                placeId: 1,
                createdAt: '2019-04-23',
                updatedAt: '2019-05-10'
            },
            {
                rating: 5,
                comment: 'хочется стереть себе память, чтобы еще раз сходить',

                userId: 13,
                placeId: 1,
                createdAt: '2019-04-23',
                updatedAt: '2019-05-10'
            },
            {
                rating: 1,
                comment: 'хочется стереть себе память, чтобы не вспомнить про это никогда в жизни',

                userId: 14,
                placeId: 1,
                createdAt: '2019-04-23',
                updatedAt: '2019-05-10'
            },
        ], {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Reviews', null, {});
    }
};
