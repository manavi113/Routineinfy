const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    weatherType: {
        type: String,
        default: 'any', // hot, cold, pleasant, etc.
    }
}, { timestamps: true });

const Home = mongoose.model('Home', homeSchema, 'Home');

module.exports = Home;
