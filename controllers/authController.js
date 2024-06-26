const { createAccountHandler, verifyTokenHandler, getUserProfileHandler} = require('../handlers/authHandler');
const createAccount = async (request, h) => {
    try {
        return await createAccountHandler(request, h);
    } catch (error) {
        console.error('Error in createAccount controller:', error);
        return h.response({ message: 'Internal Server Error' }).code(500);
    }
};

const auth = async (request, h) => {
    try {
        return await verifyTokenHandler(request, h);
    } catch (error) {
        console.error('Error in Auth controller:', error);
        return h.response({ message: 'Internal Server Error' }).code(500);
    }
};

const getProfile = async (request, h) => {
    try {
        return await getUserProfileHandler(request, h);
    } catch (error) {
        console.error('Error in getProfile controller:', error);
        return h.response({ message: 'Internal Server Error' }).code(500);
    }
}

module.exports = {
    createAccount,
    auth,
    getProfile
};
