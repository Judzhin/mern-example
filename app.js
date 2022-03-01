// console.log('Hello World!!');
const express = require('express');
const config = require('config');
const mongoose = require('mongoose');

const app = express();

// Register routes
app.use('/api/auth', require('./routes/auth.routes'));

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const PORT = config.get('appPort') || 5000;
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start();

