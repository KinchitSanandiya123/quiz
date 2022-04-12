module.exports = (sequelize, Sequelize) =>{
    const User = sequelize.define('User', { 
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
        }
    },{
        paranoid:true
    });
    return User;
}