import axios from 'axios';
import React from 'react'
import "./Profile.css";

function Profile() {
  
  // Get username from localstorage
  const user = JSON.parse(localStorage.getItem('user'))

  // Weather Data & Location
  const [weather, setWeather] = React.useState();
  const [long, setLong] = React.useState();
  const [lat, setLat] = React.useState();


  // API for Weather
  const weatherAPI = 'http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=d0a10211ea3d36b0a6423a104782130e'

  // Find Location
  const findLocation = () => {
    const location = navigator.geolocation.getCurrentPosition();
    if(location){
      setLong(location.coords.latitude);
      setLat(location.coords.longtitude);
    }
  }

  React.useEffect(() => {
    const locationFound = findLocation;
    if(locationFound){
      axios.get(weatherAPI).then((res) => {
        setWeather(res.data)
        console.log(weather)
      })
    }
    
  }, []);

// {(weather.main.temp/100).toFixed(1)}
// weather.name
  return (
    <div>
        
        <h1> Good day {user.username}</h1>
        
        <div className="grid-profile">
          <div className="item-profile">
              <h2> Weather </h2>
              <p> </p>
              
              <p> </p>
          </div>

          <div className="item-profile">
          <h2> News </h2>
          </div>

          <div className="item-profile">
          <h2> Sport </h2>
          </div>

          <div className="item-profile">
          <h2> Photos </h2>
          </div>

          <div className="item-profile">
          <h2> Tasks </h2>
          </div>

          <div className="item-profile">
          <h2> Clothes </h2>
          </div>
        </div>
        </div>
  )
}

export default Profile