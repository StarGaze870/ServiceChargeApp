import axios from 'axios';

export async function getAllRoles() {
    
    var statusCode = 0;
    try {
  
      const response = await axios.get('http://localhost:8080/api/v1/get/roles',       
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