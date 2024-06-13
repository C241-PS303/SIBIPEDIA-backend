const firebaseAdmin = require("firebase-admin");
const validator = require("validator");

const serviceAccount = {
};

firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});

const createAccountHandler = async (request, h) => {
    try {
        const { email, password, displayName, phoneNumber } = request.payload;

        const errors = [];

        // Validasi field kosong
        if (!email) errors.push('Email tidak boleh kosong');
        if (!password) errors.push('Password tidak boleh kosong');
        if (!displayName) errors.push('Nama tidak boleh kosong');
        if (!phoneNumber) errors.push('Nomor telepon tidak boleh kosong');

        // Validasi email
        if (email && !validator.isEmail(email)) {
            errors.push('Format email tidak valid');
        }

        // Validasi password (minimal 8 karakter)
        if (password && !validator.isLength(password, { min: 8 })) {
            errors.push('Password harus terdiri dari minimal 8 karakter');
        }

        // Validasi nomor telepon
        const phoneNumberPattern = /^\+62\d{9,11}$/;
        if (phoneNumber && !phoneNumberPattern.test(phoneNumber)) {
            errors.push('Nomor telepon harus dimulai dengan +62 dan diikuti oleh 9 hingga 11 digit');
        }

        if (errors.length > 0) {
            return h.response({ message: 'Error Validation', errors }).code(400);
        }

        // Validasi email terdaftar
        const existingUserByEmail = await firebaseAdmin.auth().getUserByEmail(email).catch(error => {
            if (error.code !== 'auth/user-not-found') {
                throw error;
            }
            return null;
        });

        if (existingUserByEmail) {
            errors.push('Email sudah terdaftar');
        }

        // Validasi nomor telepon terdaftar
        const existingUserByPhoneNumber = await firebaseAdmin.auth().getUserByPhoneNumber(phoneNumber).catch(error => {
            if (error.code !== 'auth/user-not-found') {
                throw error;
            }
            return null;
        });

        if (existingUserByPhoneNumber) {
            errors.push('Nomor telepon sudah terdaftar');
        }

        if (errors.length > 0) {
            return h.response({ message: 'Validasi Error', errors }).code(400);
        }

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
        if (error.code === 'auth/email-already-exists') {
            return h.response({ message: 'Email sudah terdaftar' }).code(400);
        }
        console.error('Error creating account:', error.message);
        return h.response({ message: 'Terjadi kesalahan saat membuat akun' }).code(500);
    }
};

const verifyTokenHandler = async (request, h) => {
    try {
        const authorizationHeader = request.headers.authorization;
        console.log(authorizationHeader);

        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return h.response({ message: 'Token tidak disediakan atau format tidak valid' }).code(401);
        }

        const token = authorizationHeader.split(' ')[1];
        console.log("token:", token);

        const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
        console.log("decoded token:", decodedToken);

        const uid = decodedToken.uid;
        const email = decodedToken.email;
        const phoneNumber = decodedToken.phone_number;
        console.log(uid, email, phoneNumber);

        return h.response({ message: 'Token berhasil diverifikasi', uid, email, phoneNumber }).code(200);
    } catch (error) {
        console.error('Error verifying token:', error.message);
        return h.response({ message: 'Token tidak valid' }).code(401);
    }
};

const getUserProfileHandler = async (request, h) => {
    try {
        const { id } = request.params;

        const userRecord = await firebaseAdmin.auth().getUser(id);

        const userData = {
            displayName: userRecord.displayName,
            email: userRecord.email,
            phoneNumber: userRecord.phoneNumber
        };

        return h.response({
            status: 200,
            message: 'User credentials retrieved successfully',
            userData
        }).code(200);
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            return h.response({ message: 'User not found' }).code(404);
        }
        console.error('Error retrieving user credentials:', error.message);
        return h.response({ message: 'Error retrieving user credentials' }).code(500);
    }
};


module.exports = { createAccountHandler, verifyTokenHandler, getUserProfileHandler };
