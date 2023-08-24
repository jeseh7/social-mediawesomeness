const mongoose = require('mongoose');

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const User = new mongoose.Schema({
  username: { type: String, unique: true, required: true, trim: true },
  email: {type: String, required: true, unique: true, lowercase: true, 
    validate: [validateEmail, 'Please fill a valid email address'], 
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']},
  thoughts: {id: }
});

// The employeeScheme defines the shape for the employee subdocument
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  salary: Number,
});

// departmentSchema provides the shape of the parent document
const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // This will add a single subdocument to include the manager's information
  manager: managerSchema,
  // This will include an array that holds all the employees' information
  employees: [employeeSchema],
  lastAccessed: { type: Date, default: Date.now },
});

// Uses mongoose.model() to create model
const Department = mongoose.model('Department', departmentSchema);

// Uses model to create new instance including subdocument
const managerData = { name: 'Taylor', salary: 80000 };
const employeeData = [
  { name: 'Ann', salary: 40000 },
  { name: 'Liu', salary: 50000 },
];

Department
  .create({ name: 'Shoes', manager: managerData, employees: employeeData })
  .then(data => console.log(data))
  .catch(err => console.error(err));

module.exports = Department;
