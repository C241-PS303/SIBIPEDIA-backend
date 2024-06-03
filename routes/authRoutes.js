const { createAccount,userLogin } = require('../controllers/authController');

const routes = [
    {
        method: 'POST',
        path: '/register',
        handler: createAccount
        
    },
    {
        method: 'GET',
        path: '/login',
        handler: userLogin
        
    }
];

module.exports = routes;