import axios from 'axios';

export async function sendOTp({ recipient, userId }) {
    const apiUrl = 'http://localhost:8080/api/v1/send/otp';
    const requestData = {
        recipient: recipient,
        subject: "Forgot Password Verification",        
        otp: {
            user: {
                id: userId
            }
        }
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
