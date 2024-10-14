# Swida Transport Management System

A simplified transport management system.

## Project Description

This monorepo contains separate folders for the front-end (Vue.js) and back-end (Express.js) applications, along with a shared `models` folder used by both. The front-end uses Bootstrap for demonstration purposes.

## Setup

1. **Install Dependencies**
   - Navigate to both the front-end (`FE`) and back-end (`BE`) folders and install the dependencies using:
     ```
     npm install
     ```

2. **Database Setup**
   - The back-end uses PostgreSQL. Use the `db_dump` file to initialize the database.
   - The database connection details are hardcoded for simplicity:
     ```javascript
     host: 'localhost',
     database: 'swida_transport',
     user: 'root',
     password: 'root',
     port: 5432
     ```

3. **Run the Applications**
   - Start both the front-end and back-end applications with:
     ```
     npm run dev
     ```
