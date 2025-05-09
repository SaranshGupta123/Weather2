import React, { useState, useEffect } from 'react';
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
  const [suggestions, setSuggestions] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false); 

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode);
  }, [isDarkMode]);

  const changeSearch = (e) => {
    setSearch(e);
    setError(null);
    fetchSuggestions(e);
  };

  const fetchSuggestions = (input) => {
    const allCities = ['Delhi', 'Kota', 'Kanpur', 'Mumbai', 'Bikaner']; 
    const filteredCities = allCities.filter(city => city.toLowerCase().includes(input.toLowerCase()));
    setSuggestions(filteredCities);
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
    setSuggestions([]); 
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

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <div className={`App2 ${isDarkMode ? 'dark-mode' : ''}`}>
        <Search searchData={search} eventHandler={changeSearch} onKey={Keypress} />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => historySearch(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        <button onClick={Units} className="button Units1">
          {units === 'metric' ? '°F' : '°C'}
        </button>
        <button onClick={toggleDarkMode} className="button toggle-dark-mode">
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
        {error && <p className="error-message">{error}</p>}
        <Result weatherData={weather} historyData={history} historySearch={historySearch} forecastData={forecast} searchDate={searchDate} units={units} />
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