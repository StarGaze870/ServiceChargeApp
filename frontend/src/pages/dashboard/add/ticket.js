import React, { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import Container from '@mui/material/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import isLoggedIn from '../../isLoggedIn';
import { CircularProgress } from '@mui/material';
import CollapsibleTable from '@/components/table/CollapsibleTable';
import { getAllTickets } from '@/apiRequests/tickets/getAllTickets';
import DrawerSidebarNavigation from '@/components/appBar/DrawerSidebarNavigation';
// import AddTicketModal from '@/components/modal/AddTicketModal';
import AddTicketModal from '@/components/modal/AddTicketModal';
import { getSingleTicket } from '@/apiRequests/tickets/getSingleTicket';
import LogoutModal from '@/components/modal/LogoutModal';


const AddTicket = () => {    

  // SELF VARIABLES
  const router = useRouter();
  const [showProgress, setShowProgress] = useState(false);
  const [loading, setLoading] = useState(true);

  // LOGOUT VARIABLE
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);    

  useEffect(() => {

    const ini = async () => {

      // CHECK USERS VALIDITY
      const isAuthrorized = await isLoggedIn();      
      if (!isAuthrorized[0]) {
        await router.replace('/');      
        return;
      }
      setLoading(false);              

    };
    ini();

  }, []);

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

  return (    
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
        <LogoutModal modalOpen={logoutModalOpen} setModalOpen={setLogoutModalOpen} onLogoutCallBack={handleLogoutCallback}/>

        <DrawerSidebarNavigation
          headerTitle='New Ticket'
          selectedOption='Add New Ticket'
          onDashboard={onLogoutClick}
          onAddUser={onLogoutClick}          
          onSendEmail={onLogoutClick}
          onViewTickets={onLogoutClick}
          onViewUsers={onLogoutClick}
          onGenerateReport={onLogoutClick}
          onLogout={onLogoutClick}
          >                
          <div className="container-fluid">
            
          </div>       
        </DrawerSidebarNavigation>
      </>
    )  
};

export default AddTicket;