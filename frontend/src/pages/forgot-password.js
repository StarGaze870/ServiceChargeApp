import Head from 'next/head'
import { useEffect, useRef, useState } from 'react';
import LoginModal from '@/components/modal/LoginModal';
import { useRouter } from 'next/router';
import LockIcon from '@mui/icons-material/Lock';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import CircularProgressModal from '@/components/modal/CircularProgressModal';
import SucessSlide from '@/components/transitions/SucessSlide';
import { getUserIdByEmail } from '@/apiRequests/users/getUserIdByEmail';
import { sendOTp } from '@/apiRequests/users/sendOtp';
import { otpResetUserPassword } from '@/apiRequests/users/otpResetUserPassword';

export default function forgotPassword() {  
  
  const divRef = useRef(null);
  const router = useRouter();
  const query = router.query; 

  const [otpError, setOtpError] = useState(false);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showServerError, setShowServerError] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  
  const [userId, setUserId] = useState(0);
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);

  const [btnName, setBtnName] = useState('Send Code');
  const [emailExist, setEmailExist] = useState(true);

  useEffect(() => {
    
    if (query.email === undefined) {
      console.log(query.email)
      router.replace('/')
      return;
    }
    setEmail(query.email);

    const func = async () => {
      const data = await getUserIdByEmail(query.email);

      if (data[0] === 200) {                
        setUserId(data[1])
      }
      else if(data[0] !== 500) {      
        setEmailExist(false)
      }
    }
    func();

  }, [query.email])

  const handleInput = (e, idx) => {

    setOtpError(false)

    if (e.target.value.length > 1) {
      e.target.value = e.target.value.slice(0, 1);
    }

    if (e.target.value.length === 1 && idx < 4) {
      const nextInput = document.getElementById(`otp-input-${idx + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    if (pastedData.length === 5) {
      pastedData.split('').forEach((char, idx) => {
        const input = document.getElementById(`otp-input-${idx}`);
        if (input) {
          input.value = char;
        }
      });
      setOtp(pastedData);
    }
  };

  const handleResetClick = async (e) => {    

    if (!emailExist) { return }

    if (e.currentTarget.name === 'Send Code') {      
            
      setShowProgressBar(true);
      const sendOtpData = await sendOTp({recipient: email, userId: userId});                        
      console.log('-- SENDING OTP --');
      console.log(sendOtpData);

      if(sendOtpData[0] === 200) {
        
        setShowProgressBar(false);

        setTimeout(async () => {    
          setShowSuccessAlert(true)          
        }, 600);              
        setBtnName('Reset')
      }
      else {

        setShowProgressBar(false);
        setShowSuccessAlert(false);
        setShowErrorAlert(true);

        setTimeout(async () => {  
          setShowErrorAlert(false)          
        }, 15000); 
      }            
    }
    else {
      
      setOtpError(false)

      if (newPassword.trim() !== confirmPassword.trim() 
        || (newPassword.trim().length === 0 && confirmPassword.trim().length === 0)) {

        setPasswordMismatchError(true);
        return;
      }      
      setShowProgressBar(true);

      const resetData = await otpResetUserPassword({
        userId: userId,
        otp: otp,
        newPassword: newPassword.trim()
      });      
      console.log('-- RESETTING PASSWORD --');
      console.log(resetData);
      

      if (resetData[0] === 200) {

          setShowProgressBar(true);

          setTimeout(async () => {  
            router.replace({
              pathname: '/',
              query: { openSignIn: true },
            });
            setShowProgressBar(false)          
          }, 700);         
      }
      else if (resetData[0] !== 500) {

        setShowProgressBar(false);
        setShowSuccessAlert(false);

        setOtpError(true)
      }
      else {

        setShowProgressBar(false);
        setShowSuccessAlert(false);
        setShowServerError(true);

        setTimeout(async () => {  
          setShowServerError(false)          
        }, 15000); 
      }
    }        
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === 'Backspace' && idx > 0 && !e.target.value) {
      const prevInput = document.getElementById(`otp-input-${idx - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  return (         
      <div ref={divRef} style={{ backgroundColor: "rgb(234, 234, 238)" }}>
        <CircularProgressModal modalOpen={showProgressBar} />        
        <SucessSlide toggleShow={showSuccessAlert} title={'Email Sent'} disableLink={true} message={`to: ${email}`}/>
        <SucessSlide toggleShow={showErrorAlert} title={'Send Email Error'} disableLink={true} message={`to: ${email}`} severity='error'/>
        <SucessSlide toggleShow={showServerError} title={'Error'} disableLink={true} message='view console for details' severity='error'/>
        <Head>      
          <title>Service Charge</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/appLogoWhite.png" />        
        </Head>          
        <div className="content-wrapper">        
        <section>                 
          <div className='d-flex align-items-end' style={{height: '85vh', minWidth: '460px' }}>                            
            <div
              className="d-flex justify-content-center align-items-center h-100 w-100"
              style={{
                backgroundImage: "url(/backgroundIndex.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "bottom",
              }}
            > 
              <Box 
                sx={{
                  backgroundColor: 'background.paper', 
                  borderRadius: 2, 
                  height: '82vh',                  
                  overflowY: 'auto',
                  '&::-webkit-scrollbar': { // Add this block for WebKit-based browsers
                    display: 'none',
                  },                  
                }}   
                className='d-flex flex-column p-5 m-5 m-xl-0'
              >
                <LockIcon className='m-auto mt-2 mb-4' sx={{fontSize: '8em'}} />
                <h1 className='text-center mb-3'>Reset your password</h1>
                <p className={`mx-auto my-4 user-select-none ${!emailExist ? 'text-danger' : ''}`}>
                  {!emailExist ? <><span className="text-decoration-underline">{email}</span> doesn't exist</>  : <span className="text-decoration-underline">{email}</span>}                  
                </p>
                {otpError ? <p className='ms-2 text-danger'>Invalid OTP code</p> : <p className='ms-2'>OTP code</p>}
                <Box
                    component="form"
                    autoComplete="off"
                    display="flex"
                    justifyContent="space-evenly"
                    alignItems="center"                    
                  >
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <TextField
                        key={idx}
                        id={`otp-input-${idx}`}
                        
                        variant="outlined"
                        inputProps={{
                          maxLength: 1,
                          style: { textAlign: 'center' },
                        }}
                        sx={{
                          width: '56px',                    
                        }}
                        onChange={(e) => {
                          handleInput(e, idx);
                          const newOtp = otp.slice(0, idx) + e.target.value + otp.slice(idx + 1);
                          setOtp(newOtp);
                        }}
                        onKeyDown={(e) => handleKeyDown(e, idx)}
                        onPaste={handlePaste}
                        error={otpError}
                      />
                    ))}
                </Box>
                <div className='d-flex flex-column mt-3'>
                    <TextField
                      name="newPassword"
                      fullWidth
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        setPasswordMismatchError(false);                        
                      }}
                      label="New Password"
                      type="password"
                      margin="normal"
                      variant="outlined"
                      inputProps={{
                        autoComplete: "new-password",
                      }}
                      error={passwordMismatchError}
                      helperText={newPassword && confirmPassword ? (passwordMismatchError ? 'Passwords do not match' : '') : ''}
                    />
                    <TextField
                      name="confirmPassword"
                      fullWidth
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setPasswordMismatchError(false);
                      }}
                      label="Confirm Password"
                      type="password"
                      margin="normal"
                      variant="outlined"
                      inputProps={{
                        autoComplete: "new-password",
                      }}
                      error={passwordMismatchError}
                      helperText={newPassword && confirmPassword ? (passwordMismatchError ? 'Passwords do not match' : '') : ''}
                    />
                    <a className='me-2 mb-3 text-decoration-none d-block align-self-end' href='/'>
                      Login Instead?
                    </a>
                    <button name={btnName} className='btn btn-dark p-2 mt-4' onClick={handleResetClick}>
                      {btnName}
                      {btnName === 'Send Code' && <SendIcon className='ms-2' sx={{fontSize: '1.2em'}}/>}
                    </button>
                </div>
              </Box>    
            </div>              
          </div> 
        </section>                      
      <footer>         
        <div className='d-flex flex-column' style={{backgroundColor: "rgb(234, 234, 238)", minWidth: '460px'}}>
          <div className='d-flex flex-column flex-xl-row' style={{backgroundColor: "rgb(234, 234, 238)"}}>                
            <div className="d-flex col-xl-4 flex-column mt-5" style={{ backgroundColor: "rgb(234, 234, 238)" }}>          
              <h1 className='d-flex mx-auto'>Alliance</h1>
              <div className='d-flex mt-4 ms-5'>
                <img className='img-fluid' src='/allianceLogo.png' style={{height: '60px', width: '70px'}}/>  
                <p className='mx-3'>
                  Alliance Software, Inc. is a global IT services and solutions company. Alliance was established in 
                  2000 and has since grown to become one of the Philippines' largest and most respected independent 
                  software development outsourcing company.                        
                </p>
              </div>            
            </div>   
            <div className="d-flex col-xl-4 flex-column mt-5" style={{ backgroundColor: "rgb(234, 234, 238)" }}>
              <h1 className='mx-auto'>About</h1>
              <h5 className='mx-auto my-3'>Made by:</h5>
              <a className='mx-auto mt-1' href="https://www.facebook.com/jl.vincent.92" target="_blank">Lj Vincent Tudtud</a>
              <a className='mx-auto mt-1' href="https://www.facebook.com/joergeryan.lou" target="_blank">Joerge Ryan Lou</a>
              <a className='mx-auto mt-1' href="https://www.facebook.com/cathgadiane" target="_blank">Cathleen Rose Gadiane</a>
            </div>  
            <div className="d-flex col-xl-4 flex-column mt-5" style={{ backgroundColor: "rgb(234, 234, 238)" }}>
              <h1 className='mx-auto'>Contact</h1>
              <img className='img-fluid mx-auto mt-3 mb-2' src='/appLogoBlack.png' style={{height: '60px', width: '70px'}}/>  
              <a className='mx-auto mt-3' href="#">alliance.servicecharge.gmail.com</a>            
            </div>  
          </div>  
          <hr/>                
          <a className='mx-auto text-decoration-none mt-3 mb-4 text-black'>© Team Seven</a>  
          <LoginModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </div>          
      </footer> 
      </div>                 
      </div>          
  )
}
