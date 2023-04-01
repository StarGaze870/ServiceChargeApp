import React, { useState } from "react";
import styles from "@/styles/Login.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from 'axios';

function Login() {
  const [data, setData] = useState([]);
  const [stringFromSpringBoot, setStringFromSpringBoot] = useState("");

  useEffect(() => {
    axios.get('http://localhost:8080/api/user')
  .then(response => setStringFromSpringBoot(response.data))
  .catch(error => console.error(error));
  }, []);

  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  // handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
  // Get the values of the form fields
  const email = event.target.email.value;
  const password = event.target.password.value;

  const user = {
    email: email,
    password: password,
  };
// Send a POST request to the backend API to register the user
axios.post('http://localhost:8080/api/login', user)
.then(response => {
  console.log(response.data);   
  alert(response.data);
  if(response.data === "Login Successful! : Logging In"){
    //router.push("/Login");
  }
})
.catch(error => {
  console.log(error);
  alert('Error Bad Gate Way : http://localhost:8080/api/login');
});

  };
  const router = useRouter();
  function handleForgotPassword() {
    // your function logic here
    router.push("/ForgotPassword");
  };
  
  function handleSignUp() {
    // your function logic here
    router.push("/SignUp");
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

          <form onSubmit={handleSubmit}>
            <div className={styles.Spacing} >
              {/* <label htmlFor="email">Email:</label> */}
              <input className={styles.inputs} placeholder="Enter your Email" type="email" id="email" name="email" value={credentials.email} onChange={handleChange} required />
            </div>

            <div className={styles.Spacing}>
              {/* <label htmlFor="password">Password:</label> */}
              <input className={styles.inputs} placeholder="Enter your Password" type="password" id="password" name="password" value={credentials.password} onChange={handleChange} required />
            </div>
            <div className={styles.Spacing}>
              <a href="#" onClick={handleForgotPassword} className={`${styles.Spacing} ${styles.ForgotPassword}`}>Forgot Password?</a>
            </div>

            <button className={`${styles.Spacing} ${styles.RoundButton} ${styles.SignIn}`} id="signin" >Sign In</button>
          </form>

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
            <button onClick={handleSignUp} className={`${styles.Spacing} ${styles.RoundButton} ${styles.SignUp}`} id="signup" data-type="signup">Sign Up</button>
          </div>

          {/* <div className={styles.Spacing}>
          {stringFromSpringBoot ? (
        <p>Data from backend: {stringFromSpringBoot}</p>
      ) : (
        <p>Loading data...</p>
      )}
          <p>{stringFromSpringBoot}</p>
            {data.map(item => (
              <div key={item.id}>{item.name}</div>
            ))}
          </div> */}


        </div>
      </div>

    </div>

  );

} export default Login;
