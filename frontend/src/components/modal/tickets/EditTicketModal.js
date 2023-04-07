import { memo, useEffect, useRef, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { MenuItem, Select, TextField } from '@mui/material';
import priorityID from '@/db_default_variables/priorities';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUpload from '@/components/file/FileUpload';
import statusID from '@/db_default_variables/status';
import YesNoModal from '../YesNoModal';
import CircularProgressModal from '../CircularProgressModal';
import DeleteTicketModal from '../DeleteTicketModal';
import { updateTicket } from '@/apiRequests/tickets/updateTicket';
import PostAddIcon from '@mui/icons-material/PostAdd';

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
  '&::-webkit-scrollbar': {
    display: 'none',    
  },  
};

const EditTicketModal = memo(({ modalOpen, setModalOpen, onSaveCallback, onDeleteCallback, data}) => {        

  const called = useRef(false);  
  const [showProgressBar, setShowProgressBar] = useState(false);

  const [ticketID, setTicketID] = useState(0);  
  const [userName, setUserName] = useState('');
  const [priority, setPriority] = useState(priorityID[0]);  
  const [status, setStatus] = useState(statusID[5]);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  // VALIDATION
  const [priorityValid, setPriorityValid] = useState(true);

  useEffect(() => {
    if (!data) return;            

    console.log(data)
    const priorityItem = priorityID.find((item) => item.type === data.priority);
    if (priorityItem) setPriority(priorityItem);

    setPriorityValid(data.priority === 'Pending' ? false : true);
  
    const statusItem = statusID.find((item) => item.type === data.status);
    if (statusItem) setStatus(statusItem);
  
    setSubject(data.subject || '');
    setDescription(data.details[0].description ? data.details[0].description : '');    
    setTicketID(data.details[0].ticketID ? data.details[0].ticketID : 0);
    setUserName(data.details[0].user ? data.details[0].user : 'User Undefined');

  }, [data]);
  

    // SAVE MODAL
    const [yesNoSaveModalOpen, setYesNoSaveModalOpen] = useState(false);
    const onSaveClick = () => setYesNoSaveModalOpen(true);

    // DELETE MODAL
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const onDeleteClick = () => setDeleteModalOpen(true);

  const handleSave = async () => {    

    setShowProgressBar(true);

    if (called.current) {
        return
    }
    else {

        if (ticketID === data.details[0].ticketID
            && priority.type === data.priority
            && status.type === data.status
            && subject === data.subject
            && description === description) {

            console.log('-- NO CHANGES MADE --')

            setModalOpen(false);           
            setShowProgressBar(false);
            called.current = false; 
            
            return
        }

        const priorityItem = priorityID.find((item) => item.type === data.priority);
        if (priorityItem) setPriority(priorityItem);
    
        setPriorityValid(data.priority === 'Pending' ? false : true);
      
        const statusItem = statusID.find((item) => item.type === data.status);
        if (statusItem) setStatus(statusItem);
      
        setSubject(data.subject || '');
        setDescription(data.details[0].description ? data.details[0].description : '');    
        setTicketID(data.details[0].ticketID ? data.details[0].ticketID : 0);
        setUserName(data.details[0].user ? data.details[0].user : 'User Undefined')

        called.current = true;          
        
        const updatedTicketData = await updateTicket({
            ticketID: ticketID,
            priorityID: priority.id === 4 ? null : priority.id,
            statusID: status.id,
            subject: subject,
            description: description
        })
        console.log('-- UPDATING TICKET --')  
        console.log(updatedTicketData)        

        setTimeout(async () => {
          
          await onSaveCallback({fromEditTicket: true});
          setModalOpen(false);           
          setShowProgressBar(false);
          called.current = false; 

        }, 1400);
    }   
  };

  const handleDelete = async () => {

    setShowProgressBar(true);

    if (called.current) {
        return
    }
    else {

        called.current = true;

        // TODO: DELETE API

        setTimeout(async () => {
          
          await onDeleteCallback();
          setModalOpen(false);           
          setShowProgressBar(false);
          called.current = false; 

        }, 1400);
    }   
  };
  
  const handlePriorityChange = (event) => {
    
    setPriorityValid(true);
    setPriority(JSON.parse(event.target.value));        
  }

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
      <CircularProgressModal modalOpen={showProgressBar} />
      {/* SAVE TICKET */}
      <YesNoModal width='45vw' modalOpen={yesNoSaveModalOpen} setModalOpen={setYesNoSaveModalOpen} title={'Save Ticket'} onYesCallback={handleSave}/>
      {/* DELETE TICKET */}
      <DeleteTicketModal width='45vw' modalOpen={deleteModalOpen} setModalOpen={setDeleteModalOpen} title={'Delete Ticket'} onYesCallback={handleDelete}/>
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
                <button className='btn' onClick={onDeleteClick}>
                    <DeleteIcon className='' sx={{fontSize: '1.9em'}} color='error' />
                </button>
            </div>                         
            <div className='d-flex flex-column'>        
                {!priorityValid &&  <p className='m-0 ms-2 mb-1 p-0 text-danger' style={{fontSize: '.9rem'}}>Priority needs to be set</p>}
                <Select                
                    className=''
                    fullWidth
                    sx={{minWidth: '10em'}}                    
                    value={JSON.stringify({ id: priority.id, type: priority.type })}
                    onChange={handlePriorityChange}            
                    renderValue={(selectedValue) => {
                        const object = JSON.parse(selectedValue);

                        if (object.type === 'Pending')
                            return <strong className='text-danger'>{`${object.type} Priority`}</strong>;

                        return <strong>{`${object.type} Priority`}</strong>;
                    }}
                    inputProps={{ 'aria-label': 'Without label' }}                    
                    >                            
                <MenuItem className='d-none' value={JSON.stringify({ id: priorityID[3].id, type: priorityID[3].type })}>Pending</MenuItem>
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
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <TextField
                  className="mt-3 mb-1"
                  fullWidth
                  label="Description"
                  multiline
                  rows={8}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}                
                />
                <p className='ms-2' style={{fontSize: '.9em'}}>from: <strong>{userName}</strong></p>
            </div>
            <div className='d-flex flex-column mt-5'>
                <div className='d-flex'>
                    <label className='ms-2 mb-2'>Conforme Slip</label>
                    <a href='#' className='ms-2 mb-auto' style={{marginTop: '-.1em'}}><PostAddIcon color={'success'} /></a>
                </div>
                <FileUpload maxFiles={1} />
                <label className='ms-2 mb-2'>Proof of Payment</label>
                <FileUpload maxFiles={1} />
                <label className='ms-2 mb-2'>Scanned Official Receipt Slip</label>
                <FileUpload maxFiles={1} />
            </div>
            <div className='d-flex justify-content-end mt-5'>
                <button className='btn btn-dark px-4' onClick={onSaveClick}>Save</button>
                <button className='btn btn-light px-4' onClick={closeModal}>Cancel</button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
})


export default EditTicketModal;