import axios from 'axios';

export async function otpResetUserPassword({ userId, otp, newPassword }) {
    const apiUrl = 'http://localhost:8080/api/v1/user/otp/reset-password';
    const requestData = {
        userId: userId,
        otp: otp,        
        newPassword: newPassword
    };

    try {
        const response = await axios.post(apiUrl, requestData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });        
        return [response.status, response.data];
        
    } catch (error) {
        console.error(error);

        if (error.response) {
            return [error.response.status, error.response.data];
        }
        return [500, error.message];
    }
}
