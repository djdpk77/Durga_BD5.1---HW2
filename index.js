const express = require('express');
const { resolve } = require('path');

const app = express();
let { sequelize } = require('./lib/index');
let { employee } = require('./models/employee.model');

let employeesData = [
  {
    name: 'Alice Smith',
    department: 'Marketing',
    salary: 60000,
    designation: 'Marketing Manager',
  },
  {
    name: 'Bob Johnson',
    department: 'Sales',
    salary: 55000,
    designation: 'Sales Executive',
  },
  {
    name: 'Charlie Brown',
    department: 'Human Resources',
    salary: 50000,
    designation: 'HR Specialist',
  },
];

app.get('/seed_db', async (req, res) => {
  try {
    await sequelize.sync({ force: true });

    await employee.bulkCreate(employeesData);

    return res.status(200).json({ message: 'Database seeding successfull' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Error seeding the data', error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
