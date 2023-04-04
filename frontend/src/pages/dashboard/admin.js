import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import Container from '@mui/material/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import isLoggedIn from '../isLoggedIn';
import { CircularProgress } from '@mui/material';
import CollapsibleTable from '@/components/table/CollapsibleTable';
import { getAllTickets } from '@/apiRequests/tickets/getAllTickets';
import DrawerSidebarNavigation from '@/components/appBar/DrawerSidebarNavigation';
// import AddTicketModal from '@/components/modal/AddTicketModal';
import AddTicketModal from '@/components/modal/AddTicketModal';
import { getSingleTicket } from '@/apiRequests/tickets/getSingleTicket';
import LogoutModal from '@/components/modal/LogoutModal';


const AdminDashboard = () => {    

  // SELF VARIABLES
  const router = useRouter();
  const [showProgress, setShowProgress] = useState(false);
  const [loading, setLoading] = useState(true);

  // TICKET TABLE VARIABLE
  const [ticketTableData, setTicketTableData] = useState(null)
  const [initialStatusFilter, setInitialStatusFilter] = useState('All');
  const [initialPriorityFilter, setInitialPriotityFilter] = useState('All');

  // TICKETS VARIABLE
  const [addTicketmodalOpen, setAddTicketModalOpen] = useState(false);    

  // LOGOUT VARIABLE
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);    

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

      const getTickets = await getAllTickets();
      console.log("-- GETTING ALL TICKETS --")
      console.log(getTickets);

      setTicketTableData(getTickets[1]);      

    };
    ini();

  }, []);

  const onAddTicket = () => setAddTicketModalOpen(true);      
  const onLogoutClick = () => setLogoutModalOpen(true);

  const handleLogoutCallback = useCallback(() => {

    setShowProgress(true)

    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('role');              

    setTimeout(async () => {
      await router.push('/');
      setShowProgress(false);      
    }, 1000);
  })  

  const onAddTicketCallback = useCallback(async ({ticketId}) => {
    
    const newTicket = await getSingleTicket(ticketId);
    setTicketTableData([newTicket[1], ...ticketTableData])
    
  });

  const onCardsClickDashboard = useCallback((e) => {
            
    if (e.target.value === 'Pending') {
    
      setInitialStatusFilter('Pending');
      setInitialPriotityFilter('All');            
    } 
    else {
      setInitialStatusFilter('All');
      setInitialPriotityFilter(e.currentTarget.value);
    }               
  })

  return (
    !loading   && (
      <>
      {showProgress && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 9999,
            }}
          >
            <CircularProgress color="warning" size="5rem" thickness={5}/>
          </div>
          )}
        <Head>      
          <title>Service Charge</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/appLogoWhite.ico" />        
        </Head>                
        <AddTicketModal modalOpen={addTicketmodalOpen} setModalOpen={setAddTicketModalOpen} onAddTicketCallback={onAddTicketCallback} />     
        <LogoutModal modalOpen={logoutModalOpen} setModalOpen={setLogoutModalOpen} onLogoutCallBack={handleLogoutCallback}/>

        <DrawerSidebarNavigation
          onDashboard={onLogoutClick}
          onAddUser={onLogoutClick}
          onAddTicket={onAddTicket}
          onSendEmail={onLogoutClick}
          onViewTickets={onLogoutClick}
          onViewUsers={onLogoutClick}
          onGenerateReport={onLogoutClick}
          onLogout={onLogoutClick}

          >        

        {/* DASHBOARD */}
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
            {ticketTableData !== null && <CollapsibleTable data={ticketTableData} initialStatusFilter={initialStatusFilter} initialPriorityFilter={initialPriorityFilter} />}
          </div>

        </div>
       

        </DrawerSidebarNavigation>
      </>
    )
  );
};

export default AdminDashboard;