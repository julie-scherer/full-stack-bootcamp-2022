const jwt = require('jsonwebtoken');

// Create a function that takes in a user
const createJwtToken = (user) => {
    // Create a token with the user object and secret key
    return jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRY
    })
}

module.exports = { createJwtToken }
