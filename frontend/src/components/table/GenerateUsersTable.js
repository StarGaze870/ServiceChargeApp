import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

function createData(data) {
  return {
    userID: data.id,
    email: data.email, 
    firstname: data.firstname, 
    lastname: data.lastname, 
    role: data.role.type,
    date: new Date(data.createdAt),       
  };
}


export default function GenerateUsersTable({tableData}) {

  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {

    let rowData = tableData.map((item) => createData(item));
    setRows(rowData);


    console.log(rowData)

  }, [tableData])

  React.useEffect(() => {

    

  }, [])

  const downloadExcelFile = () => {
    const headers = ['User ID', 'First Name', 'Last Name', 'Email', 'Role', 'Joined On'];
  
    const data = rows.map((row) => [
      row.ticketID,
      row.subject,
      row.status,
      row.priority,
      row.date,    
    ]);
  
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
    XLSX.writeFile(workbook, 'table_data.xlsx');
  }

  return (
    <div>
      {/* <Button onClick={downloadExcelFile} variant="contained" color="primary">
        Download Excel
      </Button> */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Ticket ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">Joined On</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.subject + ' ' + row.ticketID + '' + index}                
                sx={{
                  '& > *': { borderBottom: 'unset' },
                  backgroundColor: index % 2 === 1 ? 'rgba(23, 48, 88, 0.1)' : 'white', // Add this line
                }}
              >
                <TableCell align="left">{row.userID}</TableCell>
                <TableCell component="th" scope="row">{row.firstname + ' ' + row.lastname}</TableCell>                
                <TableCell align="right">{row.email}</TableCell>
                <TableCell align="right">{row.role}</TableCell>                
                <TableCell align="right">
                {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(row.date)}
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
