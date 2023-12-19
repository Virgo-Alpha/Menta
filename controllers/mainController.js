const Session = require('../models/Session');
const Student = require('../models/Student');
const Mentor = require('../models/Mentor');
const userDao = require('../models/userModel.js'); 

const mainController = {
  // Render the homepage
  renderHomePage: (req, res) => {
    res.render('about'); // Assuming you have a "home.mustache" template for the homepage
  },

  // render register
  renderRegister: (req, res) => {
    res.render('register');
  },

  // register
  register: (req, res) => {
    const { username, password, firstName, lastName, email, phoneNumber, role, studentId, dateOfBirth, gender, enrollmentDate, degreeProgram} = req.body;
  
    if (!username || !password) {
      res.status(401).send('No user or password.');
      return;
    }
  
    userDao.lookup(username, (err, user) => {
      if (err) {
        res.status(500).json({ error: 'Error finding user.' });
        return;
      }
      if (user) {
        // res.status(401).send('User already exists: ' + username);
        res.render('login', { error: 'User: ' + username + ' already exists. Please login.' });
        return;
      }
  
      userDao.create(
        username,
        password,
        firstName,
        lastName,
        email,
        phoneNumber,
        role,
        studentId,
        dateOfBirth,
        gender,
        enrollmentDate,
        degreeProgram,
        function (err, newUser) {
          if (err) {
            res.render('register', { error: 'Could not register user.' });
          } else {
            //console.log('User created:', username);
            res.render('login', {
              error: 'User: ' + newUser.username + ' successfully created. Please login.',
            });
          }
        }
      );
    });
  },

  // render login
  renderLogin: (req, res) => {
    res.render('login');
  },

  // handle login
  handle_login: (req, res) => {
    // Access the username and role from req.user
    const { username, role } = req.user;

    // Determine the appropriate dashboard based on the user's role
    let dashboard = '';
    if (role === 'admin') {
        dashboard = 'admin_views/admin_dashboard'; // Admin dashboard view
    } else if (role === 'student') {
        dashboard = 'student_views/student_dashboard'; // Student dashboard view
    }

    // Render the appropriate dashboard view
    res.render(dashboard, { username: username });
},

  // handle logout
  handle_logout: (req, res) => {
    res
        .clearCookie("jwt")
        .status(200)
        .redirect("/");
  },

  // render student dashboard
  renderStudentDashboard: (req, res) => {
    res.render('student_views/student_dashboard', { username: req.user.username });
  },

  // render admin dashboard
  renderAdminDashboard: (req, res) => {
    res.render('admin_views/admin_dashboard', { username: req.user.username });
  },

  // render admin sessions view
  renderAdminSessions: (req, res) => {
    // Fetch sessions data from the database
    Session.findAll((err, sessions) => {
      if (err) {
        res.status(500).json({ error: 'Could not retrieve sessions.' });
      } else {
        // Render the admin sessions view and pass sessions data to Mustache template
        res.render('admin_views/admin_sessions', { sessions });
      }
    });
  },

  // render student sessions view
  renderStudentSessions: (req, res) => {
    // Fetch sessions data from the database
    Session.findAll((err, sessions) => {
      if (err) {
        res.status(500).json({ error: 'Could not retrieve sessions.' });
      } else {
        // Render the admin sessions view and pass sessions data to Mustache template
        res.render('student_views/student_sessions', { sessions });
      }
    });
  },

  // render add_session
  renderAddSession: (req, res) => {
    res.render('admin_views/add_session');
  },

  // render edit_session:id
  renderEditSession: (req, res) => {
    const sessionId = req.params.id;

    Session.findById(sessionId, (err, session) => {
      if (err) {
        res.status(500).json({ error: 'Could not find the session.' });
      } else {
        // Render the session details page and pass session data to Mustache template
        res.render('admin_views/edit_session', {
          sessionName: session.sessionName,
          date: session.date,
          startTime: session.startTime,
          endTime: session.endTime,
          category: session.category,
          venue: session.venue,
          mandatory: session.mandatory,
          sessionId: sessionId // Pass sessionId for edit session URL
        });
      }
    });
  },

  // Delete all sessions
  deleteAll: (req, res) => {
    Session.deleteAll((err) => {
      if (err) {
        res.status(500).json({ error: 'Could not delete all sessions.' });
      } else {
        // Redirect to admin sessions view and send ok status
        res.status(200).json({ message: 'OK' });

      }
    }
    );
  },

  // Search sessions
  initialSearch: (req, res) => {
    Session.findAll((err, sessions) => {
      if (err) {
        res.status(500).json({ error: 'Failed to fetch sessions.' });
      } else {
        res.render('admin_views/search_sessions', { sessions });
      }
    });
  },

  // Search sessions
  searchSessions: (req, res) => {
    const sessionName = req.query.sessionName || '';
    const categories = req.query.categories || ''; // Get categories from query parameters

    // Convert categories string to an array
    const categoriesArray = categories.split(',');

    // Use the search criteria to query the sessions
    if (sessionName !== '' || categoriesArray.length !== 0) {
      // If search criteria specified, perform search
      Session.search(sessionName, categoriesArray, (err, sessions) => {
        if (err) {
          res.status(500).json({ error: 'Search failed.' });
        } else {
          res.json({ sessions });
        }
      });
    } else {
      // If no search criteria specified, fetch all sessions
      Session.findAll((err, sessions) => {
        if (err) {
          res.status(500).json({ error: 'Failed to fetch sessions.' });
        } else {
          res.render('admin_views/search_sessions', { sessions });
        }
      });
    }
  },

  // render initial search_studentSessions
  initialSearchStudentSessions: (req, res) => {
    Session.findAll((err, sessions) => {
      if (err) {
        res.status(500).json({ error: 'Failed to fetch sessions.' });
      } else {
        res.render('student_views/search_studentSessions', { sessions });
      }
    });
  },

  // render search_studentSessions
  searchStudentSessions: (req, res) => {
    const sessionName = req.query.sessionName || '';
    const categories = req.query.categories || ''; // Get categories from query parameters

    // Convert categories string to an array
    const categoriesArray = categories.split(',');

    // Use the search criteria to query the sessions
    if (sessionName !== '' || categoriesArray.length !== 0) {
      // If search criteria specified, perform search
      Session.search(sessionName, categoriesArray, (err, sessions) => {
        if (err) {
          res.status(500).json({ error: 'Search failed.' });
        } else {
          res.json({ sessions });
        }
      });
    } else {
      // If no search criteria specified, fetch all sessions
      Session.findAll((err, sessions) => {
        if (err) {
          res.status(500).json({ error: 'Failed to fetch sessions.' });
        } else {
          res.render('student_views/search_studentSessions', { sessions });
        }
      });
    }
  },


  // render admin students view with students data
  renderAdminStudents: (req, res) => {
    Student.findAll((err, students) => {
      if (err) {
        res.status(500).json({ error: 'Could not retrieve sessions.' });
      } else {
        // Render the admin sessions view and pass sessions data to Mustache template
        res.render('admin_views/admin_students', { students });
      }
    }
    );
  },

  // render add_student
  renderAddStudent: (req, res) => {
    res.render('admin_views/add_student');
  },

  // delete all students
  deleteAllStudents: (req, res) => {
    Student.deleteAll((err) => {
      if (err) {
        res.status(500).json({ error: 'Could not delete all students.' });
      } else {
        // Redirect to admin sessions view and send ok status
        res.status(200).json({ message: 'OK' });

      }
    }
    );
  },

  // initial search students
  initialSearchStudents: (req, res) => {
    Student.findAll((err, students) => {
      if (err) {
        res.status(500).json({ error: 'Failed to fetch students.' });
      } else {
        res.render('admin_views/search_students', { students });
      }
    });
  },

  // search students by firstName, lastName and degreeProgram array
  searchStudents: (req, res) => {

    const firstName = req.query.firstName || '';
    const lastName = req.query.lastName || '';
    const degreeProgram = req.query.degreePrograms || '';

    // Splitting degreePrograms on comma into an array
    const degreeProgramArray = degreeProgram.split(',');

    // Use the search criteria to query the students
    if (
      firstName !== '' ||
      lastName !== '' ||
      degreeProgram.length !== 0
    ) {
      // If search criteria specified, perform search
      Student.searchStudents(firstName, lastName, degreeProgramArray, (err, students) => {
        if (err) {
          res.status(500).json({ error: 'Search failed.' });
        } else {
          // Render the search_students view and pass students data to Mustache template
          res.json({ students });
        }
      });
    } else {
      // If no search criteria specified, handle accordingly (fetch all students or show an error)
      // Example: Fetch all students
      Student.findAll((err, students) => {
        if (err) {
          res.status(500).json({ error: 'Failed to fetch students.' });
        } else {
          res.render('admin_views/search_students', { students });
        }
      });
    }
  },

  // render edit_student:id
  renderEditStudent: (req, res) => {
    const student_id = req.params.id;

    Student.findById(student_id, (err, student) => {
      if (err) {
        res.status(500).json({ error: 'Could not find the student.' });
      } else {
        res.render('admin_views/edit_student', {
          _id: student._id,
          studentId: student.studentId,
          firstName: student.firstName,
          lastName: student.lastName,
          degreeProgram: student.degreeProgram,
          studentEmail: student.studentEmail,
          Age: student.Age,
          gender: student.gender,
          enrollmentDate: student.enrollmentDate,
          goals: student.goals,
          sessions: student.sessions,
        });
      }
    }
    );
  },

  // render admin mentors view with mentors data
  renderAdminMentors: (req, res) => {
    Mentor.findAll((err, mentors) => {
      if (err) {
        res.status(500).json({ error: 'Could not retrieve mentors.' });
      } else {
        // Render the admin sessions view and pass sessions data to Mustache template
        res.render('admin_views/admin_mentors', { mentors });
      }
    });
  },

  // render add_mentor
  renderAddMentor: (req, res) => {
    res.render('admin_views/add_mentor');
  },

  // delete all mentors
  deleteAllMentors: (req, res) => {
    Mentor.deleteAll((err) => {
      if (err) {
        res.status(500).json({ error: 'Could not delete all mentors.' });
      } else {
        // Redirect to admin sessions view and send ok status
        res.status(200).json({ message: 'OK' });

      }
    }
    );
  },

  // initial search mentors
  initialSearchMentors: (req, res) => {
    Mentor.findAll((err, mentors) => {
      if (err) {
        res.status(500).json({ error: 'Failed to fetch mentors.' });
      } else {
        res.render('admin_views/search_mentors', { mentors });
      }
    });
  },

  // search mentors by firstName, lastName, industry and profession
  searchMentors: (req, res) => {
    const firstName = req.query.firstName || '';
    const lastName = req.query.lastName || '';
    const industry = req.query.industry || '';
    const profession = req.query.profession || '';

    // Use the search criteria to query the mentors
    if (
      firstName !== '' ||
      lastName !== '' ||
      industry !== '' ||
      profession !== ''
    ) {
      // If search criteria specified, perform search
      Mentor.searchMentors(firstName, lastName, industry, profession, (err, mentors) => {
        if (err) {
          res.status(500).json({ error: 'Search failed.' });
        } else {
          // Render the search_mentors view and pass mentors data to Mustache template
          res.json({ mentors });
        }
      });
    } else {
      // If no search criteria specified, handle accordingly (fetch all mentors or show an error)
      // Example: Fetch all mentors
      Mentor.findAll((err, mentors) => {
        if (err) {
          res.status(500).json({ error: 'Failed to fetch mentors.' });
        } else {
          res.render('admin_views/search_mentors', { mentors });
        }
      });
    }
  },

  // render edit_mentor:id
  renderEditMentor: (req, res) => {
    const mentor_id = req.params.id;

    Mentor.findById(mentor_id, (err, mentor) => {
      if (err) {
        res.status(500).json({ error: 'Could not find the mentor.' });
      } else {
        res.render('admin_views/edit_mentor', {
          _id: mentor._id,
          firstName: mentor.firstName,
          lastName: mentor.lastName,
          Age: mentor.Age,
          gender: mentor.gender,
          profession: mentor.profession,
          industry: mentor.industry,
        });
      }}
    );
  },

  // render add_studentSession:id
  renderAddStudentSession: (req, res) => {
    const sessionId = req.params.id;

    Session.findById(sessionId, (err, session) => {
      if (err) {
        res.status(500).json({ error: 'Could not find the session.' });
      } else {

        Student.searchStudentsByName(req.user.firstName, req.user.lastName, (err, students) => {
          if (err) {
            res.status(500).json({ error: 'Could not find the student.' });
          } else {
            const studentId = students[0].studentId;

          // Add the student_id to the session
        Student.findByStudentId(studentId, (err, student) => {
          if (err) {
            res.status(500).json({ error: 'Could not find the student.' });
          } else {
          }
        });

        // update the student session
        Student.updateSessions(studentId, sessionId, (err, student) => {
          if (err) {
            res.status(500).json({ error: 'Could not update student session.' });
          } else {
            // Render the session details page and pass session data to Mustache template
            res.render('student_views/add_studentSession', {
              sessionName: session.sessionName,
              date: session.date,
              startTime: session.startTime,
              endTime: session.endTime,
              category: session.category,
              venue: session.venue,
              mandatory: session.mandatory,
              sessionId: sessionId // Pass sessionId for edit session URL
            });
          }
        });
      }
    });
  }
  }
  );
  },

  // render all student sessions
  renderAllStudentSessions: (req, res) => {

    // find student using first name
    Student.searchStudentsByName(req.user.firstName, req.user.lastName, (err, students) => {
      if (err) {
        res.status(500).json({ error: 'Could not find the student.' });
      } else {
        const studentId = students[0].studentId;

    Student.findByStudentId(studentId, (err, student) => {
      if (err) {
        res.status(500).json({ error: 'Could not find the student.' });
      } else {
        // console.log("student sessions: " + student.sessions);

        // find sessions byIds
        Session.findByIds(student.sessions, (err, sessions) => {
          if (err) {
            res.status(500).json({ error: 'Could not find the sessions.' });
          } else {

            res.render('student_views/added_sessions', { sessions });
          }
        }
        );
      }
    }
    );
  }
  }
  );
  },


  // render student goals
  renderStudentGoals: (req, res) => {
    Student.searchStudentsByName(req.user.firstName, req.user.lastName, (err, students) => {
      if (err) {
        res.status(500).json({ error: 'Could not find the student.' });
      } else {
        const studentId = students[0].studentId;

    Student.viewGoals(studentId, (err, student) => {
      if (err) {
        res.status(500).json({ error: 'Could not find the student.' });
      } else {
        res.render('student_views/student_goals', {
          goals: student.goals,
        });
      }
    });
  }
  }
  );
  },

  // render add student goal
  renderAddStudentGoal: (req, res) => {
    res.render('student_views/add_studentGoal');
  },

  // add Student Goal
  addStudentGoal: (req, res) => {
    Student.searchStudentsByName(req.user.firstName, req.user.lastName, (err, students) => {
      if (err) {
        res.status(500).json({ error: 'Could not find the student.' });
      } else {
        const studentId = students[0].studentId;

    const goalData = req.body.goal;

    Student.addGoals(studentId, goalData, (err, student) => {
      if (err) {
        res.status(500).json({ error: 'Could not add goal.' });
      } else {
        res.render('student_views/student_goals', {
          goals: student.goals,
        });
      }
    });
  }
  }
  );
  },

  // delete all student goals
  deleteAllStudentGoals: (req, res) => {
    Student.searchStudentsByName(req.user.firstName, req.user.lastName, (err, students) => {
      if (err) {
        res.status(500).json({ error: 'Could not find the student.' });
      } else {
        const studentId = students[0].studentId;

    Student.deleteAllGoals(studentId, (err, student) => {
      if (err) {
        res.status(500).json({ error: 'Could not delete all goals.' });
      } else {
        res.status(200).json({ message: 'OK' });
      }
    });
  }
  }
  );
  },

  // render admin opportunity
  renderAdminOpportunity: (req, res) => {
    res.render('admin_views/admin_opportunity');
  },

  // render admin settings
  renderAdminSettings: (req, res) => {
    res.render('admin_views/admin_settings');
  },

  // render admin profile
  renderAdminProfile: (req, res) => {
    res.render('admin_views/admin_profile');
  },

  // render admin report
  renderAdminReport: (req, res) => {
    res.render('admin_views/admin_report');
  },

};

module.exports = mainController;
