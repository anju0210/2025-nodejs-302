const {DataTypes} = require('sequelize');
const sequelize = require('./index')

const Travel = sequelize.define('Travel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncreament: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }},
    {
        tableName: 'travellist',
        timestamps: false,
    }
)

module.exports = Travel;