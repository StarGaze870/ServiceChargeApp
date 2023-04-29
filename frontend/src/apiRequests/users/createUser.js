import axios from 'axios';

export async function createUser({ roleID = 1, firstname, lastname, email }) {
  var statusCode = 0;
  try {
    const response = await axios.post(
      'http://localhost:8080/api/v1/create/users',
      {
        role: {
          id: roleID,
        },
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: 'P@ssword.123',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    statusCode = response.status;
    console.log('IN CREATE USERS');
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
