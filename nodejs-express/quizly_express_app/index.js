const dotenv = require('dotenv');
const express = require('express');
const path = require('path');
const { connectDB } = require('./src/db');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./src/graphql/schema');
const cookieParser = require('cookie-parser');
const { authenticate } = require('./src/middleware/auth');
const { userData } = require('./src/middleware/userData');

// loads the .env file into the process.env
dotenv.config();
// Creates the express application
const app = express();
// Connects to the database
connectDB();

// Add cookie-parser middleware to add cookie headers to the req.cookie
app.use(cookieParser())

// Add authentication middleware to the app
app.use(authenticate)

// Add userData middleware AFTER authentication middleware
app.use(userData);

// Add graphql to the express application
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true // Allows us to use the GraphiQL test tool
}));

// Set the view engine to ejs
app.set('view engine', 'ejs')
// Update the location of the views folder that res.render uses
app.set('views', path.join(__dirname, 'src/templates/views'))

// Need this middleware so that form data is added to request
app.use(express.urlencoded({ extended: true }))

// app.get('/', (req, res) => {
//     res.render('dashboard')
// });

// Initialize routes
const initRoutes = require('./src/routes');
initRoutes(app);


app.listen(process.env.PORT, () => {
    console.log(`Server is now running on port ${process.env.PORT}`)
})
