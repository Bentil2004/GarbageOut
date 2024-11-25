import admin from 'firebase-admin';
import { handleErrorResponse } from '../utility/statusCode.js';

// Middleware to check if user is logged in
const authenticate = async (req, res, next) => {
    const idToken = req.headers.authorization?.split('Bearer ')[1];

    if (!idToken) {
        return handleErrorResponse(res, 'auth_middleware', '4001');
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        req.authentication = decodedToken;
        next();
    } catch (error) {
        handleErrorResponse(res, 'auth_middleware', '4002', error.message);

    }
};

export { authenticate };