const mainController = {
    // Render the homepage
    renderHomePage: (req, res) => {
      res.render('about'); // Assuming you have a "home.mustache" template for the homepage
    },

    // render student dashboard
    renderStudentDashboard: (req, res) => {
        res.render('student_views/student_dashboard');
    },

    // render mentor dashboard
    renderAdminDashboard: (req, res) => {
        res.render('admin_views/admin_dashboard');
    },

    // render admin sessions view
    renderAdminSessions: (req, res) => {
        res.render('admin_views/admin_sessions');
    },

    // render add_session
    renderAddSession: (req, res) => {
        res.render('admin_views/add_session');
    }
  };
  
module.exports = mainController;
  