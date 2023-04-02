import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import { CircularProgress } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vw',
  minWidth: '500px',  
  bgcolor: 'white',
  boxShadow: 24,
  borderRadius: '8px',
  p: 6,
  '&::-webkit-scrollbar': { // Add this block for WebKit-based browsers
    display: 'none',
  },
};

const LogoutModal = React.memo(({ modalOpen, setModalOpen, onLogoutCallBack }) => {
      
  const [showProgress, setShowProgress] = useState(false);  

  const handleLogout = () => {    

    setTimeout(async () => {      

      onLogoutCallBack();
      setModalOpen(false)
      setShowProgress(false);  
    }, 500);      
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
            <div className="d-flex flex-column mx-auto">                                    
            <h1 className=''>Logout</h1>
          </div>                                            
            <div className="d-flex justify-content-end">
              <button className="btn btn-dark me-2" onClick={handleLogout} style={{minWidth: '90px' }}>
                Yes
              </button>              
              <button className="btn btn-light" onClick={closeModal} style={{minWidth: '90px' }}>
                Cancel
              </button>              
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
})


export default LogoutModal;