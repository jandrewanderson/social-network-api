const connection = require('../config/connection');
const { User, Thought } = require('../models');
const user = require('./data')

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');
    await User.deleteMany({});

    await User.insertMany(user);

    console.table(user);
    console.info('Seeding complete!');
    process.exit(0);
});
