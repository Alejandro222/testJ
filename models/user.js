module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('users', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        passwordConf: DataTypes.STRING
    });
    return User;
}