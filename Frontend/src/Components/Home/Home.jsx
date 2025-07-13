import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar/Navbar";
import "./Home.css";

const Home = () => {
  const [cards, setCards] = useState([]);
  const [products, setProducts] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("");
  const [manualCity, setManualCity] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=591b4eed75895618d32ad1023ab68611&units=metric`
          );
          setWeatherData(response.data);
          setLocation(response.data.name);

          const temp = response.data.main.temp;
          let type = "";
          if (temp >= 35) type = "hot";
          else if (temp >= 20) type = "pleasant";
          else type = "cold";

          // const tipsRes = await axios.get(
          //   `http://localhost:2000/api/weather/${type}`
          // );
           

          const tipsRes = await axios.get(
  `https://routineinfy-3.onrender.com/api/weather/${type}`
);

          setCards(tipsRes.data);
          fetchFoodByType(type);
        } catch (err) {
          console.error(err);
        }
      },
      (error) => {
        console.error("Error fetching geolocation:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }, []);

  const fetchFoodByType = async (type) => {
    try {
      // const res = await axios.get(
      //   `http://localhost:2000/api/food/food/${type}`
      // );
 const res = await axios.get(
  `https://routineinfy-3.onrender.com/api/food/food/${type}`
);


      
      setFoodData(res.data);
    } catch (err) {
      console.error("Error fetching food data:", err);
    }
  };

  const handleManualCity = async () => {
    try {
      const geoRes = await axios.get(
        `https://us1.locationiq.com/v1/search.php?key=pk.1f293e376eeeff69e0681c0d74145167&q=${manualCity}&format=json&limit=10`
      );

      if (geoRes.data.length === 0) {
        alert("City not found. Please try again with a known city name.");
        return;
      }

      setCityOptions(geoRes.data);
    } catch (err) {
      console.error("Invalid city:", err);
    }
  };

  const handleCitySelect = async (city) => {
    try {
      const { lat, lon, name, state, country } = city;

      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=591b4eed75895618d32ad1023ab68611&units=metric`
      );
      setWeatherData(weatherRes.data);
      setLocation(`${name}, ${state || ""}, ${country}`);
      setCityOptions([]);

      const temp = weatherRes.data.main.temp;
      let type = "";
      if (temp >= 35) type = "hot";
      else if (temp >= 20) type = "pleasant";
      else type = "cold";
      fetchFoodByType(type);

      // const tipsRes = await axios.get(
      //   `http://localhost:2000/api/weather/${type}`
      // );

      const tipsRes = await axios.get(
  `https://routineinfy-3.onrender.com/api/weather/${type}`
);

      setCards(tipsRes.data);
    } catch (err) {
      console.error("Error getting weather:", err);
    }
  };

  return (
    <div id="Home" className="home">
      <Navbar />
      <div className="loc">{location && <p>Location:{manualCity}</p>}</div>
      <div className="manual-input">
        <input
          type="text"
          placeholder="Enter your city"
          value={manualCity}
          onChange={(e) => setManualCity(e.target.value)}
        />
        <button onClick={handleManualCity}>Check Weather</button>
      </div>

      {cityOptions.length > 0 && (
        <div className="city-dropdown">
          <label htmlFor="citySelect">Select your location:</label>
          <select
            id="citySelect"
            onChange={(e) => {
              const selectedIndex = e.target.value;
              handleCitySelect(cityOptions[selectedIndex]);
            }}
          >
            <option value="">-- Select a city --</option>
            {cityOptions.map((city, index) => (
              <option key={index} value={index}>
                {city.display_name || city.name || "Unknown location"}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="weather">
        {weatherData ? (
          <>
            <div className="weath-info">
              <p className="fs-5">Current Temp: {weatherData.main.temp}°C</p>
            </div>

            <div className="weather-tips">
              {cards.length > 0 ? (
                cards.map((tip, index) => (
                  <div
                    className="card m-3"
                    style={{ width: "18rem" }}
                    key={index}
                  >
                    <div className="card-body text-center">
                      <i className={`fs-1 fa-solid ${tip.icon}`}></i>
                      <h5 className="card-title mt-3">{tip.title}</h5>
                      <p className="card-text">{tip.content}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No tips available</p>
              )}
            </div>
          </>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>

      <div className="food-section mt-4">
        <h4>Let the weather decide your healthy plate!</h4>
        <div className="row">
          {foodData.length > 0 ? (
            foodData.map((food, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <div className="card h-100">
                  <img
                    src={food.image}
                    className="card-img-top"
                    alt={food.name}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{food.name}</h5>
                    <p>
                      <strong>Benefits:</strong> {food.benefits}
                    </p>
                    <p>
                      <strong>Recipe:</strong> {food.recipe}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No food suggestions available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
