import { checkAuth } from '@/apiRequests/authentication/checkAuth';
import CryptoJS from 'crypto-js';

const isLoggedIn = async () => {
    
    
    // Get encrypted email and password from local storage
    const encryptedEmail = localStorage.getItem('email');
    const encryptedPassword = localStorage.getItem('password');

    // Decrypt email and password using AES decryption
    const secretKey = 'your-secret-key'; // Replace this with your actual secret key

    try {

        const decryptedEmailBytes = CryptoJS.AES.decrypt(encryptedEmail, 'email');
        const decryptedEmail = decryptedEmailBytes.toString(CryptoJS.enc.Utf8);
        const decryptedPasswordBytes = CryptoJS.AES.decrypt(encryptedPassword, 'password');
        const decryptedPassword = decryptedPasswordBytes.toString(CryptoJS.enc.Utf8);
        const decryptedRoleBytes = CryptoJS.AES.decrypt(encryptedPassword, 'password');
        const decryptedRole = decryptedPasswordBytes.toString(CryptoJS.enc.Utf8);

        if (!decryptedEmail || !decryptedPassword || !decryptedRole) {
            return [false, null]
        } else {
            const data = await checkAuth({ email: decryptedEmail, password: decryptedPassword });
            console.log('-- CHECK AUTH --')    
            console.log(data)

            if (!data[1].data[0]) {
                return [false, null]
            }
            else {
                return [true, data[1].data[1].role.type]
            }
        }

    } catch {
        return [false, null];
    }    
};
export default isLoggedIn;