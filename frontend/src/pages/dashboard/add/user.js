import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';
import isLoggedIn from '../../isLoggedIn';
import { MenuItem, Select, TextField } from '@mui/material';
import DrawerSidebarNavigation from '@/components/appBar/DrawerSidebarNavigation';
import YesNoModal from '@/components/modal/YesNoModal';
import statusID from '@/db_default_variables/status';
import priorityID from '@/db_default_variables/priorities';
import adminUser from '@/db_default_variables/userAdmin';
import { createTicket } from '@/apiRequests/tickets/createTicket';
import CircularProgressModal from '@/components/modal/CircularProgressModal';
import SucessSlide from '@/components/transitions/SucessSlide';
import RoleAutoComplete from '@/components/user/RoleAutoComplete';
import PersonIcon from '@mui/icons-material/Person';
import { createUser } from '@/apiRequests/users/createUser';

const AddUser = () => {    

  // SELF VARIABLES
  const router = useRouter();
  const [showProgress, setShowProgress] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [loading, setLoading] = useState(true);
  const [submitClicked, setSubmitClicked] = useState(false)

  // LOGOUT VARIABLE
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);    
  const onLogoutClick = () => setLogoutModalOpen(true);

  // ADD USER VARIABLES
  const [role, setRole] = useState(null);  
  const [firstname, setFirstname] = useState('');  
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');  

  const [newUserModal, setNewUserModal] = useState(false);    
  const onSubmitClick = () => {

    if (!firstname || !lastname || !email || !role) {
      setSubmitClicked(true);    
    }
    else {
      setSubmitClicked(false);
      setNewUserModal(true);
    }       
  }

  useEffect(() => {                    

    // Check for saved data in local storage and set the state if it exists
    const savedRole = localStorage.getItem('newUserRole');
    const savedFirstname = localStorage.getItem('firstname');
    const savedLastname = localStorage.getItem('lastname');
    const savedEmail = localStorage.getItem('newEmail');        
    
    if (savedRole && savedRole !== null) setRole(JSON.parse(savedRole));    
    if (savedFirstname && savedFirstname !== 'null') setFirstname(savedFirstname);
    if (savedLastname && savedLastname !== 'null') setLastname(savedLastname);
    if (savedEmail && savedEmail !== 'null') setEmail(savedEmail);    
  
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
    localStorage.setItem('newUserRole', JSON.stringify(role));
    localStorage.setItem('firstname', firstname);
    localStorage.setItem('lastname', lastname);
    localStorage.setItem('newEmail', email);    

  }, [role, firstname, lastname, email]);    

  // SUCESS ALERT
  useEffect(() => {

    if (!showSuccessAlert && !showErrorAlert) return;

    setTimeout(async () => {      
      setShowSuccessAlert(false)
      setShowErrorAlert(false)
    }, 5000);

  }, [showSuccessAlert, showErrorAlert]);

  const handleLogoutCallback = useCallback(async () => {

    setShowProgress(true)

    localStorage.removeItem('email');
    localStorage.removeItem('password');
    localStorage.removeItem('role');

    await router.push('/');
    
  })    

  const handleSelectedRole = useCallback((newRole) => {    
    setRole(newRole);        
  });

  const onNewUserYesCallback = useCallback(async () => {
    
    setShowProgress(true);        

    const newUser = await createUser({

      roleID: role.id,
      firstname: firstname,
      lastname: lastname,
      email: email,
    });
    console.log(newUser);


    if(newUser[0] === 201) {      

      localStorage.setItem('newUserRole', null);
      localStorage.setItem('firstname', null);
      localStorage.setItem('lastname', null);
      localStorage.setItem('newEmail', null);
      localStorage.setItem('description', null);

      setRole(null);
      setFirstname('')
      setLastname('')
      setEmail('')      

      setTimeout(() => {      
        setShowProgress(false);
  
        setTimeout(() => {      
          setShowSuccessAlert(true);           
        }, 600);
        
      }, 1000);
    }
    else {
      if (newUser[1].data.includes('users.email_UNIQUE')) {
        setTimeout(() => {      
          setShowProgress(false);
    
          setTimeout(() => {      
            setShowErrorAlert(true);           
          }, 600);
          
        }, 1000);
      }
    }    
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
        <YesNoModal modalOpen={newUserModal} setModalOpen={setNewUserModal} onYesCallback={onNewUserYesCallback} title='Submit Ticket'/>        
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
            <SucessSlide toggleShow={showSuccessAlert} message={'User Sucessfully Added'} hrefPath='/dashboard/view/users' queryDataJSON={{isFrommAddUsers: true}}/>            
            <SucessSlide toggleShow={showErrorAlert} title={'Error'} disableLink={true} message={`Email already exists: ${email}`} severity='error'/>
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
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  error={submitClicked && !firstname}
                  helperText={submitClicked && !firstname ? 'First name is required' : ' '}
                />
                <TextField
                  className="mt-2"
                  name="lastname"
                  fullWidth
                  label="Last Name"
                  margin="normal"
                  variant="outlined"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  error={submitClicked && !lastname}
                  helperText={submitClicked && !lastname ? 'Last name is required' : ' '}
                />
                <TextField
                  className="mt-2"
                  name="email"
                  fullWidth
                  label="Email"
                  margin="normal"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={submitClicked && !email}
                  helperText={submitClicked && !email ? 'Email is required' : ' '}
                />                                   
                </div>
                <div className='col-12 col-xl-7 ms-xl-3'>            
                  <h3 className='ms-xl-5 mb-4 mt-5 mt-xl-0'>User Summary</h3>
                  <div className='d-flex flex-column mx-xl-5 shadow p-5'>                  
                    <div className='d-flex flex-column'>                      
                      <div className="d-flex flex-column">
                        <PersonIcon className='d-flex align-self-center' sx={{fontSize: '10em'}} />
                        <div className="d-flex flex-row mb-1">
                            <label style={{minWidth: '4.5em'}}>Name:</label>
                            <strong className='text-break'>{firstname + ' ' + lastname}</strong>
                        </div>
                        <div className="d-flex flex-row mt-1">
                            <label style={{minWidth: '4.5em'}}>Email:</label>
                            <strong className='text-break'>{email}</strong>
                        </div>                                       
                      </div>
                  <br />
                      <br />                      
                      <label>Description:</label>
                      <br />
                      <p className="description-text text-break">{role ? role.description : ''}</p>
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