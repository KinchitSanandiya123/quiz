module.exports = (sequelize, Sequelize) => {
    const result = sequelize.define('result', {
        test_id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        User_id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
       
        score: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
    }, {
        paranoid: true
    });
    return result;
}