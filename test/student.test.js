const Student = require('../models/Student');
const Datastore = require('nedb');

// Mocking the NeDB database for testing purposes
jest.mock('nedb', () => {
  const mockDb = {
    remove: jest.fn(),
    insert: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
  };
  return jest.fn(() => mockDb);
});

describe('Student Model', () => {
  beforeEach(() => {
    // Clear mock calls and reset behavior before each test
    Datastore.mockClear();
    Datastore().remove.mockClear();
    Datastore().insert.mockClear();
    Datastore().find.mockClear();
    Datastore().findOne.mockClear();
    Datastore().update.mockClear();
  });

  // Mocking the callback function
  const callback = jest.fn();

  // Test Student.create method
  it('should create a new student record', () => {
    // Mocking student data for testing
    const newStudent = {
      studentId: 'S001',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1998-05-15',
      gender: 'Male',
      studentEmail: 'john@example.com',
      enrollmentDate: '2022-09-01',
      degreeProgram: 'Computer Science',
    };

    

    // Call the create method
    Student.create(newStudent, callback);

    // Assertion - Expect insert to have been called with the new student object
    expect(Datastore().insert).toHaveBeenCalledWith(newStudent, expect.any(Function));
    
  });

  // Test other CRUD operations similarly

  // Test Student.searchStudents method
    it('should search for students by firstName, lastName and degreeProgram array', () => {
        // Mocking student data for testing
        const firstName = 'John';
        const lastName = 'Doe';
        const degreeProgramArray = ['Computer Science', 'Electrical Engineering'];
    
        // Mocking the callback function
        const callback = jest.fn();
    
        // Call the searchStudents method
        Student.searchStudents(firstName, lastName, degreeProgramArray, callback);
    
        // Assertion - Expect find to have been called with the query object
        expect(Datastore().find).toHaveBeenCalledWith(
        {
            firstName: { $regex: new RegExp(firstName, 'i') },
            lastName: { $regex: new RegExp(lastName, 'i') },
            degreeProgram: { $in: degreeProgramArray },
        },
        expect.any(Function)
        );
        
    });

    // Test Student.findById method
    it('should find a student by their ID', () => {
        // Mocking student data for testing
        const studentId = 'S001';
    
        // Mocking the callback function
        const callback = jest.fn();
    
        // Call the findById method
        Student.findById(studentId, callback);
    
        // Assertion - Expect findOne to have been called with the studentId
        expect(Datastore().findOne).toHaveBeenCalledWith(
        { _id: studentId },
        expect.any(Function)
        );
        
    });

    // Test Student.findByStudentId method
    it('should find a student by their studentId', () => {
        // Mocking student data for testing
        const studentId = 'S001';
    
        // Mocking the callback function
        const callback = jest.fn();
    
        // Call the findByStudentId method
        Student.findByStudentId(studentId, callback);
    
        // Assertion - Expect findOne to have been called with the studentId
        expect(Datastore().findOne).toHaveBeenCalledWith(
        { studentId: studentId },
        expect.any(Function)
        );
        
    });

    // Test Student.update method
    it('should update a student record', () => {
        // Mocking student data for testing
        const studentId = 'S001';
        const updateData = {
        firstName: 'Jane',
        lastName: 'Doe',
        };
    
        // Mocking the callback function
        const callback = jest.fn();
    
        // Call the update method
        Student.update(studentId, updateData, callback);
    
        // Assertion - Expect update to have been called with the studentId and updateData
        expect(Datastore().update).toHaveBeenCalledWith(
        { _id: studentId },
        { $set: updateData },
        {},
        expect.any(Function)
        );
        
    });  

    // Test Student.delete method
    it('should delete a student record', () => {
        // Mocking student data for testing
        const studentId = 'S001';
    
        // Mocking the callback function
        const callback = jest.fn();
    
        // Call the delete method
        Student.delete(studentId, callback);
    
        // Assertion - Expect remove to have been called with the studentId
        expect(Datastore().remove).toHaveBeenCalledWith(
        { _id: studentId },
        {},
        expect.any(Function)
        );
        
    });

    // Test Student.deleteAll method
    it('should delete all student records', () => {
        // Mocking the callback function
        const callback = jest.fn();
    
        // Call the deleteAll method
        Student.deleteAll(callback);
    
        // Assertion - Expect remove to have been called with an empty query object
        expect(Datastore().remove).toHaveBeenCalledWith(
        {},
        { multi: true },
        expect.any(Function)
        );
        
    });

    // Test Student.findAll method
    it('should find all students', () => {
        // Mocking the callback function
        const callback = jest.fn();
    
        // Call the findAll method
        Student.findAll(callback);
    
        // Assertion - Expect find to have been called with an empty query object
        expect(Datastore().find).toHaveBeenCalledWith(
        {},
        expect.any(Function)
        );
        
    });
  
});
