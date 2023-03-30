import axios from 'axios';

export async function login({email, password}) {
    
    var statusCode = 0;
    try {
  
      const response = await axios.post('http://localhost:8080/api/v1/login', 
      {
        email: email,
        password: password
      },
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      statusCode = response.status;    
      return [statusCode, response.data];   
  
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