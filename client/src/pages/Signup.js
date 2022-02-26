import Axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const [usernameReg, setUsernameReg] = React.useState([]);
  const [passwordReg, setPasswordReg] = React.useState([]);
  const [passwordConfirm, setPasswordConfirm] = React.useState([]);
  const [emailReg, setEmailReg] = React.useState([]);
  const [user, setUser] = React.useState();

  let navigate = useNavigate();

  React.useEffect(() => {
    const UserLoggedIn = localStorage.getItem("user");
    if (UserLoggedIn) {
      const UserFound = UserLoggedIn;
      setUser(UserFound);
    }
  }, []);

  // Register handling => Ship it to submit 
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
    else if (passwordReg !== passwordConfirm) {
      alert("Password does not match");
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

  if (user) {


    return(<div>
      <h1>{user.username}Already logged in!</h1>
      <button
        className="btn-default"
        onClick={() => {
          navigate("/profile");
        }}
      >
        {" "}
        Return to your Profile
      </button>
    </div>
    );
  }else{

  

  return (
    <div>
      <h1> Register </h1>
      <div className="Register grid">
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <input
          type="email"
          placeholder="E-Mail"
          onChange={(e) => {
            setEmailReg(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Re-type Password"
          onChange={(e) => {
            setPasswordConfirm(e.target.value);
          }}
        />
        <button
          className="btn-default"
          onClick={() => {
            navigate("/");
          }}
        >
          Return to login
        </button>

        <button className="btn-register" onClick={register}>
          {" "}
        </button>
      </div>
    </div>
  );
}
}

export default Signup;
