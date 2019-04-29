'use strict';
module.exports = (sequelize, DataTypes) => {
    const Place = sequelize.define('Places', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        address: DataTypes.STRING,
        contactEmail: DataTypes.STRING,
        contactPhone: DataTypes.STRING,
        workingTimeStart: DataTypes.STRING,
        workingTimeFinish: DataTypes.STRING,

        picture: DataTypes.STRING
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    });
    Place.associate = function (models) {
        Place.belongsTo(models.Users, {
            foreignKey: 'userId',
            as: 'user'
        });
        Place.hasMany(models.Reviews, {
            foreignKey: 'placeId',
            onDelete: 'cascade',
            as: 'reviews'
        });
    };
    return Place;
};
