import axios from 'axios';

export async function updateTicket({ ticketID, priorityID=null, statusID=null, subject=null, description=null }) {
  var statusCode = 0;
  try {

    const jsonData = {
        status: { id: statusID },
        subject,
        description
    };
    
    if (priorityID !== null) {
        jsonData.priority = { id: priorityID };
    }

    const response = await axios.patch(`http://localhost:8080/api/v1/update/tickets/${ticketID}`, jsonData, {
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
