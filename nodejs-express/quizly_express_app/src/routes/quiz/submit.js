const axios = require('axios');

module.exports = async (req, res) => {
    const slug = req.params.slug;

    let answers = [];
    let submissionId;

    for (const answer in req.body){
        if (answer !== 'title' && answer !== 'quizId'){
            answers.push({
                questionId: answer,
                answer: req.body[answer]
            })
        }
    }

    try{
        const mutation = `
            mutation submitQuiz($userId: ID!, $quizId: ID!, $answers: [AnswerInput!]!){
                submitQuiz(userId: $userId, quizId: $quizId, answers: $answers)
            }
        `
        const { data } = await axios.post(process.env.GRAPHQL_ENDPOINT, 
            {
                query: mutation,
                variables: {
                    quizId: req.body.quizId,
                    userId: req.verifiedUser.user._id,
                    answers
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        submissionId = data.data.submitQuiz;

        res.redirect(`/quiz/results/${submissionId}`)
    } catch(err) {
        console.log(err)
    }
}