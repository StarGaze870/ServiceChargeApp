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
    ticketID: data.id,
    subject: data.subject, 
    status: data.status.type, 
    priority: data.priority && data.priority.type !== null ? data.priority.type : 'Pending', 
    date: new Date(data.created_at),
  };
}


export default function GenerateTicketsTable({tableData}) {

  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {

    let rowData = tableData.map((item) => createData(item));
    setRows(rowData);

  }, [tableData])

  React.useEffect(() => {

    

  }, [])

  const downloadExcelFile = () => {
    const headers = ['Ticket ID', 'Subject', 'Status', 'Priority', 'Date'];
  
    const data = rows.map((row) => [
      row.ticketID,
      row.subject,
      row.status,
      row.priority,
      () => {{new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(row.date)}},    
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
              <TableCell>Subject</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Priority</TableCell>
              <TableCell align="right">Date</TableCell>
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
                <TableCell align="left">{row.ticketID}</TableCell>
                <TableCell component="th" scope="row">{row.subject}</TableCell>                
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.priority}</TableCell>
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
