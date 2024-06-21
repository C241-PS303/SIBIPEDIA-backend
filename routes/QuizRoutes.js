const {  getQuizQuestions,verifyUserAnswer,getUserResult} = require('../controllers/QuizController.js');
const {auth} = require('../controllers/authController.js'); 

const routes = [
    {
        method: 'POST',
        path: '/quiz/verify-answer',
        handler: async (request, h) => {
            const authResponse = await auth(request, h);
            if (authResponse.statusCode === 200) {
                const uid = authResponse.source.uid;
                return verifyUserAnswer(request, h, uid);
            } else {
                return authResponse;
            }
        }
    },
    {
        method: 'GET',
        path: '/quiz/user',
        handler: async (request, h) => {
            const authResponse = await auth(request, h);
            if (authResponse.statusCode === 200) {
                const uid = authResponse.source.uid;
                return getUserResult(request, h, uid);
            } else {
                return authResponse;
            }
        }
    },
    {
        method: 'GET',
        path: '/quiz/questions',
        handler: async (request, h) => {
            const authResponse = await auth(request, h);
            if (authResponse.statusCode === 200) {
                return getQuizQuestions(request, h);
            } else {
                return authResponse;
            }
        }
    }
];


module.exports = routes;