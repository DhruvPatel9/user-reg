// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const app = express();

// // Connect to MongoDB
// mongoose.connect(' mongodb://127.0.0.1:27017/UserDB', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(error => console.log('Error connecting to MongoDB:', error));

// // Create a schema for the data
// const EmployeeSchema = new mongoose.Schema({
//   name: String,
//   home_location: String,
//   shift_opted: String,
//   preferences: { leaves: Boolean,
//   work_from_home: Boolean}
// });

// // Create a model based on the schema
// const Employee = mongoose.model('Employee', EmployeeSchema);

// // Set up EJS as the view engine
// app.set('view engine', 'ejs');

// // Parse URL-encoded bodies
// app.use(bodyParser.urlencoded({ extended: true }));

// // Home route
// app.get('/', (req, res) => {
//   res.render('home');
// });

// // Handle form submission
// app.post('/submit', (req, res) => {
//   // Create a new instance of the Employee model
//   const Employee = new EmployeeSchema({
//     name: req.body.name,
//     age: req.body.age
//   });

//   // Save the data to the database
//   Employee.save()
//     .then(() => {
//       console.log('Data saved successfully');
//       res.redirect('/');
//     })
//     .catch(error => {
//       console.log('Error saving data:', error);
//       res.redirect('/');
//     });
// });

// // Start the server
// app.listen(3000, () => {
//   console.log('Server is running on http://localhost:3000');
// });


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/UserDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log('Error connecting to MongoDB:', error));

// Create a schema for the Employee collection
const EmployeeSchema = new mongoose.Schema({
  employee_id: { type: String, unique: true },
  name: String,
  home_location: String,
  shift_opted: String,
  preferences: {
    leaves: Boolean,
    work_from_home: Boolean
  },
  cab_id: String,
  driver_id: String
});

// Create a model based on the schema
const Employee = mongoose.model('Employee', EmployeeSchema);

// Create a schema for the Drivers collection
const DriverSchema = new mongoose.Schema({
  driver_id: { type: String, unique: true },
  name: String,
  contact_number: String,
  route: String,
  cab_id: String
});

// Create a model based on the schema
const Driver = mongoose.model('Driver', DriverSchema);

// Create a schema for the Cabs collection
const CabSchema = new mongoose.Schema({
  cab_id: { type: String, unique: true },
  number_plate: String,
  capacity: Number,
  garage_location: String
});

// Create a model based on the schema
const Cab = mongoose.model('Cab', CabSchema);

// Create a schema for the Holidays collection
const HolidaySchema = new mongoose.Schema({
  holiday_id: { type: String, unique: true },
  date: Date,
  description: String
});

// Create a model based on the schema
const Holiday = mongoose.model('Holiday', HolidaySchema);

// Create a schema for the Co-Employees collection
const CoEmployeeSchema = new mongoose.Schema({
  employee_id: { type: String, unique: true },
  co_employees: [{
    employee_id: { type: String, unique: true },
    name: String
  }]
});

// Create a model based on the schema
const CoEmployee = mongoose.model('CoEmployee', CoEmployeeSchema);

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Home route
app.get('/', (req, res) => {
  res.render('home');
});

// Handle form submission for Employee
app.post('/employees', (req, res) => {
  const employee = new Employee({
    employee_id: req.body.employee_id,
    name: req.body.name,
    home_location: req.body.home_location,
    shift_opted: req.body.shift_opted,
    preferences: {
      leaves: req.body.leaves,
      work_from_home: req.body.work_from_home
    },
    cab_id: req.body.cab_id,
    driver_id: req.body.driver_id
  });

  employee.save()
    .then(() => {
      console.log('Employee saved successfully');
      res.redirect('/');
    })
    .catch(error => {
      console.log('Error saving employee:', error);
      res.redirect('/');
    });
});

// Handle form submission for Driver
app.post('/drivers', (req, res) => {
  const driver = new Driver({
    driver_id: req.body.driver_id,
    name: req.body.name,
    contact_number: req.body.contact_number,
    route: req.body.route,
    cab_id: req.body.cab_id
  });

  driver.save()
    .then(() => {
      console.log('Driver saved successfully');
      res.redirect('/');
    })
    .catch(error => {
      console.log('Error saving driver:', error);
      res.redirect('/');
    });
});

// Handle form submission for Cab
app.post('/cabs', (req, res) => {
  const cab = new Cab({
    cab_id: req.body.cab_id,
    number_plate: req.body.number_plate,
    capacity: req.body.capacity,
    garage_location: req.body.garage_location
  });

  cab.save()
    .then(() => {
      console.log('Cab saved successfully');
      res.redirect('/');
    })
    .catch(error => {
      console.log('Error saving cab:', error);
      res.redirect('/');
    });
});

// Handle form submission for Holiday
app.post('/holidays', (req, res) => {
  const holiday = new Holiday({
    holiday_id: req.body.holiday_id,
    date: req.body.date,
    description: req.body.description
  });

  holiday.save()
    .then(() => {
      console.log('Holiday saved successfully');
      res.redirect('/');
    })
    .catch(error => {
      console.log('Error saving holiday:', error);
      res.redirect('/');
    });
});

// Handle form submission for Co-Employee
app.post('/coemployees', (req, res) => {
  const coEmployee = new CoEmployee({
    employee_id: req.body.employee_id,
    co_employees: req.body.co_employees
  });

  coEmployee.save()
    .then(() => {
      console.log('Co-Employee saved successfully');
      res.redirect('/');
    })
    .catch(error => {
      console.log('Error saving co-employee:', error);
      res.redirect('/');
    });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});

