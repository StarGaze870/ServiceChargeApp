import axios from 'axios';

export async function updateUser({ userId, roleId = null, firstname = null, lastname = null, email = null }) {
  var statusCode = 0;
  try {
    const jsonData = {};

    if (roleId !== null) {
      jsonData.role = { id: roleId };
    }
    if (firstname !== null) {
      jsonData.firstname = firstname;
    }
    if (lastname !== null) {
      jsonData.lastname = lastname;
    }
    if (email !== null) {
      jsonData.email = email;
    }    

    const response = await axios.patch(`http://localhost:8080/api/v1/update/users/${userId}`, jsonData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

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
