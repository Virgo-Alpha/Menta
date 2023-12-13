const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');

const mainRoutes = require('./routes/mainRoutes'); // Import the mainRoutes

const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Set up Mustache as the view engine
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mount the mainRoutes
app.use('/', mainRoutes); // Mount the mainRoutes

// Serving static files from the 'public' directory
app.use(express.static('public'));

// app.post('/login', passport.authenticate('local', {
//   successRedirect: '/dashboard',
//   failureRedirect: '/login',
//   failureFlash: true // Display flash messages for failed login
// }));

// app.post('/register', (req, res) => {
//   const { username, password } = req.body;
//   bcrypt.hash(password, 10, (err, hash) => {
//     if (err) throw err;
//     const newUser = new User({ username, password: hash });
//     newUser.save((err, user) => {
//       if (err) throw err;
//       res.redirect('/login');
//     });
//   });
// });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
