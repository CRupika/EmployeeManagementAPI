const Employee = require('./Employee');
const Department = require('./Department');

// Relationships
Employee.belongsTo(Employee, { as: 'Manager', foreignKey: 'managerId' });
Employee.belongsTo(Department, { foreignKey: 'departmentId' });

module.exports = { Employee, Department };
