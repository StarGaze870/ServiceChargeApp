import axios from 'axios';

export async function sendEmailWithAttachment(emailDetails, attachment) {
    var statusCode = 0;
    try {
      const formData = new FormData();
      formData.append('emailDetails', JSON.stringify(emailDetails));      
      formData.append('attachment', attachment);      

      const response = await axios.post(
        'http://localhost:8080/api/v1/send/emailWith/attachment',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      
      statusCode = response.status;
      return [statusCode, response.data.data];
    } catch (error) {
      console.error(error);
  
      if (error.response) {
        statusCode = error.response.status;
        return [statusCode, error.response.data];
      }
      statusCode = 500;
      return [statusCode, error.message];
    }
  }
  