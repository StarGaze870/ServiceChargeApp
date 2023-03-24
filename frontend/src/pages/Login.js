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
      <div className={styles.left}>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={credentials.email} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={credentials.password} onChange={handleChange} required />
          </div>
          <button type="submit">Sign In</button>
        </form>
        <a href="#">Forgot Password?</a>
        <p>Enter your personal details and start your journey with us</p>
      </div>
      <div className={styles.right}>
        <h1>Welcome to <strong>Service Charge App</strong></h1>
        <p>Enter your personal details and start your journey with us</p>
        <button>Sign Up</button>
      </div>
    </div>
  );

}  export default Login;