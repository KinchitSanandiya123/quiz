module.exports = (sequelize, Sequelize) => {
    const Test_result = sequelize.define('Test_result', {
        test_id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        User_id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        Question_id: {
            type: Sequelize.DataTypes.INTEGER,
            allowNull: false
        },
        Answer: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        created_time:{
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        }
    }, {
        paranoid: true
    });
    return Test_result;
}