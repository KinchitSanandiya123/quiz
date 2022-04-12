module.exports = (sequelize, Sequelize) => {
    const Questions = sequelize.define('questions', {
        question: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        option1: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        option2: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        option3: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        option4: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        answer: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
    }, {
        paranoid: true
    });
    return Questions;
}