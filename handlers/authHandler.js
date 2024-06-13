const firebaseAdmin = require("firebase-admin");
const validator = require("validator");

const serviceAccount = {
    "type": "service_account",
    "project_id": "sibipedia",
    "private_key_id": "47c59662d35a15baf1a0da0a4814cc5c7b32c6b3",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDSG3Oo3hLaiN1D\n2zZSFPn5g4H/iXTk0KvG5Prt16rk9DcA3WilT8ui0hh+KUuRMTwSmotGX/gJC/O4\n3LbD/pcUvewjbiO8aGwQpx6rM//ajZrzy0FgA0qTyBL1NgSRI+ZfmUxvNirF3Kyg\nzNs/1ZCnd39p17bK3C1A04nIMSvY8f1krO7q5abbgEPZacmwvZMWjSN/uXbbVJf5\n3NxQQy9GbZO1NiaCSMrXPeg6etJp4ytDH0DUaArjLQZE60gLr+dKu+ftFQ5+Xwx1\nWeJpr8plckuKle1jQM/MyLCz2qro4rWtywD/l1yhUgMZVAaBHQ3S7zZoxOw4GgaV\nA1FVybonAgMBAAECggEAJj5a8hzh/6cz5zsKiyxIR/N5ASNrBI87BSv+xLYh5CTT\nsjOa7aQ1o8BsNuKbX6U/kv9QZJHpWvQy+64pEknQBDWBuv08Qfob2Xgh6/W+F3D5\nCHExyCExPO8JDFs1v5lyQGpt8DxC0tsVDPvc2KSt/N2ScpiSLCChmBApHyhcG9Oz\n3byA7hMJoNepJkJfLnwYvf3bUslvdGOQG7eG6rReMLOdc+O1ubJLpkXVbwnoiVxi\nwC4b1SoIdEa+GuwRnYoGP8RiDYlCI1f4MrpWIdtLlZAAW6duXplU/yy6VYr5VxjP\nSFuv7Ldew+ypGOo/k4MJgJ1zb0tv2wQWk1jQ9KRB0QKBgQDuwhWXLQi7PDqQN/hW\nwlI9h55wydVhMhsCDYmj0LwGqwtDgmctCmu7aIqABOptT42f0wca+SHebt+Rld1d\nlEWcW0lQY7DgUdZhrLNm8uDqDVor7zn4wOJCnFpwQCxhSPR3Wi84tma+wBDBsouC\nL3U7W5cuBvrUjcvb0xHjJBQ8/wKBgQDhR7LnqdzXR8W76oEbAvNovfBofKlXsrtC\ndT/qDkabt/OunO0c7vJBcbdiLn8K677ZFy/ydAgN42B7n2fzqO6OoCjhMLBvknJQ\nuKwhHK/mUCmuAN74Y6A1D/IXzNz83BSmNlvYlkpb1xhUiCAK/M9PDPzTS243t5yn\n+Bm59e/62QKBgQDbAzQ08b2Bq1T5OC5Yv3YbNQ103uAagZDeyDZLC81+vGXfrn4g\nhd+fEN2DY377eK8sPbLV3lRgKwpwDK38Cmf0bpSI5nm4u7lQ7c+/juocKNVfWdmu\nwpiKi8w2DdfoAbkmxpZsin0jWyHD3Jk2eXwrT/AU65gpZEztP+e3mT/rVwKBgCCN\neb6b/vtktZ/nzOwYSw/xklGm4dl4TDLYOnoZwf4yYJX0uxaZOIxYYEVhrp3nXtaD\n0TvZpGhNWN3ENQMyf/ZAEmgn3vbgVIBxjv3h5VEEeGFaYt3Fl5rTSQpDYhNvwdQa\nur7bSLdop21fljHAQjyMBeSKW8zVTV/ALAeBEEJRAoGBAI4S5CwYl+1vLT4lTENz\n0ltl5J9lfRMVhvRfyTFM3C48+WgHdYw8em6TqVV+PRzFi0tcfZ98a/DuwTcTBbYF\nQRjJl17QYukdEwHj/TMjSLIil3YfuIzSxgvoLEn6VYcGP7a5LHtcee8hPuum9Mw7\n99SumHKkuOQSL3jWyElXrneK\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-9yfog@sibipedia.iam.gserviceaccount.com",
    "client_id": "106283962168169828679",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9yfog%40sibipedia.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"

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
        const authorizationHeader = request.headers.authorization;

        const token = authorizationHeader.split(' ')[1];

        const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
        const uid = decodedToken.uid;

        const userRecord = await firebaseAdmin.auth().getUser(uid);

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
            return h.response({
                status: 404,
                error: 'Not Found',
                message: 'User not found'
            }).code(404);
        }
        console.error('Error retrieving user credentials:', error.message);
        return h.response({
            status: 500,
            error: 'Internal Server Error',
            message: 'Error retrieving user credentials'
        }).code(500);
    }
};



module.exports = { createAccountHandler, verifyTokenHandler, getUserProfileHandler };
