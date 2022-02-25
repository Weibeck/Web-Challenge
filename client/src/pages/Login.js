import Axios from "axios";
import React from "react";
import "./Login.css"
import { useNavigate } from "react-router-dom";

function Login() {
  // const [listOfUsers, setListofUsers] = React.useState([]);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user, setUser] = React.useState();
  const [loggedinStatus, setLoggedinStatus] = React.useState([]);

  React.useEffect(() => {
    const UserLoggedIn = localStorage.getItem("user");
    if( UserLoggedIn ){
      const UserFound = UserLoggedIn;
      setUser(UserFound)
    }
  }, []);

  const logOut = () => {
    setUser({});
    setUsername("");
    setPassword("");
    localStorage.clear();
    window.location.reload(false)
  }

  let navigate = useNavigate();


  // Login checks
  const login = () => {
    Axios.post("http://localhost:3001/Users", {
      username: username,
      password: password,
    }).then((res) => {
      if(res.data.message === null){
        setUser(res.data);
        localStorage.setItem('user', res.data);
        navigate("/profile")
      }else{
        setLoggedinStatus(res.data.message)
      }

    });
  };

  /* React.useEffect(() => {
    Axios.get("http://localhost:3001/users").then((response) => {
      setListofUsers(response.data);
    });
  }, []);*/

  if(user){
    console.log(user)
    return <div>
      <h1>{user.username}Already logged in!</h1>
      <button onClick={() => {navigate("/profile");}}> Return to your Profile</button>
      <button onClick={logOut}> Log Out</button>
      </div>;
  }else {
    return (
      <div>
        <div className="Login">
          <h1> Hackathon </h1>
          <label>Username</label>
          <input
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <label>Password</label>
          <input
            type="text"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={login}> Login </button>
        </div>
  
        <h1>{loggedinStatus}</h1>
  
        <h1>New to hackathon? <button onClick={() => {navigate("/signup");}}>Sign Up</button></h1>
      </div>
    );
  }
}

export default Login;
