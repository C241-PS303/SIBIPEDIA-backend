const { getSibiAlphabet, getSibiWords} = require('../controllers/sibiController');
const {auth} = require('../controllers/authController'); 
const routes = [
    {
        method: 'GET',
        path: '/sibi/alphabet',
        handler: async (request, h) => {
            const authResponse = await auth(request, h);
            if (authResponse.statusCode === 200) {
                return getSibiAlphabet(request, h);
            } else {
                return authResponse;
            }
        }
    },
    {
        method: 'GET',
        path: '/sibi/words',
        handler: async (request, h) => {
            const authResponse = await auth(request, h);
            if (authResponse.statusCode === 200) {
                return getSibiWords(request, h);
            } else {
                return authResponse;
            }
        }
    }
    
];

module.exports = routes;
