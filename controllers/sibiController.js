const { getAllSibiAlphabet,getAllSibiWords} = require('../handlers/sibiHandler');

const getSibiAlphabet = async (request, h) => {
    try {
        const signedUrl = await getAllSibiAlphabet('sibipedia-resources', 'alphabet-png');
        return h.response({ signedUrl }).code(200);
    } catch (err) {
        console.error('Error:', err);
        return h.response({ error: 'Failed to generate signed URL' }).code(500);
    }
};

const getSibiWords = async (request, h) => {
    try {
        const signedUrl = await getAllSibiWords('sibipedia-resources', 'words-png');
        return h.response({ signedUrl }).code(200);
    } catch (err) {
        console.error('Error:', err);
        return h.response({ error: 'Failed to generate signed URL' }).code(500);
    }
};

module.exports = {
    getSibiAlphabet,
    getSibiWords
};
