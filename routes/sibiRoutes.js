const { getSibiAlphabet,getSibiWords } = require('../controllers/sibiController');

const routes = [
    {
        method: 'GET',
        path: '/sibi-alphabet',
        handler: getSibiAlphabet
        
    },
    {
        method: 'GET',
        path: '/sibi-words',
        handler: getSibiWords
        
    }
];

module.exports = routes;