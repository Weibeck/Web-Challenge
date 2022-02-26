import React from "react";

const Weather = () => {

    async function getLocationWeather(location) {

        const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`);
      
        return result.json();
      
      }

      await getLocationWeather("London");
    return(
<div></div>
    )
}

export default Weather;