import axios from "axios";
import React from "react";
import "./Profile.css";

function Profile() {
  // Get username from localstorage
  const user = JSON.parse(localStorage.getItem("user"));

  // Weather Data & Location
  const [weather, setWeather] = React.useState([]);

  // Find Location
  function findLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function (position) {
        const res = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather?lat=" +
            position.coords.latitude +
            "&lon=" +
            position.coords.longitude +
            "&appid=d0a10211ea3d36b0a6423a104782130e"
        );
        return setWeather(res.data) + console.log(res);
      });
    } else {
      console.log("Geolocation does not work on this browser");
    }
  }

  React.useEffect(() => {
    findLocation();
  }, []);
  
  return (
    <div>
      <h1> Good day {user.username}</h1>

      <div className="grid-profile">
        <div className="item-profile">
          <h2> Weather </h2>
          {weather.main ? (
            <>
              <div className="grid-small-profile">
                <img
                  src={`https://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                  alt="weather status icon"
                  className="weather-icon"
                />
                <p className="weather-text">
                  {(weather.main.temp / 100).toFixed(1)} <br /> Degrees
                </p>
                <p className="weather-text grid-row-2 mb-10">
                  {" "}
                  {weather.name}{" "}
                </p>{" "}
              </div>
            </>
          ) : (
            <>
              <h2>Please Share your location for the widget.</h2>
            </>
          )}
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
  );
}

export default Profile;
