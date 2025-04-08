const mongoose = require('mongoose');
const chalk = require('chalk');

const uri = 'mongodb://root:example@localhost:27017/library-system?authSource=admin';

mongoose.connect(uri)
    .then(() => console.log(chalk.green.bold('Database connected successfully!')))
    .catch(() => console.log(chalk.red.bold('Database connection failed!')));

