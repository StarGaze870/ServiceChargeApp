import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { TablePagination } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Select, MenuItem, InputLabel } from '@mui/material';


const rows = [
  createData('Website Redesign', 'In Progress', 'High', 'Apr 12, 2023'),
  createData('Server Maintenance', 'Completed', 'Low', 'Apr 8, 2023'),
  createData('Customer Support Tickets', 'Pending', 'Medium', 'Apr 15, 2023'),
  createData('Bug Fixing', 'In Progress', 'High', 'Apr 17, 2023'),
  createData('Social Media Campaign', 'Pending', 'Low', 'Apr 20, 2023'),
  createData('Content Creation', 'In Progress', 'Medium', 'Apr 22, 2023'),
  createData('Email Marketing', 'Completed', 'High', 'Apr 5, 2023'),
  createData('Database Optimization', 'Pending', 'Low', 'Apr 25, 2023'),
  createData('Analytics Setup', 'In Progress', 'Medium', 'Apr 28, 2023'),
  createData('SEO Audit', 'Completed', 'High', 'Apr 2, 2023'),
  createData('Security Update', 'Pending', 'Low', 'Apr 30, 2023'),
  createData('Mobile App Development', 'In Progress', 'Medium', 'May 3, 2023'),
  createData('Software Upgrade', 'Completed', 'High', 'Apr 1, 2023'),
  createData('Website Migration', 'Pending', 'Low', 'May 6, 2023'),
  createData('Network Configuration', 'In Progress', 'Medium', 'May 8, 2023'),
  createData('Plugin Update', 'Completed', 'Low', 'May 10, 2023'),
  createData('Product Launch', 'In Progress', 'High', 'May 15, 2023'),
  createData('User Testing', 'Pending', 'Medium', 'May 18, 2023'),
  createData('API Integration', 'In Progress', 'High', 'May 22, 2023'),
  createData('Payment Gateway Setup', 'Pending', 'Low', 'May 25, 2023'),
  createData('Backup and Recovery', 'In Progress', 'Medium', 'May 28, 2023'),
  createData('User Interface Improvement', 'Completed', 'High', 'May 30, 2023'),
  createData('Performance Tuning', 'Pending', 'Low', 'Jun 2, 2023'),
  createData('Domain Renewal', 'In Progress', 'Medium', 'Jun 5, 2023'),
  createData('SSL Certificate Installation', 'Completed', 'High', 'Jun 8, 2023'),
  createData('Code Refactoring', 'Pending', 'Low', 'Jun 12, 2023'),
  createData('User Experience Review', 'In Progress', 'Medium', 'Jun 15, 2023'),
  createData('Load Testing', 'Completed', 'High', 'Jun 18, 2023'),
  createData('Accessibility Audit', 'Pending', 'Low', 'Jun 22, 2023'),
  createData('Server Scaling', 'In Progress', 'Medium', 'Jun 25, 2023')
];

function createData(subject, status, priority, date) {
  return {
    subject,
    status,
    priority,
    date: new Date(date),
    details: [
      {
        ticketID: 'TICK-1001',
        description: "User reported slow loading times on the website's main landing page, particularly when accessing it through mobile devices. Investigate possible causes, such as large image files, heavy JavaScript usage, or inefficient code. Optimize the page load speed by implementing better practices, compressing images, and using asynchronous JavaScript calls. Additionally, consider utilizing a content delivery network (CDN) to further enhance the user experience and overall website performance.",
        user: 'Joerge Gadiane',
      },      
    ],
  };
}

function Row(props) {
   
  const { 

    row, 
    onSubjectClick,
    onEditClick,     

  } = props;  

  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {/* TABLE DATA */}
        <TableCell component="th" scope="row"><button className='btn m-0 p-0' onClick={() => onSubjectClick(row)}>{row.subject}</button></TableCell>
        <TableCell align="right">{row.status}</TableCell>
        <TableCell align="right">{row.priority}</TableCell>
        <TableCell align="right">
          {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(row.date)}
        </TableCell>
        <TableCell align="right">
          <button
            className="btn m-0 p-0"
            onClick={() => onEditClick(row)}
          >
            <EditIcon></EditIcon>
          </button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {/* EXTENDED TABLE TITLE */}
              <Typography variant="h6" gutterBottom component="div">
                Details
              </Typography>
              <Table size="medium" aria-label="purchases">
              {/* EXTENDED TABLE HEADERS*/}
                <TableHead>
                  <TableRow>
                    <TableCell>Ticket ID</TableCell>
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="right">Requested From</TableCell>                    
                  </TableRow>
                </TableHead>
                {/* EXTENDED TABLE DATA*/}
                <TableBody>
                  {row.details.map((details) => (
                    <TableRow key={details.ticketID}>
                      <TableCell component="th" scope="row">
                        {details.ticketID}
                      </TableCell>
                      <TableCell align="center" style={{ maxWidth: '50em',overflowWrap: 'break-word', wordWrap: 'break-word', wordBreak: 'break-all' }}>
                      {details.description}
                      </TableCell>
                      <TableCell align="right">{details.user}</TableCell>                      
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortConfig, setSortConfig] = React.useState({ key: '', direction: 'asc' });
  const [priorityFilter, setPriorityFilter] = React.useState('High');
  const [statusFilter, setStatusFilter] = React.useState('Processing');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // DATA HANDLING METHODS

  const handleSubjectClick = (data) => {
    console.log("Row Subject details:", data);
  };

  const handleEditClick = (data) => {
    console.log("Row Edit details:", data);
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
  
  const sortedRows = React.useMemo(() => {
    let sortableRows = [...rows];
    if (sortConfig.key) {
      sortableRows.sort((a, b) => {
        if (sortConfig.key === 'date') {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
          }
          return 0;
        } else {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
          }
          return 0;
        }
      });
    }
    return sortableRows;
  }, [rows, sortConfig]);
  

  return (   
    <div className='d-flex w-100 h-100 flex-column shadow'>
      <div className='d-flex w-100 justify-content-end shadow bg-light'>
        <TablePagination
            className='d-flex me-4'  
            component='div'           
            rowsPerPageOptions={[5, 10, 25, 100]}          
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}          
              sx={{          
              '& 	.MuiTablePagination-selectLabel': {
                margin: 'auto'
              },            
              '& .MuiTablePagination-displayedRows': {
                margin: 'auto',
              },
              '& .MuiTablePagination-spacer': {
                border: 0
              },          
            }}
          />              
      </div>
      <TableContainer component={Paper} className=''>          
        <Table stickyHeader  aria-label="collapsible table">
          {/* TABLE HEADER */}          
          <TableHead>          
            <TableRow>
              <TableCell className='bg-light' />            
              <TableCell className='bg-light'><button className='btn m-0 p-0' onClick={() => requestSort('subject')}>Subject</button></TableCell>
              <TableCell className='bg-light' align="right"><button className='btn m-0 p-0' onClick={() => requestSort('status')}>Status</button></TableCell>
              <TableCell className='d-flex bg-light flex-column flex-lg-row justify-content-end' align="right">
                  <InputLabel className='d-flex align-self-end me-lg-3 text-black'>Priority</InputLabel>
                  <Select
                      className='d-flex align-self-end'
                      value={priorityFilter}
                      onChange={(event) => setPriorityFilter(event.target.value)}
                      displayEmpty
                      inputProps={{ 'aria-label': 'Without label' }}
                      sx={{                     
                        background: 'none',
                        '& .MuiSelect-select': {
                          padding: 0,
                          margin: 0,
                        },                     
                        '& .MuiOutlinedInput-notchedOutline': {
                          border: 'none',
                        },
                      }}
                    >

                      <MenuItem value="Low">Low</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="High">High</MenuItem>
                  </Select>
              </TableCell>
              <TableCell className='bg-light' align="right"><button className='btn m-0 p-0' onClick={() => requestSort('date')}>Date</button></TableCell>              
              <TableCell className='bg-light' />
            </TableRow>
          </TableHead>          
          <TableBody>
            {sortedRows
              .filter((row) => (priorityFilter ? row.priority === priorityFilter : true))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <Row key={row.subject} row={row} onSubjectClick={handleSubjectClick} onEditClick={handleEditClick} />
              ))}
          </TableBody>
          {/* TABLE FOOTER */}
        </Table>
      </TableContainer>    
    </div> 
  );
}