import React, { useState } from "react";

import cloud from "../images/Clouds.png";
import rain from "../images/Rain.png";
import clear from "../images/Clear.png";
import mist from "../images/mist.png";
import err from "../images/error.png";

function MyApp() {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [search, setSearch] = useState("");

  const API_KEY = "0433ed7eb53249fbc7516b61d7a217d8";
  const API =
    "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";

  async function myFun() {
    const get = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}&units=metric`
    );

    const jsonData = await get.json();
    console.log(jsonData);
    setData(jsonData);
    if (search == "") {
      setError("please enter a name");
    } else if (jsonData.cod == "404") {
      setError("enter a valid name");
    } else {
      setError("");
    }
  }
  function handleinput(evt) {
    setSearch(evt.target.value);
    console.log(evt.target.value);
  }
  return (
    <div className="container">
      <div className="inputs">
        <input
          type="text"
          onChange={handleinput}
          placeholder="Enter Location"
        />
        <button onClick={myFun}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      {error ? (
        <div className="errorPage">
          <p>{error}</p>
          <img src={err} />
        </div>
      ) : (
        ""
      )}

      {data && data.weather ? (
        <div className="weathers">
          <h2 className="cityName">{data.name}</h2>
        
          {data.weather[0].main === "Clouds" && <img src={cloud} alt="cloud" />}
          {data.weather[0].main === "Rain" && <img src={rain} alt="rain" />}
          {data.weather[0].main === "Clear" && <img src={clear} alt="clear" />}
          {data.weather[0].main === "Mist" && <img src={mist} alt="mist" />}
          {data.weather[0].main === "Haze" && <img src={cloud} alt="haze" />}

          <h2 className='temprature'>{Math.trunc(data.main.temp)}°C</h2>
          <p className="climate">{data.weather[0].description}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default MyApp;
