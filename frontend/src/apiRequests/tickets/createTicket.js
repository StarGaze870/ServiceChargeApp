import axios from 'axios';

export async function createTicket({subject='default', description='default', userID}) {
    
    var statusCode = 0;
    try {
  
      const response = await axios.post('http://localhost:8080/api/v1/create/tickets',       
      JSON.stringify({
        user: {
          id: userID
        },
        status: {
          id: 6
        },
        subject: subject,
        description: description
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',          
        }
      });      

      statusCode = response.status;
      console.log('IN CREATE TICKETS');
      console.log(response);
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
