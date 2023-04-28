// https://api.openweathermap.org/data/2.5/weather?q=rewari&appid=5c902e81c5328d072e27dc38280d5b8b
import React, { useEffect, useState } from 'react'
import './Style.css'
import Weathercard from './Weathercard'
const Temp = () => {
  const [searchValue, setSearchValue] = useState("Rewari")
  const [tempInfo, setTempInfo] = useState({})
  const getWeatherInfo = async () => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=5c902e81c5328d072e27dc38280d5b8b`

      let response = await fetch(url);
      let data = await response.json();

      const { temp, humidity, pressure } = data.main;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      // new object
      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country,
        sunset,
      };

      setTempInfo(myNewWeatherInfo);
    }
    catch (error) {
      console.log("error")
    }
  }
  useEffect(() => {
    getWeatherInfo();
  },1000);
  return (
    <>
      <div className='wrap'>
        <div className='search'>
          <input type='text' id='search' className='searchTerm' placeholder='search..'
            value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />

          <button type='button' className='searchButton'
            onClick={getWeatherInfo}>Search</button>
        </div>
      </div>
      {/* our temp card */}
      <Weathercard {...tempInfo} />
    </>
  )
}

export default Temp;
