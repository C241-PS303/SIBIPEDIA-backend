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
        path: '/profile/{id}',
        handler: getProfile
    }

];

module.exports = routes;