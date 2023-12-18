// sessionTimeout.js

function sessionTimeout(req, res, next) {
  const maxIdleTime = 1 * 60 * 1000; // ! 1 hour in milliseconds
  const lastActivity = req.session.lastActivity || Date.now();
  console.log('lastActivity: ' + lastActivity);

  const currentTime = Date.now();

  if (currentTime - lastActivity > maxIdleTime) {
    req.session.destroy(); // Destroy the session if idle time exceeds the limit
    console.log('Session timed out');
    res.render('login', {error: 'Session timed out. Please log in...'}); // Redirect to login page
  }

  req.session.lastActivity = currentTime; // Update last activity timestamp
  next();
}

module.exports = sessionTimeout;
