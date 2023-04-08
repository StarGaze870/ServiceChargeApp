import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import isLoggedIn from '../isLoggedIn';
import { CircularProgress } from '@mui/material';
import TicketCollapsibleTable from '@/components/table/TicketCollapsibleTable';
import { getAllTickets } from '@/apiRequests/tickets/getAllTickets';
import DrawerSidebarNavigation from '@/components/appBar/DrawerSidebarNavigation';
import { getSingleTicket } from '@/apiRequests/tickets/getSingleTicket';
import LogoutModal from '@/components/modal/LogoutModal';
import EditTicketModal from '@/components/modal/tickets/EditTicketModal';
import SucessSlide from '@/components/transitions/SucessSlide';


const AdminDashboard = () => {    

  // SELF VARIABLES
  const router = useRouter();
  const query = router.query;  
  
  const [loading, setLoading] = useState(true);

  // ALERT MESSAGE
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessageTitle, setAlertMessageTitle] = useState('Success');
  const [alertMessageSeverity, setAlertMessageSeverity] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  // TICKET TABLE VARIABLE
  const [ticketTableData, setTicketTableData] = useState(null)
  const [initialStatusFilter, setInitialStatusFilter] = useState('All');
  const [initialPriorityFilter, setInitialPriotityFilter] = useState('All');

  // EDIT TICKET VARIABLE
  const [singleTicketData, setSingleTIcketData] = useState(null)
  const [editTicketModalOpen, setEditTicketModalOpen] = useState(false);    
  const onEditClick = () => setEditTicketModalOpen(true);

  // LOGOUT VARIABLE
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);    

  useEffect(() => {
    if (query.isFromAddTicket && !loading) {
      if (ticketTableData && ticketTableData.length > 0) {
        const reorderedTicketData = [
          ticketTableData[ticketTableData.length - 1],
          ...ticketTableData.slice(0, ticketTableData.length - 1),
        ];
        setTicketTableData(reorderedTicketData);
      }
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
        } else {
          setLoading(false);
        }
      }      
      await getTicketFunc();

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

    setTicketTableData(getTickets[1]);

    if (fromEditTicket) {
            
      setTimeout(async () => {        
        
        if (failed) {
          setAlertMessage('Update Failed!')
        } else {
          setAlertMessage('Updated Successfully')
        } 
        setShowSuccessAlert(true);
      }, 600);
    }
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

  const newTicketRefreshCallback = useCallback(async ({ticketId}) => {
        
    const newTicket = await getSingleTicket(ticketId);    
    setTicketTableData([ticketTableData[3], ...ticketTableData])
    
  });

  const onLogoutClick = () => setLogoutModalOpen(true);
  const handleLogoutCallback = useCallback(async () => {
    
    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('role');              
    await router.push('/');
        
  })    

  const onCardsClickDashboard = useCallback((e) => {
            
    if (e.currentTarget.value === 'Pending') {
    
      setInitialStatusFilter('Pending');
      setInitialPriotityFilter('All');            
    } 
    else {
      setInitialStatusFilter('All');
      setInitialPriotityFilter(e.currentTarget.value);
    }               
  })

  const receiveTicketDataFromChild = (data) => {
        
    setSingleTIcketData(data);
    onEditClick();
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
          headerTitle='Dashboard'
          selectedOption='Dashboard'
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
            {/* DASHBOARD DATA */}
            <div className="d-flex flex-column flex-xl-row">              
              {/* PENDING TICKETS AND HIGH PRIORITY WRAPPER */}
              <div className="d-flex col-12 col-xl-6">
                {/* PENDING TICKETS */}
                <div className="col-6 d-flex" style={{minHeight: '13rem'}}>
                  <button value='Pending' className='btn d-flex flex-column rounded-4 flex-fill m-3 shadow' onClick={(e) => onCardsClickDashboard(e)}>        
                    <h5 className="mx-auto pt-4">Pending Tickets</h5>
                    <h1 className="mx-auto pt-3 text-success text-opacity-75" style={{ fontSize: "3.5em" }}>15</h1>        
                  </button>
                </div>
                {/* HIGH PRIORITY TICKETS */}
                <div className="col-6 d-flex">
                  <button value='High' className='btn d-flex flex-column rounded-4 flex-fill m-3 shadow' onClick={(e) => onCardsClickDashboard(e)}>
                    <h5 className="mx-auto pt-4">High Priority</h5>
                    <h1 className="mx-auto pt-3 text-danger text-opacity-75" style={{ fontSize: "3.5em" }}>7</h1>
                  </button>
                </div>
              </div>                
              {/* MEDIUM PRIORITY AND LOW PRIORITY WRAPPER */}
              <div className="d-flex col-12 col-xl-6">
                {/* MEDIUM PRIORITY */}
                <div className="col-6 d-flex" style={{minHeight: '13rem'}} >
                  <button value='Medium' className='btn d-flex flex-column rounded-4 flex-fill m-3 shadow' onClick={(e) => onCardsClickDashboard(e)}>
                    <h5 className="mx-auto pt-4">Medium Priority</h5>
                    <h1 className="mx-auto pt-3 text-warning text-opacity-75" style={{ fontSize: "3.5em"}}>21</h1>
                  </button>
                </div>
                {/* LOW PRIORITY TICKETS */}
                <div className="col-6 d-flex">
                  <button value='Low' className='btn d-flex flex-column rounded-4 flex-fill m-3 shadow' onClick={(e) => onCardsClickDashboard(e)}>
                    <h5 className="mx-auto pt-4">Low Priority</h5>
                    <h1 className="mx-auto pt-3 text-opacity-75 text-dark" style={{ fontSize: "3.5em" }}>6</h1>
                  </button>
                </div>
              </div>                        
            </div>
          </div>
          {/* DASHBOARD TABLE */}
          <div className="d-flex flex-column">
            <h3 className="ms-2">Tickets</h3>
            {!loading && ticketTableData !== null && 
              <TicketCollapsibleTable 
                data={ticketTableData} 
                initialStatusFilter={initialStatusFilter} 
                initialPriorityFilter={initialPriorityFilter} 
                sendTicketDataToParent={receiveTicketDataFromChild}
                />}
          </div>
        </div>       
        </DrawerSidebarNavigation>
      </>
    )  
};

export default AdminDashboard;