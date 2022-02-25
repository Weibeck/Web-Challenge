import Axios from "axios";
import React from 'react';
import { useNavigate } from "react-router-dom";

function Signup() {
    const [usernameReg, setUsernameReg] = React.useState([]);
    const [passwordReg, setPasswordReg] = React.useState([]);
    const [passwordConfirm, setPasswordConfirm] = React.useState([]);
    const [emailReg, setEmailReg] = React.useState([]);
    const [user, setUser] = React.useState();

    let navigate = useNavigate()
  
    React.useEffect(() => {
      const UserLoggedIn = localStorage.getItem("user");
      if(UserLoggedIn){
        const UserFound = UserLoggedIn;
        setUser(UserFound)
      }
    }, []);

    // Register handling => Ship it to submit / bad to use GET
    const register = (e) => {
      e.preventDefault();
      Axios.get("http://localhost:3001/Users").then((res) => submit(res.data));
    };
  
    // Check if user/email exist => Register if user does not exist with email/username
    const submit = (getdata) => {
      if (getdata.some((e) => e.email === emailReg)) {
        alert("Email already exists");
      } else if (getdata.some((e) => e.username === usernameReg))
        alert("Username already exist");
      else if(passwordReg !== passwordConfirm){
        alert("Password does not match")
      } else {
        Axios.post("http://localhost:3001/register", {
          username: usernameReg,
          password: passwordReg,
          email: emailReg,
        }).then(() => {
          navigate("/");
        });
      }
    };

if(user){
  navigate("/")
}

  return (
    <div>
        
        <div className="Register">
        <h1> Register </h1>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="text"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <label>Confirm Password</label>
        <input
          type="text"
          placeholder="Re-type Password"
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
          }}
        />
        <label>E-mail</label>
        <input
          type="text"
          onChange={(e) => {
            setEmailReg(e.target.value);
          }}
        />
        <button onClick={register}> Register </button>
      </div>
      <button onClick={() => {
        navigate("/")
      }}>Return to login</button>

    </div>
  )
}

export default Signup