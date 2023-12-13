const { session } = require('passport');
const Session = require('../models/Session');
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

describe('Session Model', () => {
  beforeEach(() => {
    // Clear mock calls and reset behavior before each test
    Datastore.mockClear();
    Datastore().remove.mockClear();
    Datastore().insert.mockClear();
    Datastore().find.mockClear();
    Datastore().findOne.mockClear();
    Datastore().update.mockClear();
  });

  // Test Session.create method
  it('should create a new session record', () => {
    // Mocking session data for testing
    const newSession = {
      sessionName: 'Sample Session',
      date: '2024-01-01',
      startTime: '09:00',
      endTime: '11:00',
      category: 'Sample Category',
      venue: 'Sample Venue',
      mandatory: true,
      menteeList: [],
    };

    // Mocking the callback function
    const callback = jest.fn();

    // Call the create method
    Session.create(newSession, callback);

    // Assertion - Expect insert to have been called with the new session object
    expect(Datastore().insert).toHaveBeenCalledWith(newSession, expect.any(Function));
  });

  // Test other CRUD operations similarly

  // Test Session.findAll method
    it('should find all sessions', () => {
        // Mocking the callback function
        const callback = jest.fn();
    
        // Call the findAll method
        Session.findAll(callback);
    
        // Assertion - Expect find to have been called with an empty object
        expect(Datastore().find).toHaveBeenCalledWith({}, expect.any(Function));
    });

    // Test Session.Name
    it('should find a session by Name', () => {
        // Mocking session Name for testing
        const sessionName = 'Sample Session';
    
        // Mocking the callback function
        const callback = jest.fn();
    
        // Call the findByName method
        Session.findByName(sessionName, callback);
    
        // Assertion - Expect find to have been called with the sessionName
        expect(Datastore().find).toHaveBeenCalledWith({ sessionName: sessionName }, expect.any(Function));
    });

    // Test Session.fidbyCategory
    it('should find a session by Category', () => {
        // Mocking session Category for testing
        const category = 'Sample Category';
    
        // Mocking the callback function
        const callback = jest.fn();
    
        // Call the findByCategory method
        Session.findByCategory(category, callback);
    
        // Assertion - Expect find to have been called with the category
        expect(Datastore().find).toHaveBeenCalledWith({ category: category }, expect.any(Function));
    });

    // Test Session.deleteAll method
    it('should delete all sessions', () => {
        // Mocking the callback function
        const callback = jest.fn();
    
        // Call the deleteAll method
        Session.deleteAll(callback);
    
        // Assertion - Expect remove to have been called with an empty object
        expect(Datastore().remove).toHaveBeenCalledWith({}, { multi: true }, expect.any(Function));
    });

});
