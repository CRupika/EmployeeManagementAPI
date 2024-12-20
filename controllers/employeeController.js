const { Employee } = require('../models')
const { validationResult } = require('express-validator');
const sequelize = require('../config/db');

// exports.addEmployee = async (req, res) => {
//     try {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         const { name, email, phone, managerId, departmentId } = req.body;

//         // Check for circular reference
//         if (managerId && managerId === req.body.id) {
//             return res.status(400).json({ message: "An employee cannot be their own manager" });
//         }

//         const employee = await Employee.create({ name, email, phone, managerId, departmentId });
//         res.status(201).json(employee);

//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

exports.addEmployee = async (req, res) => {
    try {
        // Validate the request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { id, name, email, phone, managerId, departmentId } = req.body;
        // Check for circular reference
        if (managerId && managerId === id) {
            return res.status(400).json({ message: "An employee cannot be their own manager" });
        }
        // Execute the stored procedure
        await sequelize.query(
            `CALL EmployeeOperations(:operationFlag, :id, :name, :email, :phone, :managerId, :departmentId)`,
            {
                replacements: {
                    operationFlag: 'I', // Flag for Insert operation
                    id,
                    name,
                    email,
                    phone,
                    managerId,
                    departmentId
                },
                type: sequelize.QueryTypes.RAW
            }
        );
        res.status(201).json({ message: "Employee added successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update Employee
exports.updateEmployee = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { name, email, phone, managerId, departmentId } = req.body;

        // Check for circular reference
        if (managerId && managerId === parseInt(id)) {
            return res.status(400).json({ message: "An employee cannot be their own manager" });
        }

        await sequelize.query(
            "CALL EmployeeOperations('U', :emp_id, :emp_name, :emp_email, :emp_phone, :emp_managerId, :emp_departmentId)",
            {
                replacements: {
                    emp_id: id,
                    emp_name: name,
                    emp_email: email,
                    emp_phone: phone,
                    emp_managerId: managerId,
                    emp_departmentId: departmentId
                },
                type: sequelize.QueryTypes.RAW
            }
        );

        // Fetch the updated employee to return the latest information
        const updatedEmployee = await Employee.findByPk(id);

        res.status(200).json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await Employee.findByPk(id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }

        await sequelize.query(
            "CALL EmployeeOperations('D', :emp_id, NULL, NULL, NULL, NULL, NULL)",
            {
                replacements: {
                    emp_id: id
                },
                type: sequelize.QueryTypes.RAW
            }
        );

        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// List Employees
exports.listEmployees = async (req, res) => {
    // try {
    //     const employees = await Employee.findAll({
    //         include: [
    //             // { model: Department, attributes: ['id', 'name'] },
    //             { model: Employee, as: 'Manager', attributes: ['id', 'name'] },
    //         ],
    //     });
    //     res.status(200).json(employees);
    // }
    try {
        const employees = await sequelize.query('CALL GetEmployeeDetails()');
        console.log('Employees:', employees);

        res.status(200).json(employees);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};


