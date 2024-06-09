const mongoose = require('mongoose');

// Replace the existing MongoDB connection URI with the new one
const atlasURI = 'mongodb+srv://vedhavarshiniy111:NkwsKNXYdpVzHsq9@people.vzfrxax.mongodb.net/signupyt?retryWrites=true&w=majority&appName=People';

mongoose.connect(atlasURI)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(() => {
        console.log("Failed to connect!");
    });

const logInSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = new mongoose.model("Collection1", logInSchema);

module.exports = collection;
