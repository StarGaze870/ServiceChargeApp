import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';
import { login } from '@/apiRequests/authentication/loginRequest';
import CryptoJS from 'crypto-js';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '30vw',
  minWidth: '500px',
  bgcolor: 'white',
  border: '1px solid #000',
  boxShadow: 24,
  borderRadius: '8px',
  p: 8,
};

export default function LoginModal({ modalOpen, setModalOpen }) {
  
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

  return (
    <div>
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

            <div className="d-flex flex-column flex-xxl-row align-items-center mx-auto mb-5">
            <img
              className='me-5 mb-3'
              src="/appLogoBlack.png"
              alt="App Logo"
              style={{ width: '150px', height: '150px' }}
            />
            <h1 className='mx-auto my-auto'>Service Charge Application</h1>
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
            <Button variant="text" onClick={handleForgotPassword} style={{ textAlign: 'right', display: 'block', marginBottom: '1em' }}>
              Forgot password?
            </Button>
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
