const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Connect to MongoDB
mongoose.connect(' mongodb://127.0.0.1:27017/UserDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log('Error connecting to MongoDB:', error));

// Create a schema for the data
const userDataSchema = new mongoose.Schema({
  name: String,
  age: Number
});

// Create a model based on the schema
const UserData = mongoose.model('UserData', userDataSchema);

// Set up EJS as the view engine
app.set('view engine', 'ejs');

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Home route
app.get('/', (req, res) => {
  res.render('home');
});

// Handle form submission
app.post('/submit', (req, res) => {
  // Create a new instance of the UserData model
  const userData = new UserData({
    name: req.body.name,
    age: req.body.age
  });

  // Save the data to the database
  userData.save()
    .then(() => {
      console.log('Data saved successfully');
      res.redirect('/');
    })
    .catch(error => {
      console.log('Error saving data:', error);
      res.redirect('/');
    });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
