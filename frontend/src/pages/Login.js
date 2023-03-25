import React, { useState } from "react";
import styles from "@/styles/Login.module.css";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  // handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // add code to submit the form data to the backend API
  };
  const [text, setText] = useState("For got Password?");
  function handleForgotPassword() {
    // your function logic here
      setText("new text");
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
          <div className={styles.left}>
            <h1 className={styles.Spacing} >Sign In</h1>
            

              <div className={styles.Spacing} >
                {/* <label htmlFor="email">Email:</label> */}
                <input className={styles.inputs}  placeholder="Enter your Email" type="email" id="email" name="email" value={credentials.email} onChange={handleChange} required />
              </div>

              <div className={styles.Spacing}>
                {/* <label htmlFor="password">Password:</label> */}
                <input className={styles.inputs} placeholder="Enter your Password" type="password" id="password" name="password" value={credentials.password} onChange={handleChange} required />
              </div>

                 <a href="#" onClick={handleForgotPassword} className={`${styles.Spacing} ${styles.ForgotPassword}`}>For got Password?</a> 
             

              <form onSubmit={handleSubmit}>
              <button  className={`${styles.Spacing} ${styles.RoundButton} ${styles.SignIn}`} id="signin" >Sign In</button>
              </form>
            
            {/* <p className={styles.Spacing}>Enter your personal details and start your journey with us</p> */}
          
          </div>

          <div className={styles.right}>
            <div>
            <h1 className={styles.Spacing}>Welcome to</h1>
            </div>

            <div>
            <h1 className={styles.Spacing}><strong>Service Charge App</strong></h1>
            </div>
            
            <div>
            <p className={styles.Spacing}>Enter your personal details and start your journey with us</p>
            </div>
           
            <div>
            <button className={`${styles.Spacing} ${styles.RoundButton} ${styles.SignUp}`} id="signup" data-type="signup">Sign Up</button>            </div>
            
          </div>
      </div>
      
    </div>
    
  );

}  export default Login;