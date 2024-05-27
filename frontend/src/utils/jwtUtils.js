import { jwtDecode } from 'jwt-decode';

export const getUserIdFromToken = (token) => {
    try {
        const decodedToken = jwtDecode(token);
        return decodedToken.sub; // Assuming the user ID is stored in the `sub` (subject) claim
    } catch (error) {
        console.error('Invalid token', error);
        return null;
    }
};
