
import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/ForgotPassword.module.css";
import axios from 'axios';

function ResetPAssword() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        confirmPassword: '',
      });
console.log(credentials); 

      const handleSubmit = (event) => {
        event.preventDefault();
          // Get the values of the form fields
        router.push("/Login");
      };

    const router = useRouter();
    
      function handleSignIn(event) {
        // your function logic here
        event.preventDefault();
          router.push("/Login");
        
      };
      // handle form input changes
      const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials(prevCredentials => ({
          ...prevCredentials,
          [name]: value
        }));
      };
    return (
        <div className={styles.container}>
        <div className={styles.centerContainer}>
          <div className={styles.right}>
            <h1 className={styles.Spacing} >Create an Account</h1>
            <form onSubmit={handleSubmit}>
                
            <div className={styles.Spacing} >
              <input className={styles.inputs} placeholder="Enter your Email" type="email" id="email" name="email" value={credentials.email} onChange={handleChange} required />
            </div>

            <div className={styles.Spacing} >
              <input className={styles.inputs} placeholder="Enter the Otp" type="text" id="otp" name="otp"  onChange={handleChange} required />
            </div>

            <div className={styles.Spacing}>
              {/* <label htmlFor="password">Password:</label> */}
              <input className={styles.inputs} placeholder="Enter your New Password" type="password" id="password" name="password" value={credentials.password} onChange={handleChange} required />
            </div>
            <div className={styles.Spacing}>
              {/* <label htmlFor="password">Password:</label> */}
              <input className={styles.inputs} placeholder="Confirm New Password" type="password" id="confirmpassword" name="confirmpassword"  onChange={handleChange} required />
            </div>
            
              <button className={`${styles.Spacing} ${styles.RoundButton} ${styles.Sendcode}`} id="sendcode" >Submit</button>
            </form>
          </div>
  
          <div className={styles.left}>
            <div>
              <h1 className={styles.Spacing}>Welcome to</h1>
            </div>
  
            <div>
              <h1 className={styles.Spacing}><strong>Service Charge App</strong></h1>
            </div>
  
            <div>
              <p className={styles.Spacing}>SignIn and Start managing your Mangoes</p>
            </div>
            <form onSubmit={handleSignIn} >
            <div>
              <button className={`${styles.Spacing} ${styles.RoundButton} ${styles.SignIn}`} id="signin" data-type="signin">Sign In</button></div>
  
            </form>
           
          </div>

        </div>
  
      </div>
    );

} export default ResetPAssword;
