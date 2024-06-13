const { createAccount, auth, getProfile} = require('../controllers/authController');

const routes = [
    {
        method: 'POST',
        path: '/register',
        handler: createAccount
        
    },
    {
        method: 'POST',
        path: '/auth',
        handler: auth
        
    },
    {
        method: 'GET',
        path: '/profile',
        handler: async (request, h) => {
            const authResponse = await auth(request, h);
            if (authResponse.statusCode === 200) {
                return getProfile(request, h);
            } else {
                return authResponse;
            }
        }
    }

];

module.exports = routes;