module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define('Admin', {
        name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        contact: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.DataTypes.STRING,
        },
        role: {
            type: Sequelize.DataTypes.STRING,
        }

    }, {
        paranoid: true
    });
    return Admin;
}