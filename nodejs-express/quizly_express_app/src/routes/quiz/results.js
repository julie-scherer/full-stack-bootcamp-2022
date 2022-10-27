const axios = require("axios");

module.exports = async (req, res) => {
    const query = `
        query submissionById($id: ID!){
            submissionById(id: $id){
                id,
                quiz{
                    title
                },
                user {
                    id
                },
                score
            }
        }
    `
    let submission = {}

    try{
        const { data } = await axios.post(process.env.GRAPHQL_ENDPOINT, 
            {
                query,
                variables: {
                    id: req.params.id
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        submission = data.data.submissionById;

        if (submission.user.id !== req.verifiedUser.user._id){
            res.redirect('/')
        }

        res.render('quiz-results', { submission })
    } catch (err) {
        console.log(err)
    }
}