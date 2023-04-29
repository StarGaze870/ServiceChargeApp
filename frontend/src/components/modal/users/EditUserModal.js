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
import EditNoteIcon from '@mui/icons-material/EditNote';
import { deleteTicket } from '@/apiRequests/tickets/deleteTicket';
import roleID from '@/db_default_variables/role';
import { updateUser } from '@/apiRequests/users/updateUser';
import { deleteUser } from '@/apiRequests/users/deleteUser';

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

const EditUserModal = memo(({ modalOpen, setModalOpen, onSaveCallback, onDeleteCallback, data}) => {        

  const called = useRef(false);  
  const [showProgressBar, setShowProgressBar] = useState(false);

  const [role, setRole] = useState(roleID[0]);
  const [userID, setUserID] = useState(0);  
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');      

  // VALIDATION
  const [priorityValid, setPriorityValid] = useState(true);

  useEffect(() => {
    if (!data) return;            
    
    console.log(data)

    const roleItem = roleID.find((item) => item.type === data.details[0].role);    
    setRole(roleItem)

    setUserID(data.details[0].userID);
    setFirstname(data.firstname || '');
    setLastname(data.lastname || '');
    setEmail(data.email || '');    

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

        if (role.type === data.details[0].role
            && email === data.email
            && firstname === data.firstname
            && lastname === data.lastname) {

            console.log('-- NO CHANGES MADE --')

            setModalOpen(false);           
            setShowProgressBar(false);
            called.current = false; 

            return
        }                               

        const updatedUserData = await updateUser({
            userId: parseInt(data.details[0].userID),
            roleId: role.id,
            firstname: firstname,
            lastname: lastname,
            email: email,
        })
        console.log('-- UPDATING USER --')  
        console.log(updatedUserData)        

        if (updatedUserData[0] === 200) {
            setTimeout(async () => {
          
                await onSaveCallback({fromEditUser: true});
                setModalOpen(false);           
                setShowProgressBar(false);
                called.current = false; 
      
              }, 1400);
        }
        else {
            
            await onSaveCallback({fromEditUser: true, failed: true});
            setModalOpen(false);           
            setShowProgressBar(false);
            called.current = false; 
        }
    }   
  };

  const handleDelete = async () => {

    setShowProgressBar(true);

    if (called.current) {
        return
    }
    else {

        called.current = true;
        
        const deleteUserData = await deleteUser(userID);
        console.log('-- DELETING USER --')  
        console.log(deleteUserData)    

        if (deleteUserData[0] === 200) {
            setTimeout(async () => {
          
                await onDeleteCallback();
                setModalOpen(false);           
                setShowProgressBar(false);
                called.current = false; 
      
              }, 1400);
        }
        else {

            await onDeleteCallback({failed: true});
            setModalOpen(false);           
            setShowProgressBar(false);
            called.current = false;
        }   
    }   
  };
  
  const handlePriorityChange = (event) => {
    
    setPriorityValid(true);
    setPriority(JSON.parse(event.target.value));        
  }

  const handleStatusChange = (event) => setRole(JSON.parse(event.target.value));        
  
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
                <h2 className=''>User Update</h2>
                <button className='btn' onClick={onDeleteClick}>
                    <DeleteIcon className='' sx={{fontSize: '1.9em'}} color='error' />
                </button>
            </div>                                     
            <div className='d-flex mb-4'>                
                <Select                
                    className=''
                    fullWidth
                    sx={{minWidth: '10em'}}                    
                    value={JSON.stringify({ id: role.id, type: role.type })}
                    onChange={handleStatusChange}            
                    renderValue={(selectedValue) => {
                        const valueObj = JSON.parse(selectedValue);
                        return <strong>{`${valueObj.type} Role`}</strong>;                        
                    }}
                    inputProps={{ 'aria-label': 'Without label' }}
                    
                    >            
                {roleID.map((role, index) => (
                    <MenuItem key={index} value={JSON.stringify({ id: role.id, type: role.type })}>
                    {role.type}
                    </MenuItem>
                ))}
                </Select>                
            </div>                   
            <div>
                <TextField
                  className="mt-4"
                  name="firstname"
                  fullWidth
                  label="Firstname"
                  margin="normal"
                  variant="outlined"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />    
                <TextField
                  className="mt-4"
                  name="lastname"
                  fullWidth
                  label="Lastname"
                  margin="normal"
                  variant="outlined"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />
                <TextField
                  className="mt-4"
                  name="email"
                  fullWidth
                  label="Email"
                  margin="normal"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />                                                      
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


export default EditUserModal;