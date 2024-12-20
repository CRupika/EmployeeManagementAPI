const { Department } = require('../models');
const { validationResult } = require('express-validator');
const sequelize = require('../config/db');

// // Add Department
// exports.addDepartment = async (req, res) => {
//     try {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         const { name } = req.body;
//         const department = await Department.create({ name });
//         res.status(201).json(department);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Update Department
// exports.updateDepartment = async (req, res) => {
//     try {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }

//         const { id } = req.params;
//         const { name } = req.body;

//         const department = await Department.findByPk(id);
//         if (!department) {
//             return res.status(404).json({ message: "Department not found" });
//         }

//         await department.update({ name });
//         res.status(200).json(department);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// // Delete Department
// exports.deleteDepartment = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const department = await Department.findByPk(id);
//         if (!department) {
//             return res.status(404).json({ message: "Department not found" });
//         }

//         await department.destroy();
//         res.status(200).json({ message: "Department deleted successfully" });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// List Departments
exports.listDepartments = async (req, res) => {
    try {
        const departments = await sequelize.query('CALL GetDepartmentDetails()');
        console.log('Employees:', departments);

        res.status(200).json(departments);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};


