'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('Users', {
        username: {
            unique: true,
            type: DataTypes.STRING,
        },
        email: {
            unique: true,
            type: DataTypes.STRING,
        },
        password: DataTypes.STRING,
        token: {
            unique: true,
            type: DataTypes.STRING,
        },

        isActivate: DataTypes.BOOLEAN,
        type: DataTypes.STRING,

        birthday: DataTypes.DATEONLY,
        gender: DataTypes.STRING,
        phone:DataTypes.STRING,
        address: DataTypes.STRING,
        photo: DataTypes.STRING

    }, {});
    User.associate = function (models) {
        // associations can be defined here
    };
    return User;
};
