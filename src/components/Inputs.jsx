import React, { useState } from 'react';
import { UilSearch } from '@iconscout/react-unicons';
import { toast } from 'react-toastify';
import getFormattedWeatherData from '../services/weatherService';

const Inputs = ({ setQuery }) => {
  const [city, setCity] = useState('');

  const handleSearchClick = async () => {
    if (city.trim() === '') {
      toast.error('Please enter a city name.');
      return;
    }

    try {
      const weatherData = await getFormattedWeatherData({ q: city });
      if (!weatherData) {
        toast.error('City not found.');
        return;
      }
      setQuery({ q: city });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      toast.error('City not found.');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className='flex flex-row justify-center'>
      <div className='flex flex-row w-3/4 items-center justify-center space-x-4'>
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          onKeyPress={handleKeyPress}
          type='text'
          placeholder='Search for city..'
          className='text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase'
        />
        <UilSearch
          onClick={handleSearchClick}
          size={25}
          className='text-white cursor-pointer transition ease-out hover:scale-125'
        />
      </div>
    </div>
  );
};

export default Inputs;
