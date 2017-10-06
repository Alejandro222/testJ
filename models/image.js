module.exports = function(sequelize, DataTypes) {
    var Image = sequelize.define('images', {
        picture: DataTypes.STRING
    });
    return Image;
}