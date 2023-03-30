import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Container from '@mui/material/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import isLoggedIn from '../isLoggedIn';
import { CircularProgress } from '@mui/material';

const AdminDashboard = () => {    

  const router = useRouter();
  const [showProgress, setShowProgress] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ini = async () => {
      const isAuthrorized = await isLoggedIn();      
      if (!isAuthrorized[0]) {
        await router.replace('/');      
      }
      else {
        setLoading(false);
      }
    };

    ini();
  }, []);

  const onLogout = () => {

    setShowProgress(true)

    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('role');              

    setTimeout(async () => {
      await router.push('/');
      setShowProgress(false);      
    }, 1000);
  };

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
          <title>Admin Dashboard</title>
        </Head>
        <Container maxWidth="lg">
          <h1>TEST</h1>          
          <button className='btn btn-dark' onClick={onLogout}>LOGOUT</button>
        </Container>
      </>
    )
  );
};

export default AdminDashboard;
