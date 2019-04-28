'use strict';
module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Reviews', {
        rating: DataTypes.INTEGER,
        comment: DataTypes.STRING,
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });
    Review.associate = function (models) {
        Review.belongsTo(models.Users, {
            foreignKey: 'userId',
            as: 'user'
        });
        Review.belongsTo(models.Places, {
            foreignKey: 'placeId',
            as: 'place'
        });
    };
    return Review;
};
