import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import isLoggedIn from '../../isLoggedIn';
import { MenuItem, Select, TextField } from '@mui/material';
import DrawerSidebarNavigation from '@/components/appBar/DrawerSidebarNavigation';
import FileUpload from '@/components/file/FileUpload';
import UserSelect from '@/components/user/UserSelect';
import YesNoModal from '@/components/modal/YesNoModal';
import statusID from '@/db_default_variables/status';
import priorityID from '@/db_default_variables/priorities';
import adminUser from '@/db_default_variables/userAdmin';
import { createTicket } from '@/apiRequests/tickets/createTicket';
import CircularProgressModal from '@/components/modal/CircularProgressModal';
import SucessSlide from '@/components/transitions/SucessSlide';
import UserAutoComplete from '@/components/user/UserAutoComplete';

const AddTicket = () => {    

  // SELF VARIABLES
  const router = useRouter();
  const [showProgress, setShowProgress] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [loading, setLoading] = useState(true);

  // LOGOUT VARIABLE
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);    
  const onLogoutClick = () => setLogoutModalOpen(true);

  // ADD TICKET VARIABLES
  const [user, setUser] = useState(adminUser);  
  const [priority, setPriority] = useState(priorityID[0]);  
  const [currentDate, setCurrentDate] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState(''); 

  const [newTicketModal, setNewTicketModal] = useState(false);    
  const onSubmitClick = () => setNewTicketModal(true);

  useEffect(() => {    
    
    // Check for saved data in local storage and set the state if it exists
    const savedUser = localStorage.getItem('user');
    const savedPriority = localStorage.getItem('priority');
    const savedSubject = localStorage.getItem('subject');
    const savedDescription = localStorage.getItem('description');    

    if (savedUser && savedUser !== 'null') setUser(JSON.parse(savedUser));    
    if (savedPriority && savedPriority !== 'null') setPriority(JSON.parse(savedPriority));
    if (savedSubject && savedSubject !== 'null') setSubject(savedSubject);
    if (savedDescription && savedDescription !== 'null') setDescription(savedDescription);  
  
    // Get current date
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setCurrentDate(dateStr);
  
    const ini = async () => {
      // Check users validity
      const isAuthrorized = await isLoggedIn();
      if (!isAuthrorized[0]) {
        await router.replace('/');
        return;
      }
      setLoading(false);
    };
    ini();
  }, []);
  
  useEffect(() => {

    // Save ticket variables to local storage when they change
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('priority', JSON.stringify(priority));
    localStorage.setItem('subject', subject);
    localStorage.setItem('description', description);
  }, [user, priority, subject, description]);    

  // SUCESS ALERT
  useEffect(() => {

    if (!showSuccessAlert) return;

    setTimeout(async () => {      
      setShowSuccessAlert(false)
    }, 5000);

  }, [showSuccessAlert]);

  const handleLogoutCallback = useCallback(async () => {

    setShowProgress(true)

    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('role');              
    await router.push('/');
    
  })
  
  const handlePriorityChange = (event) => {

    setPriority(JSON.parse(event.target.value));        
  };

  const handleSelectedUser = useCallback((user) => {    
    setUser(user);
    console.log(user)
  });

  const onNewTicketYesCallback = useCallback(async () => {
    
    setShowProgress(true);
    
    const newTicket = await createTicket({

      userID: user.id,
      statusID: statusID[4].id,
      priorityID: priority.id,
      subject: subject,
      description: description

    });


    if(newTicket[0] === 201) {
      localStorage.setItem('user', null);
      localStorage.setItem('priority', null);
      localStorage.setItem('subject', null);
      localStorage.setItem('description', null);

      setUser(adminUser);    
      setPriority(priorityID[0]);
      setSubject('');
      setDescription('');  

      console.log(newTicket)
    }

    setTimeout(() => {      
      setShowProgress(false);

      setTimeout(() => {      
        setShowSuccessAlert(true);           
      }, 600);
      
    }, 1000);
  })

  return (    
      <>                    
        <CircularProgressModal modalOpen={showProgress} />
        <Head>
          <title>Service Charge</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/appLogoWhite.png" />        
        </Head>                        
        <YesNoModal modalOpen={logoutModalOpen} setModalOpen={setLogoutModalOpen} onYesCallback={handleLogoutCallback} title='Logout'/>
        <YesNoModal modalOpen={newTicketModal} setModalOpen={setNewTicketModal} onYesCallback={onNewTicketYesCallback} title='Submit Ticket'/>        
        <DrawerSidebarNavigation
          headerTitle='New Ticket'
          selectedOption='Add New Ticket'
          onDashboard={onLogoutClick}
          onAddUser={onLogoutClick}          
          onSendEmail={onLogoutClick}
          onViewTickets={onLogoutClick}
          onViewUsers={onLogoutClick}
          onGenerateReport={onLogoutClick}
          onLogout={onLogoutClick}
          >                
          <div className="container-fluid">            
            <SucessSlide toggleShow={showSuccessAlert} message={'Ticket Sucessfully Added'} hrefPath='/dashboard/admin' queryDataJSON={{isFromAddTicket: true}}/>            
            <div className='d-flex flex-column flex-xl-row'>            
              <div className='col-12 col-xl-5 d-flex flex-column'>
                <div className='mb-4'>
                  <Select                
                    className=''
                    sx={{minWidth: '7em'}}                    
                    value={JSON.stringify({ id: priority.id, type: priority.type })}
                    onChange={handlePriorityChange}            
                    inputProps={{ 'aria-label': 'Without label' }}
                  >            
                    <MenuItem value={JSON.stringify({ id: priorityID[2].id, type: priorityID[2].type })}>High</MenuItem>
                    <MenuItem value={JSON.stringify({ id: priorityID[1].id, type: priorityID[1].type })}>Medium</MenuItem>
                    <MenuItem value={JSON.stringify({ id: priorityID[0].id, type: priorityID[0].type })}>Low</MenuItem>
                  </Select>
                  <label className='my-auto ms-3' style={{fontSize: '1.1em'}}>Priority</label>
                </div>
                {/* <UserSelect selectedUser={user} userSelectedCallback={handleSelectedUser}/> */}
                <UserAutoComplete selectedUser={user} userSelectedCallback={handleSelectedUser}/>
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
                  className="mt-3 mb-4"
                  fullWidth
                  label="Description"
                  multiline
                  rows={8}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}                  
                />
                  <label className='ms-2 mb-2'>Conforme Slip</label>
                  <FileUpload maxFiles={1} />
                  <label className='ms-2 mb-2'>Proof of Payment</label>
                  <FileUpload maxFiles={1} />
                  <label className='ms-2 mb-2'>Scanned Official Receipt Slip</label>
                  <FileUpload maxFiles={1} />
                </div>
                <div className='col-12 col-xl-7 ms-xl-3'>            
                  <h3 className='ms-xl-5 mb-4 mt-5 mt-xl-0'>Ticket Summary</h3>
                  <div className='d-flex flex-column mx-xl-5 shadow p-5'>                  
                    <div className='d-flex flex-column'>                      
                    <div className="d-flex flex-column">
                    <div>
                      <label style={{width: '4.5em'}}>Date:</label>
                      <strong>{currentDate}</strong>
                    </div>
                    <div>
                      <label style={{width: '4.5em'}}>Subject:</label>
                      <strong>{subject}</strong>
                    </div>
                    <div>
                      <label style={{width: '4.5em'}}>Priority:</label>
                      <strong>{priority.type.toUpperCase()}</strong>
                    </div>
                  </div>
                      <br />
                      <br />                      
                      <label>Description:</label>
                      <br />
                      <p className="description-text">{description}</p>
                      <br />
                      <br />
                      <br />
                      <label className='align-self-end'>from: <strong>{user?.displayLabel}</strong></label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='d-flex w-100 justify-content-end mt-5 mb-5'>
                <button className='btn btn-dark px-4 mx-4 mt-3 mb-5' onClick={onSubmitClick}>Submit</button>         
              </div>
          </div>                 
        </DrawerSidebarNavigation>
      </>
    )  
};

export default AddTicket;