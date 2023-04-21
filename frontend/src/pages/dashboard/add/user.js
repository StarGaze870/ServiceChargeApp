import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import isLoggedIn from '../../isLoggedIn';
import { MenuItem, Select, TextField } from '@mui/material';
import DrawerSidebarNavigation from '@/components/appBar/DrawerSidebarNavigation';
import FileUpload from '@/components/file/FileUpload';
import YesNoModal from '@/components/modal/YesNoModal';
import statusID from '@/db_default_variables/status';
import priorityID from '@/db_default_variables/priorities';
import adminUser from '@/db_default_variables/userAdmin';
import { createTicket } from '@/apiRequests/tickets/createTicket';
import CircularProgressModal from '@/components/modal/CircularProgressModal';
import SucessSlide from '@/components/transitions/SucessSlide';
import UserAutoComplete from '@/components/user/UserAutoComplete';
import RoleAutoComplete from '@/components/user/RoleAutoComplete';

const AddUser = () => {    

  // SELF VARIABLES
  const router = useRouter();
  const [showProgress, setShowProgress] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [loading, setLoading] = useState(true);

  // LOGOUT VARIABLE
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);    
  const onLogoutClick = () => setLogoutModalOpen(true);

  // ADD TICKET VARIABLES
  const [role, setUser] = useState(adminUser);  
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
    localStorage.setItem('user', JSON.stringify(role));
    localStorage.setItem('priority', JSON.stringify(priority));
    localStorage.setItem('subject', subject);
    localStorage.setItem('description', description);
  }, [role, priority, subject, description]);    

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

  const handleSelectedRole = useCallback((user) => {    
    setUser(user);    
  });

  const onNewTicketYesCallback = useCallback(async () => {
    
    setShowProgress(true);
    
    const newTicket = await createTicket({

      userID: role.id,
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
          headerTitle='New User'
          selectedOption='Add New User'
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
                <RoleAutoComplete selectedRole={role} roleSelectedCallback={handleSelectedRole}/>
                <TextField
                  className="mt-4"
                  name="firstname"
                  fullWidth
                  label="First Name"
                  margin="normal"
                  variant="outlined"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <TextField
                  className="mt-3"
                  name="lastname"
                  fullWidth
                  label="Last Name"
                  margin="normal"
                  variant="outlined"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
                <TextField
                  className="mt-3"
                  name="email"
                  fullWidth
                  label="Email"
                  margin="normal"
                  variant="outlined"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />                                   
                </div>
                <div className='col-12 col-xl-7 ms-xl-3'>            
                  <h3 className='ms-xl-5 mb-4 mt-5 mt-xl-0'>User Summary</h3>
                  <div className='d-flex flex-column mx-xl-5 shadow p-5'>                  
                    <div className='d-flex flex-column'>                      
                    <div className="d-flex flex-column">
                    <div>
                      <label style={{width: '7em'}}>Name:</label>
                      <strong>{currentDate}</strong>
                    </div>
                    <div>
                      <label style={{width: '7em'}}>Email:</label>
                      <strong>{subject}</strong>
                    </div>                    
                  </div>
                  <br />
                      <br />                      
                      <label>Description:</label>
                      <br />
                      <p className="description-text text-break">{description}</p>
                      <br />
                      <br />
                      <br />                      
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

export default AddUser;