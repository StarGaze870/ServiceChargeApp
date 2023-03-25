import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/ForgotPassword.module.css";

function ForgotPassword() {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
      });
    
      // handle form submission
      const handleSubmit = (event) => {
        event.preventDefault();
    
        // add code to submit the form data to the backend API
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
            <h1 className={styles.Spacing} >ForgotPassword</h1>
  
            <div className={styles.Spacing} >
              <input className={styles.inputs} placeholder="Enter your Email" type="email" id="email" name="email" value={credentials.email} onChange={handleChange} required />
            </div>
  
            <form onSubmit={handleSubmit}>
              <button className={`${styles.Spacing} ${styles.RoundButton} ${styles.Sendcode}`} id="sendcode" >Send Code</button>
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

} export default ForgotPassword;
