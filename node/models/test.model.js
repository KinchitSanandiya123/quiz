module.exports = (sequelize, Sequelize) => {
    const Test = sequelize.define('test', {
        id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        testName: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        startDate: {
            type: Sequelize.DataTypes.DATEONLY,
            allowNull: false
        },
        endDate: {
            type: Sequelize.DataTypes.DATEONLY,
            allowNull: false
        }
        
    }, {
        paranoid: true
    });
    return Test;
}