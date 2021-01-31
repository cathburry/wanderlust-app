# Wanderlust Application

## Libraries used
* React.JS & TypeScript for the frontend
* Redux for state management
* Node.JS & Express for the backend
* MongoDB for the database
* Sass for the CSS Framework
* Formik and Yup to validate the form prior to submitting/inserting the fields into MongoDb.

## Database Schema

```
const ShiftsSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

```

## To support multiple users:
* Need to develop user authentication and user roles, accounts, and permissions such as admins

## How to run locally
* Ensure that node, npm and MongoD Server are installed on your local machine.
* Clone this repo
* cd into the ***client*** directory and run ***npm install***.
* after installing, run ***cd .. && npm install && npm run start***

# Wanderlust Application
