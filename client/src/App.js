import './App.css';
import Axios from "axios";
import React from 'react';


function App() {

  const [listOfUsers, setListofUsers] = React.useState([]);

  const [usernameReg, setUsernameReg] = React.useState([]);
  const [passwordReg, setPasswordReg] = React.useState([]);
  const [emailReg, setEmailReg] = React.useState([]);


  const register = (e) => {
    e.preventDefault();
    Axios.get("http://localhost:3001/Users").then((res) => submit(res.data))

  }

  const submit = (getdata) => {
    if(getdata.some(e => e.email === emailReg)){
      alert("Email already exists")
    }else if(getdata.some(e => e.username === usernameReg))
      alert("Username already exist")
    
    else{
      Axios.post("http://localhost:3001/register", {
        username: usernameReg,
        password: passwordReg,
        email: emailReg
      }).then((response)=>{
        console.log(response)
      })
    }
  }

  const login = () => {
    Axios.post("http://localhost:3001/Users", {
      username: usernameReg,
      password: passwordReg,
    }).then((response)=>{
      console.log(response)
    })
  }

  React.useEffect(() => {
    Axios.get("http://localhost:3001/users").then((response) => {
      setListofUsers(response.data);
    })
  }, [] )


  return (
    <div className="App">
      <div className="Register">
      <h1> Register </h1>
        <label>Username</label>
        <input type="text" onChange={(e)=> {setUsernameReg(e.target.value)}} />
        <label>Password</label>
        <input type="text" onChange={(e)=> {setPasswordReg(e.target.value)}} />
        <label>E-mail</label>
        <input type="text" onChange={(e)=> {setEmailReg(e.target.value)}} />
        <button onClick={register}> Register </button>

      </div>
    </div>
  );
}

export default App;
