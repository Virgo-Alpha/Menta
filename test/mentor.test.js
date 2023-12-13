const Mentor = require('../models/Mentor');
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

describe('Mentor Model', () => {
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

  // Test Mentor.create method
  it('should create a new Mentor record', () => {
    // Mocking Mentor data for testing
    const newMentor = {
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '1998-05-15',
      gender: 'Male',
      profession: 'Engineer',
      industry: 'Computer Science',
    };

    // Call the create method
    Mentor.create(newMentor, callback);

    // Assertion - Expect insert to have been called with the new Mentor object
    expect(Datastore().insert).toHaveBeenCalledWith(newMentor, expect.any(Function));
    
  });

  // Test other CRUD operations similarly

  // Test Mentor.findAll method
    it('should find all Mentors', () => {
        // Call the findAll method
        Mentor.findAll(callback);
    
        // Assertion - Expect find to have been called with an empty object
        expect(Datastore().find).toHaveBeenCalledWith({}, expect.any(Function));
    });

    // Test Mentor.findById method
    it('should find a Mentor by ID', () => {
        // Mocking Mentor ID for testing
        const mentor_id = 'M001';

        // Call the findById method
        Mentor.findById(mentor_id, callback);
    
        // Assertion - Expect findOne to have been called with the Mentor ID
        expect(Datastore().findOne).toHaveBeenCalledWith({ _id: mentor_id }, expect.any(Function));
    });

    // Test Mentor.findByName method
    it('should find a Mentor by name', () => {
        // Mocking Mentor name for testing
        const name = 'John Doe';

        // Call the findByName method
        Mentor.findByName(name, callback);
    
        // Assertion - Expect findOne to have been called with the Mentor name
        expect(Datastore().findOne).toHaveBeenCalledWith({ name: name }, expect.any(Function));
    });

    // Test Mentor.deleteAll method
    it('should delete all Mentors', () => {
        // Call the deleteAll method
        Mentor.deleteAll(callback);
    
        // Assertion - Expect remove to have been called with an empty object
        expect(Datastore().remove).toHaveBeenCalledWith({}, { multi: true }, expect.any(Function));
    });

    // Test Mentor.update method
    it('should update a Mentor record', () => {
        Mentor.update('M001', { firstName: 'Jane' }, callback);

        // Assertion - Expect update to have been called with the Mentor ID and updateData
        expect(Datastore().update).toHaveBeenCalledWith(
        { _id: 'M001' },
        { $set: { firstName: 'Jane' } },
        {},
        expect.any(Function)
        );
    });

});
