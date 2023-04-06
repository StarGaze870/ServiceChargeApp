import { memo, useRef, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { MenuItem, Select, TextField } from '@mui/material';
import priorityID from '@/db_default_variables/priorities';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUpload from '@/components/file/FileUpload';
import statusID from '@/db_default_variables/status';

const style = {    
  overflowY: 'scroll',
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxHeight: '90vh',
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

const EditTicketModal = memo(({ modalOpen, setModalOpen, onYesCallback, data}) => {        

  const called = useRef(false);

  const [priority, setPriority] = useState(priorityID[0]);  
  const [status, setStatus] = useState(statusID[5]);  

  const handleYes = () => {
    if (called.current) return;
    called.current = true;    
  
    setTimeout(async () => {
      await onYesCallback();
      setModalOpen(false);
      called.current = false;
    }, 150);
  };
  
  const handlePriorityChange = (event) => setPriority(JSON.parse(event.target.value));        
  const handleStatusChange = (event) => setStatus(JSON.parse(event.target.value));        
  

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
          <Box sx={style}>   
            <div className='d-flex flex-row justify-content-between mb-5'>
                <h2 className=''>Ticket Update</h2>
                <button className='btn'>
                    <DeleteIcon className='' sx={{fontSize: '1.9em'}} color='error' />
                </button>
            </div>             
            <div className='d-flex'>                
                <Select                
                    className=''
                    fullWidth
                    sx={{minWidth: '10em'}}                    
                    value={JSON.stringify({ id: priority.id, type: priority.type })}
                    onChange={handlePriorityChange}            
                    renderValue={(selectedValue) => {
                        const valueObj = JSON.parse(selectedValue);
                        return <strong>{`${valueObj.type} Priority`}</strong>;
                    }}
                    inputProps={{ 'aria-label': 'Without label' }}
                    
                    >            
                <MenuItem value={JSON.stringify({ id: priorityID[2].id, type: priorityID[2].type })}>High</MenuItem>
                <MenuItem value={JSON.stringify({ id: priorityID[1].id, type: priorityID[1].type })}>Medium</MenuItem>
                <MenuItem value={JSON.stringify({ id: priorityID[0].id, type: priorityID[0].type })}>Low</MenuItem>
                </Select>                
            </div>
            <div className='d-flex mt-4 mb-4'>                
                <Select                
                    className=''
                    fullWidth
                    sx={{minWidth: '10em'}}                    
                    value={JSON.stringify({ id: status.id, type: status.type })}
                    onChange={handleStatusChange}            
                    renderValue={(selectedValue) => {
                        const valueObj = JSON.parse(selectedValue);
                        return <strong>{`${valueObj.type} Status`}</strong>;                        
                    }}
                    inputProps={{ 'aria-label': 'Without label' }}
                    
                    >            
                {statusID.map((status, index) => (
                    <MenuItem key={index} value={JSON.stringify({ id: status.id, type: status.type })}>
                    {status.type}
                    </MenuItem>
                ))}
                </Select>                
            </div>                   
            <div>
                <TextField
                  className="mt-4"
                  name="subject"
                  fullWidth
                  label="Subject"
                  margin="normal"
                  variant="outlined"
                //   value={subject}
                //   onChange={(e) => setSubject(e.target.value)}
                />
                <TextField
                  className="mt-3 mb-1"
                  fullWidth
                  label="Description"
                  multiline
                  rows={8}
                //   value={description}
                //   onChange={(e) => setDescription(e.target.value)}                
                />
                <p className='ms-2' style={{fontSize: '.9em'}}>from: <strong>{'Alyssa Jumapao'}</strong></p>
            </div>
            <div className='d-flex flex-column mt-5'>
                <label className='ms-2 mb-2'>Conforme Slip</label>
                <FileUpload maxFiles={1} />
                <label className='ms-2 mb-2'>Proof of Payment</label>
                <FileUpload maxFiles={1} />
                <label className='ms-2 mb-2'>Scanned Official Receipt Slip</label>
                <FileUpload maxFiles={1} />
            </div>
            <div className='d-flex justify-content-end mt-5'>
                <button className='btn btn-dark px-4'>Save</button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
})


export default EditTicketModal;