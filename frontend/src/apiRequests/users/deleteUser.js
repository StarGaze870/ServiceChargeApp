import axios from 'axios';

export async function deleteUser(id) {
  
    var statusCode = 0;
    try {
      
      const response = await axios.delete(`http://localhost:8080/api/v1/delete/users/${id}`,
      {
        headers: {
          'Accept': 'application/json',          
        }
      });      
      
      statusCode = response.status;          
      return [statusCode, response.data.data];   
  
    } catch (error) {
        console.error(error)

        if (error.response) {         
          statusCode = error.response.status;
          return [statusCode, error.response.data];        
        }              
        statusCode = 500;      
        return [statusCode, error.message];   
    }  
  }