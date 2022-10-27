const axios = require('axios');

module.exports = async (req, res) => {
    const quizInputs = req.body

    const quizData = {
        userId: req.verifiedUser.user._id,
        title: quizInputs.quizTitle,
        description: quizInputs.quizDescription,
        questions: []
    }

    for (const key in quizInputs){
        if (key.includes('questionTitle')){
            const questionNum = parseInt(key.split('questionTitle')[1])

            // If quizData question does not exist, add new questions until it does
            while (!quizData.questions[questionNum]){
                quizData.questions.push({})
            }
            quizData.questions[questionNum].title = quizInputs[key]
        } else if (key.includes('questionAnswer')){
            const questionNum = parseInt(key.split('questionAnswer')[1])
            quizData.questions[questionNum].correctAnswer = quizInputs[key]
            quizData.questions[questionNum].order = questionNum + 1
        }
    }

    const mutation = `
        mutation createQuiz($userId: ID!, $title: String!, $description: String!, $questions: [QuestionInput!]!){
            createQuiz(userId: $userId, title: $title, description: $description, questions: $questions)
        }
    `
    let quizSlug = '';
    try{
        const { data } = await axios.post(process.env.GRAPHQL_ENDPOINT,
            {
                query: mutation,
                variables: quizData
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        quizSlug = data.data.createQuiz
    } catch(err) {
        console.log(err)
    }

    res.redirect('/')
}