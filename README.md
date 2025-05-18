# Dad Jokes App - a JavaScript Based Web App

**Introducing "Dad Jokes: The Ultimate Source of Cheesy Laughter!"**

![image](https://github.com/Buchatech/dadjokes/assets/22551494/e528dc2e-3a91-49a5-9525-7147f31a68c4)

>Are you ready to embark on a hilarious journey into the world of dad jokes? Look no further! Our JavaScript Dad Jokes web app is here to tickle your funny bone and leave you in stitches.

>Get ready to embrace the sheer delight of cringeworthy humor as you explore an extensive collection of pun-tastic dad jokes. With just a click of a button, our app will serve you a fresh dose of laughter, guaranteed to make you groan and giggle at the same time.

>But wait, there's more! Feel like sharing your own gems of comedic genius? Our app allows you to add your very own dad jokes to the ever-expanding repertoire. Spread the laughter and watch as your jokes become part of the delightfully cheesy tapestry of dad humor.

*Get ready to laugh!*

## App Purpose

I built this basic JavaScript app to be used for learning. Feel free to use this repo to get started with JavaScript.

I also used this app in one of my JavaScript courses on Pluralsight. You can find my Pluralsight author profile here: [Steve Buchanan on Pluralsight](https://www.pluralsight.com/authors/steve-buchanan).

## System Architecture

The Dad Jokes application follows a traditional client-server architecture:

- **Frontend**: HTML, Bootstrap CSS, JavaScript
- **Backend**: Node.js with Express.js
- **Database**: MySQL
- **Authentication**: Session-based with password hashing via bcrypt

## Features
- User signup and login with secure password hashing (using Bcrypt).
- Add, view, and edit jokes.
- Protected routes for authenticated users.
- Dynamic UI based on authentication state.
- Session management with timeout.
- Secure password storage.

## Core Components

### 1. Backend Server (index.js)
- Configures middleware
- Manages sessions
- Routes requests
- Protects sensitive resources
- Serves static content

### 2. API Server (apiserver.js)
- User authentication routes (signup, login, logout)
- CRUD operations for jokes
- Database interactions

### 3. Database (MySQL)
- User data (username, email, hashed passwords)
- Joke data (questions, answers, ratings)

### 4. Client-Side UI
- Authentication pages (login, signup)
- Joke display pages
- Navigation elements that adapt to authentication state

## Prerequisites
- Node.js (v14 or later)
- MySQL database

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd dadjokes-main
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up the Database**:
   - Create a MySQL database.
   - Run the SQL scripts in `setup/createdbandinsertjokes/` to set up the database schema and seed data:
     ```sql
     createDBandJokesTable.sql
     createUsersTable.sql
     insertJokes.sql
     ```

4. **Configure the Database Connection**:
   - Update the `config/dbinfo.js` file with your database credentials.

5. **Run the Application Locally**:
   ```bash
   npm start
   ```
   The app will be available at `http://localhost:3000`.

## Authentication System

### User Registration
- Secure signup with bcrypt password hashing
- Email and username validation
- Success/error feedback

### User Login
- Credential verification against database
- Session creation on successful authentication
- Redirect to protected content

### Route Protection
- Middleware-based authentication checks
- Redirect to login page with error messages
- Protection for specific files/directories

### Session Management
- Express-session for maintaining authentication state
- Configurable session timeout
- Secure cookie handling

### User Logout
- Session destruction
- Redirect to home page

## Joke Management API

| Operation | Route | Description |
|-----------|-------|-------------|
| Create | `/japi/jokes` (POST) | Adds a new joke |
| Read All | `/japi/jokes` (GET) | Returns all jokes |
| Read One | `/japi/jokes/:id` (GET) | Returns specific joke |
| Random | `/japi/randomjokes` (GET) | Returns random joke |
| Update | `/japi/jokes/:id` (PUT) | Edits existing joke |
| Delete | `/japi/jokes/:id` (DELETE) | Removes a joke |

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  hashed_password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Jokes Table
```sql
CREATE TABLE jokes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  rating INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Security Features

1. **Password Hashing**: Uses bcrypt with 10 rounds of salting
2. **Session Security**: Configurable session timeout (30 minutes)
3. **Access Control**: Middleware-based route protection
4. **Error Handling**: Non-revealing error messages for security
5. **SQL Injection Prevention**: Parameterized queries for database operations

## App Purpose
I built this basic JavaScript app to be used for learning. Feel free to use this repo to get started with JavaScript. 
<!-- Visit a running demo of this app here: [Dad Jokes App](https://dad-jokes-mz8s.onrender.com) -->

I also used this app in one of my JavaScript courses on Pluralsight. 
You can find my Pluralsight author profile here: [Steve Buchanan on Pluralsight](https://www.pluralsight.com/authors/steve-buchanan).

## App Architecture
This app consists of:
- HTML 
- Bootstrap CSS
- JavaScript
- Node.js 
- Express
<img width="700" alt="image" src="https://github.com/Buchatech/dadjokes/assets/22551494/70efed66-548e-468c-b323-06b47502e58d">

## App Deployment 
This app requires a MySQL database. You will need to host the database somewhere. In the repo there are files with SQL code for creating the database, table, and for inserting the jokes. The folder path is *dadjokes/setup/createdbandinsertjokes/*

- createDBandJokesTable.sql
- createUsersTable.sql
- insertJokes.sql

I have tested two deployment options for deploying this app. These are:

- This app can be deployed to the free tier on www.render.com with ease using these steps: [Deploy a Node Express App to Render](https://render.com/docs/deploy-node-express-app). 
- This app can be containerized and deployed with ease to [Azure Kubernetes Service (AKS)](https://azure.microsoft.com/en-us/products/kubernetes-service) a cloud managed Kubernetes cluster using these steps here: [Automated Deployments for AKS](https://learn.microsoft.com/en-us/azure/aks/automated-deployments).

- **Note:** If you want to run the app locally check out the steps in the *dadjokes/setup/runlocally/localbuild.txt* file.

## Potential Roadmap Enhancements

1. **Password Recovery**: Implement forgotten password functionality
2. **Email Verification**: Add email verification during signup
3. **CSRF Protection**: Add CSRF tokens for form submissions
4. **Rate Limiting**: Implement API rate limiting for security
5. **User Profiles**: Allow users to manage their profile information
6. **Remember Me**: Add persistent login functionality
7. **Social Authentication**: Integrate with OAuth providers
8. **Advanced Access Control**: Role-based permissions system
9. **Joke Ownership**: Associate jokes with users who created them
10. **Analytics**: Track user interaction and popular jokes

## License
This project is licensed under the MIT License.

**Be sure to visit my blog [www.buchatech.com](http://www.buchatech.com) to stay up to date on my adventures in tech!**

*Happy Coding!*
