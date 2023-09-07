import * as React from 'react';
import { useRef} from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',  
  minWidth: '500px',  
  bgcolor: 'white',
  boxShadow: 24,
  borderRadius: '8px',
  p: 6,
  '&::-webkit-scrollbar': {
    display: 'none',
  },
};

const YesNoModal = React.memo(({ width='50vw', modalOpen, setModalOpen, onYesCallback, title='Title', yesMessage='Yes', cancelMessage='Cancel' }) => {        
  YesNoModal.displayName = 'YesNoModal';
  const called = useRef(false);

  const handleYes = () => {
    if (called.current) return;
    called.current = true;    
  
    setTimeout(async () => {
      await onYesCallback();
      setModalOpen(false);
      called.current = false;
    }, 150);
  };
  

  const closeModal = () => {

    setModalOpen(false);
    called.current = false;
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
          <Box sx={{ ...style, width: width }}>
            <div className="d-flex flex-column mx-auto">                                    
            <h1 className=''>{title}</h1>
          </div>                                            
            <div className="d-flex justify-content-end">
              <button className="btn btn-dark me-2" onClick={handleYes} style={{minWidth: '90px' }}>
                {yesMessage}
              </button>              
              <button className="btn btn-light" onClick={closeModal} style={{minWidth: '90px' }}>
                {cancelMessage}
              </button>              
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
})


export default YesNoModal;