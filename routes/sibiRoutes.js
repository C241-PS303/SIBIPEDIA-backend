const { getSibiAlphabet } = require('../controllers/sibiController');

const routes = [
    {
        method: 'GET',
        path: '/sibi-alphabet',
        handler: getSibiAlphabet
        
    }
];

module.exports = routes;