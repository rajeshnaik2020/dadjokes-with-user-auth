// Essential middleware / dependencies
const express = require('express');
const session = require('express-session');
const path = require('path');
const db = require('./config/dbinfo');
const app = express();
const port = 80;

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: 'your_secret_key',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false },
  saveUninitialized: true,
  cookie: { maxAge: 1800000 } // 30
}));

// Custom middleware that uses the Session middleware
app.use((req, res, next) => {
  // Adds custom method to response object
  res.unauthorizedRedirect = function(message) {
    // Stores the message in session
    req.session.authError = message;
    // Redirects to login page
    res.redirect('/features/login/login.html');
  };
  next();
});

// Serve Non-Protected routes / files / pages of the app
app.use(express.static(path.join(__dirname, 'views')));
app.use('/features/signup', express.static(path.join(__dirname, 'features/signup')));
app.use('/features/login', express.static(path.join(__dirname, 'features/login')));
app.use('/features/addjoke', express.static(path.join(__dirname, 'features/addjoke')));
app.use('/features/logout', express.static(path.join(__dirname, 'features/logout')));
// Serve Protected routes / files / pages of the app
app.use('/features/jokelist', isAuthenticated, express.static(path.join(__dirname, 'features/jokelist')));

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  console.log('Session check:', req.session);
  console.log('User ID in session:', req.session.userId);
  if (req.session && req.session.userId) {
    console.log('Authentication successful for user ID:', req.session.userId);
    return next();
  }
  console.log('Authentication failed - redirecting to login');
  res.unauthorizedRedirect('Unauthorized: Please log in to access this page.');
}

// Entry point for app
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// API routes
const jokeRouter = require('./apiserver');
//Middleware to pass session to apiserver routes
app.use('/japi', (req, res, next) => {
  console.log('API request with session:', !!req.session);
  next();
}, jokeRouter);

// Authentication check route
app.get('/check-auth', (req, res) => {
  if (req.session.userId) {
    res.json({ loggedIn: true, username: req.session.username });
  } else {
    res.json({ loggedIn: false });
  }
});

// Error Handling system for unauthorized access
app.get('/check-auth-error', (req, res) => {
  const authError = req.session.authError;
  // Clear the error after sending it
  req.session.authError = null;
  res.json({ authError });
});

// Logout route
console.log('Registering logout route: /japi/logout');

app.post('/japi/logout', (req, res) => {
  console.log('Logout request received');
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.status(500).json({ message: 'Error logging out' });
    }
    
    console.log('Session destroyed successfully');
    // Send success response
    res.status(200).json({ message: 'Logout successful' });
  });
});

// Other routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// 404 route
app.use((req, res) => {
  res.status(404).send(`
    <html>
      <head>
        <title>Page Not Found</title>
      </head>
      <body>
        <h1>The page you are trying to access does not exist.</h1>
        <p>Enjoy some jokes by going to the:</p>
        <p>Dad Jokes <a href="/">HOME</a>.</p>
      </body>
    </html>
  `);
});

// Start the Server
app.listen(port, () => {
  console.log('Server started on port 80');
});

// npm install should be run for the first time to ensure all dependencies are installed for node.js before starting the app.
// To start the app using the standard method from the start script in the projects package.json file run:
// npm start
// Starts the nodeman tool from the dev script defined in the project’s package.json file run:
// npm run dev








