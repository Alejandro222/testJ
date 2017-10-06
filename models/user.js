module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('users', {
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        passwordConf: DataTypes.STRING
    });
    return User;
}