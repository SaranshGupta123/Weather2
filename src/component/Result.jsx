import React from 'react';
import { FaLocationDot } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { WiHumidity } from "react-icons/wi";
import { GiPressureCooker } from "react-icons/gi";
import { FaWind } from "react-icons/fa";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiFog,
  WiNightClear,
  WiNightCloudy,
  WiNightRain,
  WiNightSnow,
  WiNightThunderstorm,
  WiNightFog,
} from 'react-icons/wi';

const getWeatherIcon = (code) => {
  const isNight = code.includes('n');
  const iconId = code.slice(0, 2);

  switch (iconId) {
    case '01':
      return isNight ? <WiNightClear className="weather-icon" /> : <WiDaySunny className="weather-icon" />;
    case '02':
      return isNight ? <WiNightCloudy className="weather-icon" /> : <WiCloudy className="weather-icon" />;
    case '03':
      return <WiCloudy className="weather-icon" />;
    case '4':
      return isNight ? <WiNightRain className="weather-icon" /> : <WiRain className="weather-icon" />;
    case '5':
      return isNight ? <WiNightThunderstorm className="weather-icon" /> : <WiThunderstorm className="weather-icon" />;
    case '6':
      return isNight ? <WiNightSnow className="weather-icon" /> : <WiSnow className="weather-icon" />;
    case '7':
      return isNight ? <WiNightFog className="weather-icon" /> : <WiFog className="weather-icon" />;
    default:
      return <WiCloudy className="weather-icon" />;
  }
};

const formatSearchDate = (date) => {
  if (!date) return '';
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

const Time1 = (date) => {
  let hour1 = date.getHours();
  let hour2 = "AM";
  if (hour1 >= 12) {
    hour2 = "PM";
  }
  let Time2 = hour1 + " " + hour2;
  return Time2;
}

const Result = ({ weatherData, historyData, historySearch, forecastData, searchDate, units }) => {

  const getTempSymbol = () => units === 'metric' ? '°C' : '°F';
  const getWindSymbol = () => units === 'metric' ? 'm/s' : 'mph';

  return (
    <>
      <div>
        <div>
          {weatherData ? (
            <>
              <div className='other2'>
                <div className='other3'>
                  <h2 className="City"><FaLocationDot className='city-icon' />{weatherData.name}</h2>
                  {searchDate && <p className='present-date'><SlCalender /> Search Date: {formatSearchDate(searchDate)}</p>}
                </div>
                <div className='other4'>
                  <div className='temperature1' id='temperature1'>Max Temp: {Math.round(weatherData.main.temp_max)} {getTempSymbol()}</div>
                  <div className='temperature1'>Min Temp: {Math.round(weatherData.main.temp_min)} {getTempSymbol()}</div>
                  <div className='icons'>
                    {getWeatherIcon(weatherData.weather[0].icon)}
                  </div>
                  <div className="Search-city">{weatherData.weather[0].main}</div>
                </div>
              </div>

              <div className="Temperature">
                <div className='Humidity'><WiHumidity className='weather-extra' />Humidity: {weatherData.main.humidity}%</div>
                <div className='Pressure'><GiPressureCooker className='weather-extra' />Pressure: {weatherData.main.pressure} hPa</div>
                <div className='Wind'><FaWind className='weather-extra' />Wind Speed: {weatherData.wind.speed} {getWindSymbol()}</div>
              </div>
              <div className='forecast1'>
                <h3>Hourly Forecast:</h3>
                <div className="forecast">
                  {forecastData.map((item, index) => (
                    <div key={index} className="forecast-item">
                      <p>{Time1(new Date(item.dt * 1000))}</p>
                      {getWeatherIcon(item.weather[0].icon)}
                      <p>{Math.round(item.main.temp)} {getTempSymbol()}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <h3 className="Search-city">Please enter the city name</h3>
            </>
          )}
        </div>
        <div>
          <span className="History">History</span>
          <ul className="item">
            {historyData.map((item, index) => {
              return (
                <li onClick={() => historySearch(item)} key={index}>
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Result;