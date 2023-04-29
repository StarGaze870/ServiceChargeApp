import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import TicketCollapsibleTable from '@/components/table/TicketCollapsibleTable';
import { getAllTickets } from '@/apiRequests/tickets/getAllTickets';
import DrawerSidebarNavigation from '@/components/appBar/DrawerSidebarNavigation';
import { getSingleTicket } from '@/apiRequests/tickets/getSingleTicket';
import LogoutModal from '@/components/modal/LogoutModal';
import EditTicketModal from '@/components/modal/tickets/EditTicketModal';
import SucessSlide from '@/components/transitions/SucessSlide';
import isLoggedIn from '@/pages/isLoggedIn';
import GenerateTicketsTable from '@/components/table/GenerateTicketsTable';
import XLSX from 'xlsx';
import GenerateUsersTable from '@/components/table/GenerateUsersTable';
import { getAllUsers } from '@/apiRequests/users/getAllUsers';

function createDataTicket(data) {
  return {
    ticketID: data.id,
    subject: data.subject, 
    status: data.status.type, 
    priority: data.priority && data.priority.type !== null ? data.priority.type : 'Pending', 
    date: new Date(data.created_at),
  };
}

function createDataUsers(data) {
  return {
    userID: data.id,
    email: data.email, 
    firstname: data.firstname, 
    lastname: data.lastname, 
    role: data.role.type,
    date: new Date(data.createdAt),       
  };
}

const GenerateReport = () => {    

  // SELF VARIABLES
  const router = useRouter();
  const query = router.query;  
  
  const [loading, setLoading] = useState(true);

  // DASHBOARD VARIABLES
  const [ticketRows, setTicketRows] = React.useState([]);
  const [userRows, setUserRows] = React.useState([]);

  // ALERT MESSAGE
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessageTitle, setAlertMessageTitle] = useState('Success');
  const [alertMessageSeverity, setAlertMessageSeverity] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  // TICKET TABLE VARIABLE
  const [ticketTableData, setTicketTableData] = useState([])
  const [userTableData, setUserTableData] = useState([])

  // EDIT TICKET VARIABLE
  const [singleTicketData, setSingleTIcketData] = useState(null)
  const [editTicketModalOpen, setEditTicketModalOpen] = useState(false);    
  const onEditClick = () => setEditTicketModalOpen(true);

  // LOGOUT VARIABLE
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);    

  useEffect(() => {

    if (query.isFromAddTicket && !loading && ticketTableData.length > 0) {
      
      const reorderedTicketData = [
        ticketTableData[ticketTableData.length - 1],
        ...ticketTableData.slice(0, ticketTableData.length - 1),
      ];
      setTicketTableData(reorderedTicketData);
      
    }
  }, [query, loading]);
  

  useEffect(() => {  

    const ini = async () => {

      // CHECK USERS VALIDITY
      const isAuthrorized = await isLoggedIn();      
      if (!isAuthrorized[0]) {
        await router.replace('/');      
      }
      else {
        
        if (isAuthrorized[1].toString() !== 'Admin') {
          await router.replace(`/dashboard/${isAuthrorized[1].toString().toLowerCase()}`);
        }
      }      
      await getTicketFunc();
      await getUserFunc();
      setLoading(false);
    };
    ini();

  }, []);
  
  // SUCESS ALERT
  useEffect(() => {

    if (!showSuccessAlert) return;

    setTimeout(async () => {      
      setShowSuccessAlert(false)
    }, 5000);

  }, [showSuccessAlert]);

  const getTicketFunc = async ({fromEditTicket=false, failed=false} = {}) => {

    setAlertMessageSeverity(failed ? 'error' : 'success')
    setAlertMessageTitle(failed ? 'Error' : 'Success')
    const getTickets = await getAllTickets();

    console.log("-- GETTING ALL TICKETS --")
    console.log(getTickets);
    
    setTicketTableData(getTickets[1][0].data);    
    let rowData = getTickets[1][0].data.map((item) => createDataTicket(item));
    setTicketRows(rowData);

  }

  const getUserFunc = async () => {
    
    const getUsers = await getAllUsers();

    console.log("-- GETTING ALL USERS --")
    console.log(getUsers);
    
    setUserTableData(getUsers[1][0].data);    
    let rowData = getUsers[1][0].data.map((item) => createDataUsers(item));
    setUserRows(rowData);

  }

  const onDeleteTicketCallback = useCallback(async ({failed=false} = {}) => {    
    
    setAlertMessageSeverity(failed ? 'error' : 'success')
    setAlertMessageTitle(failed ? 'Error' : 'Success')

    setTimeout(async () => {

      if (failed) {        
        setAlertMessage('Delete Failed!')
      } else {
        setAlertMessage('Deleted Successfully')
        getTicketFunc();                    
      } 
      setShowSuccessAlert(true);     
    }, 600);
  })

  const onLogoutClick = () => setLogoutModalOpen(true);
  const handleLogoutCallback = useCallback(async () => {
    
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('role');              
    await router.push('/');
        
  })    

  const [selectedTable, setSelectedTable] = useState('Tickets');

  const handleChange = (event) => {
    setSelectedTable(event.target.value);
  };  

  const onGenerateClick = () => {

    if (selectedTable === 'Tickets') {
      ticketDownloadExcelFile();
    }
    else {
      userDownloadExcelFile();
    }
  }

  const ticketDownloadExcelFile = () => {
    const headers = ['Ticket ID', 'Subject', 'Status', 'Priority', 'Date'];
  
    const data = ticketRows.map((row) => [
      row.ticketID,
      row.subject,
      row.status,
      row.priority,
      new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(row.date),    
    ]);
  
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
    XLSX.writeFile(workbook, 'Tickets Report.xlsx');
  }

  const userDownloadExcelFile = () => {
    const headers = ['User ID', 'First Name', 'Last Name', 'Email', 'Role', 'Joined On'];
  
    const data = userRows.map((row) => [
      row.userID,
      row.firstname,
      row.lastname,
      row.email,
      row.role,
      new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(row.date),    
    ]);
  
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  
    XLSX.writeFile(workbook, 'Users Report.xlsx');
  }

  return (    
      <>      
        <Head>      
          <title>Service Charge</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/appLogoWhite.png" />           
        </Head>                                
        <LogoutModal modalOpen={logoutModalOpen} setModalOpen={setLogoutModalOpen} onYesCallback={handleLogoutCallback} title={'Logout'} />
        <EditTicketModal modalOpen={editTicketModalOpen} setModalOpen={setEditTicketModalOpen} onSaveCallback={getTicketFunc} onDeleteCallback={onDeleteTicketCallback} data={singleTicketData}/>
        <SucessSlide 
          toggleShow={showSuccessAlert} 
          message={alertMessage} 
          disableLink={true}
          title={alertMessageTitle}
          severity={alertMessageSeverity}

          />
        <DrawerSidebarNavigation
          headerTitle='Generate Report'
          selectedOption='Generate Report'
          onDashboard={onLogoutClick}
          onAddUser={onLogoutClick}          
          onSendEmail={onLogoutClick}
          onViewTickets={onLogoutClick}
          onViewUsers={onLogoutClick}
          onGenerateReport={onLogoutClick}
          onLogout={onLogoutClick}

          >                
        <div className="container-fluid">
          {/* DASHBOARD */}
          <div className="d-flex flex-column mb-4"> 
            
            <div className='mb-3 d-flex flex-row justify-content-between'>
                <div className='d-flex' style={{width: '15em'}}>
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Table</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedTable}
                        label="Table"
                        onChange={handleChange}
                    >
                        <MenuItem value={'Tickets'}>Tickets</MenuItem>
                        <MenuItem value={'Users'}>Users</MenuItem>                        
                    </Select>
                    </FormControl>
                </div>
                <div className='d-flex'>
                    <button className='btn btn-dark py-2 px-4 me-5 ' onClick={onGenerateClick}>Generate</button>
                </div>
        </div>
          </div>
          {/* DASHBOARD TABLE */}
          <div className="d-flex flex-column">
            <h3 className="ms-2">Data</h3>         
            {/* {!loading && ticketTableData !== null && 
              <GenerateTicketsTable tableData={ticketTableData} />              
            } */}
            {!loading && ticketTableData !== null && 
              <GenerateUsersTable tableData={userTableData} />              
            }
          </div>
        </div>       
        </DrawerSidebarNavigation>
      </>
    )  
};

export default GenerateReport;