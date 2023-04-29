import { Fragment, useCallback, useEffect, useState } from 'react';
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
import { sendEmailWithAttachment } from '@/apiRequests/email/sendEmailWithAttachment';

const SendEmail = () => {    

  // SELF VARIABLES
  const router = useRouter();
  const [showProgress, setShowProgress] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [loading, setLoading] = useState(true);
  const [submitClicked, setSubmitClicked] = useState(false)

  // LOGOUT VARIABLE
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);    
  const onLogoutClick = () => setLogoutModalOpen(true);

  // SEND EMAIL VARIABLES
  const [user, setUser] = useState(null);    
  const [currentDate, setCurrentDate] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState(''); 
  const [attachment, setAttachment] = useState(null);
  const [resetFilePond, setResetFilePond] = useState(false);    

  const [sendEmailModal, setSendEmailModal] = useState(false);    
  const onSubmitClick = () => {

    if (!subject || !description || !user) {
      setSubmitClicked(true);    
    }
    else {
      setSubmitClicked(false);
      setSendEmailModal(true);
    }      
  }

  useEffect(() => {    
    
    // Check for saved data in local storage and set the state if it exists
    const savedUser = localStorage.getItem('emailUser');    
    const savedSubject = localStorage.getItem('emailSubject');
    const savedDescription = localStorage.getItem('emailDdescription');    

    if (savedUser && savedUser !== 'null') setUser(JSON.parse(savedUser));        
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
    localStorage.setItem('emailUser', JSON.stringify(user));    
    localStorage.setItem('emailSubject', subject);
    localStorage.setItem('emailDdescription', description);
  }, [user, subject, description]);    

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

  const handleSelectedUser = useCallback((user) => {    
    setUser(user);        
  });

  const onNewTicketYesCallback = useCallback(async () => {
    
    setShowProgress(true);
    
    const emailDetals = {
      recipient: user.email,
      subject: subject,
      msgBody: description,
    }    

    const email = await sendEmailWithAttachment(emailDetals, attachment);
    console.log(email)

    if(email[0] === 200) {
      
      localStorage.setItem('emailUser', null);
      localStorage.setItem('emailSubject', null);
      localStorage.setItem('emailDdescription', null);

      setUser(null);        
      setSubject('');
      setDescription('');
      setAttachment(null);
      setResetFilePond(true)
    }

    setTimeout(() => {      
      setShowProgress(false);

      setTimeout(() => {      
        setShowSuccessAlert(true);           
      }, 600);
      
    }, 1000);
  })  

  const handleAttachmentUpload = ({files}) => {            
    
    if (files.length > 0) {
      setResetFilePond(false)
      setAttachment(files[0].file)
    }
    else {
      setAttachment(null)
      setResetFilePond(true)
    }
    
  };    

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
        <YesNoModal modalOpen={sendEmailModal} setModalOpen={setSendEmailModal} onYesCallback={onNewTicketYesCallback} title='Send Email'/>        
        <DrawerSidebarNavigation
          headerTitle='Send Email'
          selectedOption='Send Email'
          onDashboard={onLogoutClick}
          onAddUser={onLogoutClick}          
          onSendEmail={onLogoutClick}
          onViewTickets={onLogoutClick}
          onViewUsers={onLogoutClick}
          onGenerateReport={onLogoutClick}
          onLogout={onLogoutClick}
          >                
          <div className="container-fluid w-auto">            
            <SucessSlide toggleShow={showSuccessAlert} message={'Email Sent'} hrefPath='/dashboard/admin' disableLink={true}/>            
            <div className='d-flex flex-column flex-xl-row'>            
              <div className='mt-3 col-12 col-xl-5 d-flex flex-column'>                
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
                  error={submitClicked && !subject}
                  helperText={submitClicked && !subject ? 'Subject is required' : ' '}
                />
                <TextField
                  className="mt-3 mb-4"
                  fullWidth
                  label="Description"
                  multiline
                  rows={8}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}    
                  error={submitClicked && !description}
                  helperText={submitClicked && !description ? 'Description is required' : ' '}              
                />
                  <label className='ms-2 mb-2'>Attachement</label>
                  <FileUpload maxFiles={1} getFilesCallback={handleAttachmentUpload} reset={resetFilePond} />                                    
                </div>
                <div className='col-12 col-xl-7 ms-xl-3'>            
                  <h3 className='ms-xl-5 mb-4 mt-5 mt-xl-0'>Email Summary</h3>
                  <div className='d-flex flex-column mx-xl-5 shadow p-5'>                  
                    <div className='d-flex flex-column'>                      
                    <div className="d-flex flex-column">                  
                    <div className="d-flex flex-row">
                        <label style={{minWidth: '4.5em'}}>Date:</label>
                        <strong className='text-break'>{currentDate}</strong>
                    </div>
                    <div className='mt-1'>
                      <label style={{width: '4.5em'}}>To:</label>
                      <strong>{user ? user.email : ''}</strong>
                    </div>
                    <div className="d-flex flex-row my-1">
                        <label style={{minWidth: '4.5em'}}>Subject:</label>
                        <strong className='text-break'>{subject}</strong>
                    </div>                                                            
                  </div>                      
                      <br />                      
                      <label>Description:</label>
                      <br />
                      {/* <p className="description-text text-break">{description}</p> */}
                      <p className="description-text text-break">{formatDescription(description)}</p>
                      <br />
                      <br />
                      <br />
                      <label className='align-self-end'>from: <strong>Alliance Service Charge</strong></label>
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

function formatDescription(text) {
    return text.split('\n').map((line, index) => (
      <Fragment key={index}>
        {line}
        <br />
        </Fragment>
    ));
  }

export default SendEmail;