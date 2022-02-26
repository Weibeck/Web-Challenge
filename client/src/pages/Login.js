import Axios from "axios";
import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [user, setUser] = React.useState();
  const [loggedinStatus, setLoggedinStatus] = React.useState([]);

  React.useEffect(() => {
    const UserLoggedIn = localStorage.getItem("user");
    if (UserLoggedIn) {
      const UserFound = UserLoggedIn;
      setUser(UserFound);
      console.log(UserLoggedIn);
      console.log(UserFound);
    }
  }, []);

  const logOut = () => {
    setUser({});
    setUsername("");
    setPassword("");
    localStorage.clear();
    window.location.reload(false);
  };

  let navigate = useNavigate();

  // Login checks
  const login = () => {
    Axios.post("http://localhost:3001/Users", {
      username: username,
      password: password,
    }).then((res) => {
      if (res.data.message === null) {
        setUser(res.data);
        localStorage.setItem("user", res.data);
        navigate("/profile");
      } else {
        setLoggedinStatus(res.data.message);
      }
    });
  };

  if (user) {
    console.log(user);
    return (
      <div>
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
          <button className="btn-default" onClick={logOut}>
            {" "}
            Log Out
          </button>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="Login">
          <h1 className="top-pos"> Hackathon </h1>
          <div>
            <input
              className="child-container left"
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <input
              className="child-container right"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button className="login-btn" onClick={login}>
              {" "}
            </button>
          </div>
        </div>

        <h1>{loggedinStatus}</h1>

        <h1 className="bot-pos">
          New to hackathon?{" "}
          <span
            className="text-yellow"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign up
          </span>
        </h1>
      </div>
    );
  }
}

export default Login;
