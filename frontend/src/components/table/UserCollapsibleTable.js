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

function createData({userID, email, firstname, lastname, role, date}) {
  return {
    email,
    firstname,
    lastname,
    name: firstname + ' ' + lastname,    
    date: new Date(date),
    details: [
      {
        userID: userID,        
        description: role.description,
        role: role.type,
      },      
    ],
  };
}

const generateWelcomeRow = () => {
  return [{
    email: 'juandelacruz@gmail.com',
    firstname: 'Juan',
    lastname: 'Dela Cruz',
    name: 'Juan Dela Cruz',    
    date: new Date(),
    details: [
      {        
        userID: 0,
        description: 'a user who has full access and control over the system',
        role: 'Admin',
      },
    ],
  }];
};


function Row(props) {
   
  const { 

    row,
    onEditClick, 
    index,    

  } = props;  

  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow
        sx={{
          '& > *': { borderBottom: 'unset' },
          backgroundColor: index % 2 === 1 ? 'rgba(23, 48, 88, 0.1)' : 'white', // Add this line
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
        <TableCell component="th" scope="row">{row.email}</TableCell>
        <TableCell align="right">{row.name}</TableCell>        
        <TableCell align="right">
          {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(row.date)}
        </TableCell>
        <TableCell align="right">
          <button
            className="btn m-0 p-0"
            onClick={() => onEditClick(row)}
          >
            {/* // TODO: UPDATE USER */}
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
                    <TableCell>User ID</TableCell>
                    <TableCell align="center">Description</TableCell>
                    <TableCell align="right">Role</TableCell>                    
                  </TableRow>
                </TableHead>
                {/* EXTENDED TABLE DATA*/}
                <TableBody>
                  {row.details.map((details) => (
                    <TableRow key={details.userID}>
                      <TableCell component="th" scope="row">
                        {details.userID}
                      </TableCell>
                      <TableCell align="center" style={{ maxWidth: '50em',overflowWrap: 'break-word', wordWrap: 'break-word', wordBreak: 'break-all' }}>
                      {details.description}
                      </TableCell>
                      <TableCell align="right">{details.role}</TableCell>                      
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

export default function UserCollapsibleTable({data, initialRoleFilter, sendTicketDataToParent}) {    

  const [rows, setRows] = useState([]);
  const [filteredRowCount, setFilteredRowCount] = useState(rows.length);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });  
  const [roleFilter, setRoleFilter] = useState(initialRoleFilter);

  useEffect(() => {                  

      let rowData = data.map(item => 
        createData({
          userID: item.id,
          firstname: item.firstname,
          lastname: item.lastname,
          email: item.email,
          role: item.role,          
          date: item.createdAt}));
      setRows(rowData);

  }, [data]);
  
  useEffect(() => {
    setRoleFilter(initialRoleFilter);
  }, [initialRoleFilter]);

  
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
    sendTicketDataToParent(data);
  }
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }    
    setSortConfig({ key, direction });
  };
  
  const onStatusChange = (e) => {
    setRoleFilter(e.target.value)
  }

  const onPriorityChange = (e) => {
    setPriorityFilter(e.target.value)
  }

  const sortedRows = useMemo(() => {
    let sortableRows = [...rows];
  
    sortableRows.sort((a, b) => {

      if (a.priority === roleFilter && b.priority !== roleFilter) return -1;
      if (b.priority === roleFilter && a.priority !== roleFilter) return 1;

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

    const filteredRows = sortableRows
    .filter((row) => (row.role === roleFilter))

    setFilteredRowCount(filteredRows.length);            

    return sortableRows;

  }, [rows, sortConfig, roleFilter]);          

  return (   
    <div className='d-flex flex-column shadow w-100'>
      <div className='d-flex justify-content-end shadow' style={{backgroundColor: 'rgba(23, 48, 88, 0.1)'}}>
        <TablePagination
            className='d-flex me-4'  
            component='div'           
            rowsPerPageOptions={[5, 10, 25, 100]}          
            count={filteredRowCount}
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
              <TableCell className='' style={{backgroundColor: 'rgba(23, 48, 88, 0.1)'}} />            
              <TableCell className='' style={{backgroundColor: 'rgba(23, 48, 88, 0.1)'}}>
                <button className='btn m-0 p-0' onClick={() => requestSort('email')}>
                  Email
                </button>
              </TableCell>              
              <TableCell className='' style={{backgroundColor: 'rgba(23, 48, 88, 0.1)'}} align="right">
                  <div className='d-flex flex-column flex-lg-row justify-content-end'>                  
                  {/* <InputLabel className='d-flex align-self-end me-lg-3 text-black'>Name</InputLabel> */}
                  <button className='btn m-0 p-0' onClick={() => requestSort('name')}>
                    Name
                  </button>
                  {/* <Select
                      className='d-flex align-self-end'
                      value={statusFilter}
                      onChange={onStatusChange}
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
                  </Select> */}
                  </div>
              </TableCell>              
              <TableCell className='' style={{backgroundColor: 'rgba(23, 48, 88, 0.1)'}} align="right">
                <button className='btn m-0 p-0' onClick={() => requestSort('date')}>
                  Date
                </button>
              </TableCell>              
              <TableCell className='' style={{backgroundColor: 'rgba(23, 48, 88, 0.1)'}} align="right" />                                
              {/* <TableCell className='' style={{backgroundColor: 'rgba(23, 48, 88, 0.1)'}} /> */}
            </TableRow>
          </TableHead>          
          <TableBody>                  
            {(sortedRows.length > 0 ? sortedRows : generateWelcomeRow())              
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <Row
                  key={row.details[0].userID || `welcome-row`}
                  row={row}                  
                  onEditClick={handleEditClick}
                  index={index}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>     
    </div> 
  );
}