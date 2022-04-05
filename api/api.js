var express = require('express');
var router = express.Router();

// Use Factory to get controller modules.
//var controllerFactory = require('../controllers/controllerFactory');

var Locator = require("../framework/locator");
var locator = new Locator();

var StudentController = locator.resolve('studentController');


/// STUDENT API ROUTES ///

// GET request for one student.
// GET api/students/1  - Get Student with id = 1
//router.get('/students/:id', controllerFactory.createStudentController().GetStudent);
router.get('/students/:id', StudentController.GetStudent);

// GET request for list of all student items.
// GET api/students  - Get all students
router.get('/students', StudentController.GetStudents);

// POST request for creating student.
// POST api/students  - Create a new student
router.post('/students', StudentController.CreateStudent);

// POST request for updating student.
// POST api/students/1  - Update the student with id = 1
router.post('/students/:id', StudentController.UpdateStudent);

// Delete request for one student.
// DELETE /api/students/1 - Delete Student with id = 1
router.delete('/students/:id', StudentController.DeleteStudent);


module.exports = router;