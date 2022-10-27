const axios = require('axios');

module.exports = async(req, res) => {
    const slug = req.params.slug;
    let quizData = {}

    const query = `
        query quizBySlug($slug: String!){
            quizBySlug( slug: $slug ){
                id,
                slug,
                title,
                description,
                questions {
                    id,
                    title,
                    order,
                    correctAnswer
                }
            }
        }
    `
    try{
        const { data } = await axios.post(process.env.GRAPHQL_ENDPOINT,
            {
                query,
                variables: { slug }
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        
        quizData = data.data.quizBySlug
        res.render('quiz', { quiz: quizData })

    } catch(err) {
        console.log(err)
    }
}