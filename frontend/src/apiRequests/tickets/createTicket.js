import axios from 'axios';

export async function createTicket({userID=1, statusID=6, priorityID=1, subject, description, }) {
    
    var statusCode = 0;
    try {
  
      const response = await axios.post('http://localhost:8080/api/v1/create/tickets',       
      JSON.stringify({
        user: {
          id: userID
        },
        status: {
          id: statusID
        },
        priority: {
          id: priorityID
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
      return [statusCode, JSON.parse(response.data.data)];
  
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
