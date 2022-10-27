const axios = require('axios')


module.exports = async (req, res) => {
    if (req.body.password !== req.body.confirmPass){
        res.send({error: "Your passwords do not match"})
        return
    }
    try{
         // Create the GraphQL mutation
        const mutation = `
        mutation register($email: String!, $username: String!, $password: String!){
            register( email: $email, username: $username, password: $password)
        }
        `
        // Make a POST request to GraphQL with a request body with the query and variable from the request
        const { data } = await axios.post(process.env.GRAPHQL_ENDPOINT,
            {
                query: mutation,
                variables: {
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password,
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        // Get the token from the response from GraphQL
        const jwtToken = data.data.register
        console.log(jwtToken)
        // Add the cookie to the response
        res.cookie('jwtToken', jwtToken, { maxAge: 900000, httpOnly: true })
        // Redirect back to the dashboard
        res.redirect('/')
        
    } catch(e) {
        // If there is an issue, redirect back to login
        console.log(e);
        res.redirect('/auth/register')
    }
}