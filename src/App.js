
import UilReact from '@iconscout/react-unicons/icons/uil-react'
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chart from './components/Chart';




function App() {

const [query, setQuery] = useState({q: 'berlin'});
const [units, setUnits] = useState('metric');
const [weather, setWeather] = useState(null)



useEffect(()=>{
  const fetchWeather = async () =>{
    const message = query.q ? query.q : 'current location'

    toast.info('Fetching weather for ' + message);
    (await getFormattedWeatherData({...query,units}).then(
      (data) =>{
        toast.success(`Successfully fetched weather for ${data.name}, ${data.country}.`)
        setWeather(data);
      }
    ));
     
   };
   
   fetchWeather();
},[query,units]);

const formatBackground = () =>{
  if(!weather) return 'from-cyan-700 to-blue-700'
  const threshold = units === 'metric' ? 20 : 60
  if(weather.temp <= threshold) return 'from-cyan-700 to-blue-700'

  return 'from-yellow-700 to-orange-700'
}

  return (
    <div className={` bg-gradient-to-br from-cyan-700 to-blue-700
    h-fit ${formatBackground()}`}>
      <div className='mx-auto max-w-2xl py-2 lg:py-4 px-2 lg:px-4'>
      <TopButtons setQuery={setQuery}/>
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>

      {weather && (
        <div>
      <TimeAndLocation weather={weather}/>
      <TemperatureAndDetails weather={weather}/>
    
     <Chart title='daily forecast' items={weather.daily}/>
      <Forecast title='daily forecast' items={weather.daily}/>
        </div>
      )}
      <ToastContainer autoClose={5000} theme='colored' newestOnTop={true}/>
      </div>
     </div>

  );
}

export default App;
