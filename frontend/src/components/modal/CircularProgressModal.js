import { memo, useEffect, useMemo, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { CircularProgress } from '@mui/material';

const style = {
  display: 'flex',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'transparent',    
  p: 4,
  '&:focus': {
    outline: 'none',
    border: 'none',
  },
};

const CircularProgressModal = memo(({ modalOpen=false }) => {
  
  const [open, setOpen] = useState(modalOpen);  

  useEffect(() => {

    setOpen(modalOpen);

  }, [modalOpen])

  return (
    <div className='w-100'>      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}        
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <CircularProgress className='m-auto' color="warning" size="5rem" thickness={5}/>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
})

export default CircularProgressModal;