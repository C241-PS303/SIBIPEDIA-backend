const { getAllSibiAlphabet } = require('../handlers/sibiHandler');

const getSibiAlphabet = async (request, h) => {
    try {
        const signedUrl = await getAllSibiAlphabet('bwwaaaaajinggaannn', 'image');
        return h.response({ signedUrl }).code(200);
    } catch (err) {
        console.error('Error:', err);
        return h.response({ error: 'Failed to generate signed URL' }).code(500);
    }
};

module.exports = {
    getSibiAlphabet
};
