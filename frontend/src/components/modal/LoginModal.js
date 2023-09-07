import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import { login } from '@/apiRequests/authentication/loginRequest';
import CryptoJS from 'crypto-js';
import CircularProgressModal from './CircularProgressModal';
import Link from 'next/link';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '32rem',
  minWidth: '310px',
  maxHeight: '95vh',
  overflowY: 'scroll',
  scrollbarWidth: 'none', // Add this line for Firefox
  bgcolor: 'white',
  boxShadow: 24,
  borderRadius: '8px',
  p: 8,
  '&::-webkit-scrollbar': { // Add this block for WebKit-based browsers
    display: 'none',
  },
};

export default function LoginModal({ modalOpen, setModalOpen, redirectToAddTicket=false}) {
  
  const router = useRouter();
  const formRef = useRef();
  const [showProgress, setShowProgress] = useState(false);
  const [error, setError] = useState('');
  const [statusCode, setStatusCode] = useState(0);

  const handleLogin = async (event) => {
    event.preventDefault();
    setShowProgress(true);
    setError('');
    setStatusCode(0);
  
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
  
    const getLoginResponse = await login({ email: data.email, password: data.password });
    console.log(getLoginResponse)

    if (getLoginResponse[0] !== 200) {
      setTimeout(() => {
        setShowProgress(false);
        setStatusCode(getLoginResponse[0])

        if (getLoginResponse[0] === 500) {
          setError(getLoginResponse[1])
          return
        }          
        setError(getLoginResponse[1].data);

      }, 500);
      return;
    }
  
    console.log('-- LOGIN RESPONSE --');
    console.log(getLoginResponse);    
    

    // Encrypt email and password using AES encryption
    const secretKey = 'your-secret-key'; // Replace this with your actual secret key
    const encryptedEmail = CryptoJS.AES.encrypt(data.email, 'email').toString();
    const encryptedPassword = CryptoJS.AES.encrypt(data.password, 'password').toString();
    const encryptedRole = CryptoJS.AES.encrypt(getLoginResponse[1].role.type, 'role').toString();
  
    // Store encrypted email and password in local storage
    localStorage.setItem('email', encryptedEmail);
    localStorage.setItem('password', encryptedPassword);
    localStorage.setItem('role', encryptedRole);
  
    setTimeout(async () => {      

      if (redirectToAddTicket) {
        
        await router.push(`/dashboard/add/ticket`);      
        setShowProgress(false);
        return
      }

      await router.push(`/dashboard/${getLoginResponse[1].role.type.toString().toLowerCase()}`);      
      setShowProgress(false);
    }, 1500);
  };
  

  const handleForgotPassword = () => {
    // Implement your forgot password logic here
    console.log('Forgot password clicked');
  };

  const closeModal = () => {

    if (showProgress)
      return

    setModalOpen(false);
    setShowProgress(false);
    const contentWrapper = document.querySelector('.content-wrapper');
    if (contentWrapper) {
      contentWrapper.style.overflow = 'auto';
    }
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
    const email = data.email;
    router.push({
      pathname: '/forgot-password',
      query: { email: email },
    });
  };

  return (
    <div>
      <CircularProgressModal modalOpen={showProgress} />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={closeModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={style}>
            <div className="d-flex flex-column flex-xxl-row align-items-center mx-auto mb-5">
              <img
                className='mb-4 mb-xxl-3'
                src="/appLogoBlack.png"
                alt="App Logo"
                style={{ width: '150px', height: '150px' }}
              />
              <h1 className='ms-3 my-auto text-center text-xxl-start'>Service Charge Application</h1>
            </div>
            <h3 id="transition-modal-title" className='mb-4' style={{ textAlign: 'start' }}>Login</h3>                                    
            <form ref={formRef} onSubmit={handleLogin}>
            {error && <p className='m-0 p-0' style={{ color: 'red' }}>{error}</p>}
              <TextField
                name="email"
                fullWidth
                label="Email"                
                margin="normal"
                variant="outlined"
                error={error === 'Email does not exist' || statusCode === 500}                
              />              
              <TextField
                name="password"
                fullWidth
                label="Password"
                type="password"                
                margin="normal"
                variant="outlined"
                error={error === 'Password does not match' || statusCode === 500}
              />
            </form>                       
            <div className="d-flex justify-content-end mb-3">              
            <Link
                className="text-decoration-none me-2"
                href="/forgot-password"
                onClick={handleForgotPasswordClick}
              >
                Forgot password?
              </Link>

            </div>           
            <div className="d-flex justify-content-end">
              <button className="btn btn-dark me-3" onClick={handleLogin} style={{ marginTop: '16px' }}>
                Sign In
              </button>
              <button className="btn btn-light" onClick={closeModal} style={{ marginTop: '16px' }}>
                Cancel
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
