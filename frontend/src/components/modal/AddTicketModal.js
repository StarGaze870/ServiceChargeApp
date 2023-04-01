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
import { createTicket } from '@/apiRequests/tickets/createTicket';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  height: '80vh',
  width: '30vw',
  minWidth: '500px',
  bgcolor: 'white',  
  boxShadow: 24,
  borderRadius: '8px',
  p: 8,
};

export default function AddTicketModal({ modalOpen, setModalOpen }) {
  
  const router = useRouter();
  const formRef = useRef();
  const [showProgress, setShowProgress] = useState(false);
  const [error, setError] = useState('');
  const [statusCode, setStatusCode] = useState(0);

  const handleAddTicket = async (event) => {
    event.preventDefault();
    setShowProgress(true);
    setError('');
    setStatusCode(0);
  
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());
  
    console.log(data);
    
    console.log('-- CREATING TICKETS --')
    const getLoginResponse = await createTicket({ 
      subject: data.subject, 
      description: data.description, 
      userID: 1 
    });        
    setModalOpen(false)
    setShowProgress(false);
    console.log(getLoginResponse);

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
            <h1 className='mx-auto my-auto'>Add Ticket</h1>
          </div>            
            <form ref={formRef} onSubmit={handleAddTicket}>
            {error && <p className='m-0 p-0' style={{ color: 'red' }}>{error}</p>}
              <TextField
                name="subject"
                fullWidth
                label="Subject"                
                margin="normal"
                variant="outlined"                
              />              
              <TextField
                name="description"
                fullWidth
                multiline
                rows={6} 
                label="Description"                
                margin="normal"
                variant="outlined"                
              />
            </form>                        
            <div className="d-flex justify-content-end">
              <button className="btn btn-dark w-25" onClick={handleAddTicket} style={{ marginTop: '16px' }}>
                Add
              </button>              
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
