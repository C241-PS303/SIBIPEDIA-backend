const { createAccount, auth} = require('../controllers/authController');

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

];

module.exports = routes;