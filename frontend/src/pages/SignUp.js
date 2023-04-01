
import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/ForgotPassword.module.css";
import axios from 'axios';
function SignUp() {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        confirmPassword: '',
      });
console.log(credentials); 

      const handleSubmit = (event) => {
        event.preventDefault();
          // Get the values of the form fields
  const firstName = event.target.FName.value;
  const lastName = event.target.LName.value;
  const email = event.target.email.value;
  const password = event.target.password.value;
  const confirmPassword = event.target.confirmpassword.value;
    
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
          }

 // Create a new user object
 const currentDate = new Date();
 const user = {
    email: email,
    firstname: firstName,
    lastname: lastName,
    password: password,
  };
  // Send a POST request to the backend API to register the user
  axios.post('http://localhost:8080/api/register', user)
    .then(response => {
      console.log(response.data);   
      alert(response.data);
      if(response.data === "User registered successfully"){
        router.push("/Login");
      }
    })
    .catch(error => {
      console.log(error);
      alert('Error Bad Gate Way : http://localhost:8080/api/register');
    });

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
              <input className={styles.inputs} placeholder="Enter your First Name" type="text" id="FName" name="FName"  onChange={handleChange} required />
            </div>
            <div className={styles.Spacing} >
              <input className={styles.inputs} placeholder="Enter your Last Name" type="text" id="LName" name="LName"  onChange={handleChange} required />
            </div>
            <div className={styles.Spacing} >
              <input className={styles.inputs} placeholder="Enter your Email" type="email" id="email" name="email" value={credentials.email} onChange={handleChange} required />
            </div>

            <div className={styles.Spacing}>
              {/* <label htmlFor="password">Password:</label> */}
              <input className={styles.inputs} placeholder="Enter your Password" type="password" id="password" name="password" value={credentials.password} onChange={handleChange} required />
            </div>
            <div className={styles.Spacing}>
              {/* <label htmlFor="password">Password:</label> */}
              <input className={styles.inputs} placeholder="Confirm Password" type="password" id="confirmpassword" name="confirmpassword"  onChange={handleChange} required />
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

} export default SignUp;
