'use strict';
module.exports = (sequelize, DataTypes) => {
    const Place = sequelize.define('Places', {
        user: DataTypes.INTEGER,

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
        // associations can be defined here
    };
    return Place;
};
