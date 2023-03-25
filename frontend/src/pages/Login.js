import React, { useState } from "react";
import styles from "@/styles/Login.module.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from 'axios';

function Login() {
  const [data, setData] = useState([]);
  const [stringFromSpringBoot, setStringFromSpringBoot] = useState("");
  // useEffect(() => {
  //   axios.get('http://localhost:8080/api/user')
  //     .then(response => {
  //       setData(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data: ', error);
  //     });
  // }, []);

  useEffect(() => {
    fetch("http://localhost:8080/api/user") // Replace with the actual endpoint URL
      .then((response) => response.text())
      .then((data) => setStringFromSpringBoot(data))
      .catch((error) => console.error(error));
  }, []);

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
  function handleForgotPassword() {
    // your function logic here
    router.push("/ForgotPassword");


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
            <button className={`${styles.Spacing} ${styles.RoundButton} ${styles.SignUp}`} id="signup" data-type="signup">Sign Up</button>
          </div>

          <div className={styles.Spacing}>
          <p>{stringFromSpringBoot}</p>
            {/* {data.map(item => (
              <div key={item.id}>{item.name}</div>
            ))} */}
          </div>


        </div>
      </div>

    </div>

  );

} export default Login;
