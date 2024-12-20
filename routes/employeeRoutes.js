const express = require('express');
const { body, param, validationResult } = require('express-validator');
const employeeController = require('../controllers/employeeController');

const router = express.Router();

// Employee Routes
router.post(
    '/addEmployee',
    [
        body('name').isString().withMessage('Invalid name format'),
        body('email').isEmail().withMessage('Invalid email format'),
        body('phone').isNumeric().isLength({ min: 10, max: 15 }).withMessage('Invalid phone number'),
        body('departmentId').isInt().withMessage('Invalid department ID'),
    ],
    employeeController.addEmployee
);

router.put(
    '/updateEmployee:id',
    [
        param('id').isString().withMessage('Invalid employee ID'),
        body('name').optional().isString(),
        body('email').optional().isEmail(),
        body('phone').optional().isNumeric(),
    ],
    employeeController.updateEmployee
);

router.delete('/deleteEmployee:id', param('id').isInt().withMessage('Invalid employee ID'), employeeController.deleteEmployee);

router.get('/getEmployee', employeeController.listEmployees);

module.exports = router;