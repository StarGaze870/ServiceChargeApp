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
  minWidth: '200px',  
  bgcolor: 'white',
  boxShadow: 24,
  borderRadius: '8px',
  p: 6,
  '&::-webkit-scrollbar': {
    display: 'none',
  },
};

const InfoModal = React.memo(({ width='50vw', modalOpen, setModalOpen, onYesCallback, title='Title', messageData='Message Data', yesMessage='Yes'}) => {        
  InfoModal.displayName = 'InfoModal';
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
            <div className="d-flex justify-content-center">                                    
                <h1 className=''>{title}</h1>
            </div>
            <div className='d-flex mt-3 mb-3 justify-content-center'>
                <p>{messageData}</p>
            </div>                                         
            <div className="d-flex justify-content-center">
              <button className="btn btn-dark me-2" onClick={handleYes} style={{minWidth: '90px' }}>
                {yesMessage}
              </button>                                   
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
})


export default InfoModal;