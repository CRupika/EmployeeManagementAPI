const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            is: /^[A-Za-z ]+$/, // Validate for letters and spaces
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isNumeric: true,
            len: [10, 15], // Phone number length
        },
    },
    managerId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    departmentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, { timestamps: false });

module.exports = Employee;
