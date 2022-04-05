var Locator = require("../framework/locator");
var locator = new Locator();

var StudentModel = locator.resolve('studentModel');
var studentModel = new StudentModel();

var StudentDomainObject = locator.resolve('studentDomainObject');

const path = require("path");
var StudentRequest = require('../students/studentRequest');
var StudentResponse = require('../students/studentResponse');


class StudentController {

    // Display list of all students.
    static GetStudents(req, res) {
        try{    
            //Initialize the StudentRequest
            let request = new StudentRequest(req);
                
            //Perform the Action
            let studentData = studentModel.getStudents(request);

            //Initialize and handle the StudentResponse
            let response = new StudentResponse(res);
            response.setParameters(studentData.totalRecords, request.sortParameters, 
                                    request.pageParameters, request.filterParameters);
            response.data = studentData.data;
            response.send();
        } catch (ex) {      
            let response = new StudentResponse(res);
            response.handleError(ex);
        }
    };

// Display detail page for a specific student.
static GetStudent(req, res) {
    try{       
        //Initialize the StudentRequest
        let request = new StudentRequest(req);
            
        //Perform the Action
        let studentData = studentModel.getStudentById(request.id);

        //Initialize and handle the StudentResponse
        let response = new StudentResponse(res);
        response.data = studentData;
        response.send();
    } catch (ex) {      
        let response = new StudentResponse(res);
        response.handleError(ex);
    }
}

    // Delete a specific student.
    static DeleteStudent(req, res) {
        try{       
            //Initialize the StudentRequest
            let request = new StudentRequest(req);
                
            //Perform the Action
            let studentData = studentModel.deleteStudentById(request.id);

            //Initialize and handle the StudentResponse
            let response = new StudentResponse(res);
            response.data = studentData;
            response.send();
        } catch (ex) {      
            let response = new StudentResponse(res);
            response.handleError(ex);
        }
    };

    // Handle student create on POST.
    static CreateStudent(req, res) {

        try{
            //Initialize the StudentRequest
            let request = new StudentRequest(req);

            //Perform the Action
            //Use the StudentDomainObject to validate the student
            let isInsert = true;

            let studentObject = new StudentDomainObject(request.body, isInsert);

            let student = studentModel.createStudent(studentObject);

            //Initialize and handle the StudentResponse
            let response = new StudentResponse(res);
            response.data = student;
            response.status = 201;
            response.send();

        } catch (ex) {     
            let response = new StudentResponse(res);
            response.handleError(ex);
        }

    };

    //Handle student update on POST
    static UpdateStudent(req, res) {

        try{
            //Initialize the StudentRequest
            let request = new StudentRequest(req);
           
            //Perform the Action
            //Use the StudentDomainObject to validate the student
            let isInsert = false;
            let studentObject = new StudentDomainObject(request.body, isInsert);

            let student = studentModel.updateStudent(request.id, studentObject);

            //Initialize and handle the StudentResponse
            let response = new StudentResponse(res);
            response.data = student;
            response.send();

        } catch (ex) {      
            let response = new StudentResponse(res);
            response.handleError(ex);
        }

    }
}


module.exports = StudentController;