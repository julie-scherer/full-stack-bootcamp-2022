const mongoose = require('mongoose');


const connectDB = async () => {
    const connection = await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected!')
}

module.exports = { connectDB }
