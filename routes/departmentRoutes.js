const express = require('express');
const { body, param } = require('express-validator');
const departmentController = require('../controllers/departmentController');

const router = express.Router();

// Department Routes
// router.post('/', [body('name').isString().withMessage('Invalid department name')], departmentController.addDepartment);

// router.put('/:id', [param('id').isInt(), body('name').isString()], departmentController.updateDepartment);

// router.delete('/:id', param('id').isInt(), departmentController.deleteDepartment);

router.get('/', departmentController.listDepartments);

module.exports = router;
