const firebaseAdmin = require("firebase-admin");


const createAccountHandler = async (request, h) => {
    try {
        const { email, password, displayName, phoneNumber } = request.payload;
        const userCredential = await firebaseAdmin.auth().createUser({ email, password, displayName, phoneNumber });

        if (userCredential && userCredential.uid) {
            const uid = userCredential.uid;
            console.log('User created:', uid);
            const customToken = await firebaseAdmin.auth().createCustomToken(uid, { expiresIn: '24h' });
            console.log(customToken);
            console.log(userCredential);
            return { userCredential, customToken };
        } else {
            console.error('Error creating account: User data not found in userCredential');
            return { userCredential, customToken: null };
        }
    } catch (error) {
        console.error('Error creating account:', error.message);
        return h.response({ message: 'Error creating account' }).code(500);
    }
};

const verifyTokenHandler = async (request, h) => {
    try {
        const authorizationHeader = request.headers.authorization;
        console.log(authorizationHeader);

        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return h.response({ message: 'Token not provided or invalid format' }).code(401);
        }

        const token = authorizationHeader.split(' ')[1];
        console.log("token:",token);

        const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
        console.log("decoded token:",decodedToken);

        const uid = decodedToken.uid;
        const email = decodedToken.email;

        return h.response({ message: 'Authenticated user', uid, email }).code(200);
    } catch (error) {
        console.error('Error verifying token:', error);
        return h.response({ message: 'Invalid token' }).code(401);
    }
};

module.exports = {
    createAccountHandler,
    verifyTokenHandler,

};
