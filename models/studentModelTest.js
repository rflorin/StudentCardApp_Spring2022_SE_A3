var Test = require('../framework/test')


class StudentModelTest {

    static runTests() {
        StudentModelTest.TestNumberOfStudents();
        StudentModelTest.TestGetRandomGPA();
    }

    static TestNumberOfStudents() {

        Test.it('Student Model - 1', 'should have 14 students', function() {
            var StudentModel = require('./studentModel');
            var studentModel = new StudentModel();
            
            let students = studentModel.getAllStudents();
            Test.assert(students.length == 14);    
        });

    }

    static TestGetRandomGPA() {

        Test.it('Student Model - 2', 'should return a random GPA', function() {
            var StudentModel = require('./studentModel');
            var studentModel = new StudentModel();
            
            //It is unlikely, but possible for the same GPA to be 
            //chosen twice, but even more unlikely the same will be 
            //returned three times.
            let GPA1 = studentModel.getRandomGPA();
            let GPA2 = studentModel.getRandomGPA();
            let GPA3 = studentModel.getRandomGPA();

            Test.assert((GPA1 != GPA2) || (GPA2 != GPA3) || (GPA1 != GPA3), 
                'RandomGPA is returning the same value')
        });

    }

}

module.exports = StudentModelTest;
