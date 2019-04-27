'use strict';
module.exports = (sequelize, DataTypes) => {
    const Place = sequelize.define('Places', {
        user: DataTypes.NUMBER,

        name: DataTypes.STRING,
        description: DataTypes.STRING,
        address: DataTypes.STRING,
        contact_email: DataTypes.STRING,
        contact_phone: DataTypes.STRING,
        working_time_start: DataTypes.STRING,
        working_time_finish: DataTypes.STRING,

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
