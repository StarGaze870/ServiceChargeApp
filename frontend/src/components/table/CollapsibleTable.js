import React, { useEffect, useState, Fragment, useMemo } from 'react';
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
  createData('Website Redesign', 'Processing', 'High', 'Apr 12, 2023'),
  createData('Server Maintenance', 'Completed', 'Low', 'Apr 8, 2023'),
  createData('Customer Support Tickets', 'Pending', 'Medium', 'Apr 15, 2023'),
  createData('Bug Fixing', 'Processing', 'High', 'Apr 17, 2023'),
  createData('Social Media Campaign', 'Pending', 'Low', 'Apr 20, 2023'),
  createData('Content Creation', 'Processing', 'Medium', 'Apr 22, 2023'),
  createData('Email Marketing', 'Closed', 'High', 'Apr 5, 2023'),
  createData('Database Optimization', 'Rejected', 'Low', 'Apr 25, 2023'),
  createData('Analytics Setup', 'Processing', 'Medium', 'Apr 28, 2023'),
  createData('SEO Audit', 'Completed', 'High', 'Apr 2, 2023'),
  createData('Security Update', 'Pending', 'Low', 'Apr 30, 2023'),
  createData('Mobile App Development', 'Processing', 'Medium', 'May 3, 2023'),
  createData('Software Upgrade', 'Completed', 'High', 'Apr 1, 2023'),
  createData('Website Migration', 'Rejected', 'Low', 'May 6, 2023'),
  createData('Network Configuration', 'Processing', 'Medium', 'May 8, 2023'),
  createData('Plugin Update', 'Closed', 'Low', 'May 10, 2023'),
  createData('Product Launch', 'Processing', 'High', 'May 15, 2023'),
  createData('User Testing', 'Pending', 'Medium', 'May 18, 2023'),
  createData('API Integration', 'Processing', 'High', 'May 22, 2023'),
  createData('Payment Gateway Setup', 'Rejected', 'Low', 'May 25, 2023'),
  createData('Backup and Recovery', 'Processing', 'Medium', 'May 28, 2023'),
  createData('User Interface Improvement', 'Closed', 'High', 'May 30, 2023'),
  createData('Performance Tuning', 'Pending', 'Low', 'Jun 2, 2023'),
  createData('Domain Renewal', 'Processing', 'Medium', 'Jun 5, 2023'),
  createData('SSL Certificate Installation', 'Completed', 'High', 'Jun 8, 2023'),
  createData('Code Refactoring', 'Rejected', 'Low', 'Jun 12, 2023'),
  createData('User Experience Review', 'Processing', 'Medium', 'Jun 15, 2023'),
  createData('Load Testing', 'Closed', 'High', 'Jun 18, 2023'),
  createData('Accessibility Audit', 'Pending', 'Low', 'Jun 22, 2023'),
  createData('Server Scaling', 'Processing', 'Medium', 'Jun 25, 2023'),  
  createData('Database Migration', 'Processing', 'Low', 'Jun 28, 2023'),
  createData('Keyword Research', 'Completed', 'Medium', 'Jun 30, 2023'),
  createData('API Documentation', 'Processing', 'High', 'Jul 3, 2023'),
  createData('Code Review', 'Pending', 'Low', 'Jul 6, 2023'),
  createData('A/B Testing', 'Processing', 'Medium', 'Jul 10, 2023'),
  createData('System Monitoring', 'Rejected', 'High', 'Jul 12, 2023'),
  createData('Data Analysis', 'Completed', 'Low', 'Jul 15, 2023'),
  createData('Bug Tracking', 'Closed', 'Medium', 'Jul 18, 2023'),
  createData('User Onboarding', 'Pending', 'High', 'Jul 22, 2023'),
  createData('Performance Monitoring', 'Processing', 'Low', 'Jul 25, 2023')
];

function createData({id, subject, description, user, status, priority, date}) {
  return {
    subject,
    status,
    priority,
    date: new Date(date),
    details: [
      {
        ticketID: id,
        description: description,
        user: user,
      },      
    ],
  };
}

function Row(props) {
   
  const { 

    row, 
    onSubjectClick,
    onEditClick, 
    index,    

  } = props;  

  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow
        sx={{
          '& > *': { borderBottom: 'unset' },
          backgroundColor: index % 2 === 1 ? 'rgb(248, 249, 250)' : 'white', // Add this line
        }}
      >
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
    </Fragment>
  );
}

export default function CollapsibleTable({data}) {    

  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
            
      let rowData = data.map(item => 
        createData({
          id: item.id,
          subject: item.subject,
          description: item.description,
          status: item.status.type,
          user: item.user.firstname + ' ' + item.user.lastname,
          priority: item.priority.type,
          date: item.created_at}));
      setRows(rowData);

  }, [data]);
  

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
  
  const sortedRows = useMemo(() => {
    let sortableRows = [...rows];
  
    sortableRows.sort((a, b) => {

      // Status sorting      
      if (statusFilter !== 'All') {
        if (a.priority === statusFilter && b.priority !== statusFilter) return -1;
        if (b.priority === statusFilter && a.priority !== statusFilter) return 1;
      }

      // Priority sorting      
      if (priorityFilter !== 'All') {
        if (a.priority === priorityFilter && b.priority !== priorityFilter) return -1;
        if (b.priority === priorityFilter && a.priority !== priorityFilter) return 1;
      }  

      // Other sorting based on sortConfig.key
      if (sortConfig.key) {
        if (sortConfig.key === 'date') {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1;
          }
        } else {
          if (a[sortConfig.key].toLowerCase() < b[sortConfig.key].toLowerCase()) {
            return sortConfig.direction === 'asc' ? -1 : 1;
          }
          if (a[sortConfig.key].toLowerCase() > b[sortConfig.key].toLowerCase()) {
            return sortConfig.direction === 'asc' ? 1 : -1;
          }
        }
      } 
  
      return 0;
    });
  
    return sortableRows;
  }, [rows, sortConfig, priorityFilter, statusFilter]);
  
  

  return (   
    <div className='d-flex flex-column shadow w-100'>
      <div className='d-flex justify-content-end shadow bg-light'>
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
              <TableCell className='bg-light' align="right">
                  <div className='d-flex flex-column flex-lg-row justify-content-end'>                  
                  <InputLabel className='d-flex align-self-end me-lg-3 text-black'>Status</InputLabel>
                  <Select
                      className='d-flex align-self-end'
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
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
                      <MenuItem value="All">All</MenuItem>
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Processing">Processing</MenuItem>
                      <MenuItem value="Closed">Closed</MenuItem>
                      <MenuItem value="Rejected">Rejected</MenuItem>
                  </Select>
                  </div>
              </TableCell>
              <TableCell className='bg-light' align="right">
                  <div className='d-flex flex-column flex-lg-row justify-content-end'>                  
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
                      <MenuItem value="All">All</MenuItem>
                      <MenuItem value="Low">Low</MenuItem>
                      <MenuItem value="Medium">Medium</MenuItem>
                      <MenuItem value="High">High</MenuItem>
                  </Select>
                  </div>
              </TableCell>
              <TableCell className='bg-light' align="right"><button className='btn m-0 p-0' onClick={() => requestSort('date')}>Date</button></TableCell>              
              <TableCell className='bg-light' />
            </TableRow>
          </TableHead>          
          <TableBody>
            {sortedRows
              .filter((row) => (statusFilter !== 'All' ? row.status === statusFilter : true))
              .filter((row) => (priorityFilter !== 'All' ? row.priority === priorityFilter : true))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <Row
                  key={row.subject}
                  row={row}
                  onSubjectClick={handleSubjectClick}
                  onEditClick={handleEditClick}
                  index={index}
                />
              ))}
          </TableBody>
          {/* TABLE FOOTER */}
        </Table>
      </TableContainer>     
    </div> 
  );
}