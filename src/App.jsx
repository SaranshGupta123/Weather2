import React, { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Search from './component/Search';
import Result from './component/Result';
import axios from 'axios';
import './App.css';
import About from './component/About';
import Contact from './component/Contact';
import Navbar from './component/Navbar';

const Content = () => {
  const [search, setSearch] = useState('');
  const [weather, setWeather] = useState(null);
  const [history, setHistory] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [searchDate, setSearchDate] = useState(null);
  const [error, setError] = useState(null);
  const [units, setUnits] = useState('metric'); 

  const changeSearch = (e) => {
    setSearch(e);
    setError(null);
  };

  const searchWeather = () => {
    if (search.trim() === '') {
      setError('Please enter a city name.');
      return;
    }

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=aa13436c3b8dba4deed11d1b67d5d1b0&units=${units}`)
      .then((response) => {
        if (history.indexOf(search) === -1) {
          setHistory([...history, search]);
        }
        setWeather(response.data);
        setSearchDate(new Date());
        setError(null);
        return axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=aa13436c3b8dba4deed11d1b67d5d1b0&units=${units}`);
      })
      .then((forecastResponse) => {
        setForecast(forecastResponse.data.list.slice(0, 8));
      })
      .catch((error) => {
        console.error(error);
        setWeather(null);
        setForecast([]);
        if (error.response && error.response.status === 404) {
          setError('City not found. Please enter a valid city name.');
        } else {
          setError('An error occurred. Please try again.');
        }
      });
  };

  const historySearch = (data) => {
    setSearch(data);
    if (data !== '') {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${data}&appid=aa13436c3b8dba4deed11d1b67d5d1b0&units=${units}`)
        .then((response) => {
          setWeather(response.data);
          setSearchDate(new Date());
          setError(null);
          return axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${data}&appid=aa13436c3b8dba4deed11d1b67d5d1b0&units=${units}`);
        })
        .then((forecastResponse) => {
          setForecast(forecastResponse.data.list.slice(0, 8));
        })
        .catch((error) => {
          console.error(error);
          setWeather(null);
          setForecast([]);
          if (error.response && error.response.status === 404) {
            setError('City not found. Please enter a valid city name.');
          } else {
            setError('An error occurred. Please try again.');
          }
        });
    }
  };

  const Keypress = (event) => {
    if (event.key === 'Enter') {
      searchWeather();
    }
  };

  const Units = () => {
    setUnits(units === 'metric' ? 'imperial' : 'metric');
    if (weather) {
      searchWeather();
    }
  };

  return (
    <>
      <div className="App2">
        <Search searchData={search} eventHandler={changeSearch} onKey={Keypress} />
        <button onClick={Units} className="button Units1">
          {units === 'metric' ? '°F' : '°C'}
        </button>
      </div>

      <div className="App">
        {error && <p className="error-message">{error}</p>}
        <Result weatherData={weather} historyData={history} historySearch={historySearch} forecastData={forecast} searchDate={searchDate} units={units}/>
      </div>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Navbar />
        <Content />
      </>
    ),
  },
  {
    path: '/about',
    element: (
      <>
        <Navbar />
        <About />
      </>
    ),
  },
  {
    path: '/contact',
    element: (
      <>
        <Navbar />
        <Contact />
      </>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;