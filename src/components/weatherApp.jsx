/*  TO RUN THIS PROJECT 
    use command npm run dev
*/ 

import { useEffect, useState } from 'react';
import axios from "axios";
import cloudy from '../assets/images/cloudy.png';  // we are in components folder so move out of folder using ..
import loading from '../assets/images/loading.gif';
import rainy from '../assets/images/rainy.png';
import snowy from '../assets/images/snowy.png';
import sunny from '../assets/images/sunny.png';
import { API_KEY } from "../apiKey";
import './weatherApp.css';
import { IconMapPinFilled, IconSearch, IconDropletHalf2Filled, IconWind} from '@tabler/icons-react';
import dayjs from "dayjs";



/*{
    "data": {
        "coord": {
            "lon": -79.4163,
            "lat": 43.7001
        },
        "weather": [
            {
                "id": 801,
                "main": "Clouds",
                "description": "few clouds",
                "icon": "02d"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 293.54,
            "feels_like": 293.57,
            "temp_min": 292.64,
            "temp_max": 294.79,
            "pressure": 1016,
            "humidity": 74,
            "sea_level": 1016,
            "grnd_level": 1000
        },
        "visibility": 10000,
        "wind": {
            "speed": 5.14,
            "deg": 60
        },
        "clouds": {
            "all": 20
        },
        "dt": 1727735099,
        "sys": {
            "type": 2,
            "id": 2095531,
            "country": "CA",
            "sunrise": 1727694869,
            "sunset": 1727737220
        },
        "timezone": -14400,
        "id": 6167865,
        "name": "Toronto",
        "cod": 200
    },
    "status": 200,
    "statusText": "OK",
    "headers": {
        "content-length": "511",
        "content-type": "application/json; charset=utf-8"
    },
    "config": {
        "transitional": {
            "silentJSONParsing": true,
            "forcedJSONParsing": true,
            "clarifyTimeoutError": false
        },
        "adapter": [
            "xhr",
            "http",
            "fetch"
        ],
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "env": {},
        "headers": {
            "Accept": "application/json, text/plain, "
        },
        "params": {
            "q": "Toronto",
            "appid": "f51919364cc4b800a410b2a333dc220a"
        },
        "method": "get",
        "url": "https://api.openweathermap.org/data/2.5/weather?}"
    },
    "request": {}
}*/



const API_URL = `https://api.openweathermap.org/data/2.5/weather?}`;

const weatherImages = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rainy,
    Snow: snowy,
    Haze: cloudy,
    Mist: cloudy
}

const backgroundImages = {
    Clear: "linear-gradient(to right,#f3b07c, #fcd283)",
    Clouds: "linear-gradient(to right, #57d6d4, #f71eec)",
    Rain: "linear-gradient(to right, #5bc8fb, #80eaff)",
    Snow: "linear-gradient(to right, #aff2ff, #fff)",
    Haze: "linear-gradient(to right, #57d6d4, #71eeec)",
    Mist: "linear-gradient(to right, #57d6d4, #71eeec)",

};

const WeatherApp = function () {                   // we made function
    const [city, setCity] = useState("toronto");
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {                                                   //syntax of useEffect(()=>{}, []) -->first is function, empty array
        fetchResult();
    }, []);

    const fetchResult = async () => {
        setIsLoading(true)
        const response = await axios.get(API_URL, { params: { q: city, appid: API_KEY, units: "Metric" } });
        console.log("Response", response);
        if(response?.data){
            setData(response.data)
        }
        else{
            setData({notFound: "Not Found"});
        }
        setIsLoading(false);
    };

    const handleInputChange = (e) => {
        let value = e.target.value;
        if (value.trim() !== 0)        // check if the entry is not a space
        {
            setCity(value);
        }
    }

    const handleEnterPress=(e)=>{
        if(e.key==='Enter')
            fetchResult();
    }

    const handleSearchIconClick=()=>{
        fetchResult();
    }

    const weatherName= data.weather?.[0]?.main

    const backgroundImage = data.weather ? backgroundImages[weatherName] : backgroundImages['Clear']

    const date=dayjs().format("DD MMM YY");
    return (
        <div className='container' style={{ backgroundImage }}>
            <div className='weather-app' 
            style={{
                backgroundImage: backgroundImage.replace ? backgroundImage.replace('to right', 'to top') : null
            }}>
                

                {/*--------------SEARCH BAR---------------*/ }
                <div className='search'>
                    <div className='search-top'>
                        <IconMapPinFilled color='#333'/>
                        {city && <p>{city}</p>}
                    </div>
                    <div className='search-bar'>
                        <input 
                            type="text" 
                            onChange= {handleInputChange} 
                            onKeyDown={handleEnterPress}
                            placeholder='Enter Location'
                        />
                        <IconSearch color='#333' onClick={handleSearchIconClick}/>
                    </div>
                </div>
                   
                {isLoading? (
                     <img className='loader' src={loading} alt='loader'/>
                ): data.notFound ? (
                    <p>Not Found</p>
                ) : (
                <>
                    
                    <div className='weather'>
                        <img src={weatherImages[weatherName??"Clear"]} />
                        <div className='weather-type'>
                            {weatherName && <p>{weatherName}</p>}
                        </div>
                        <div className='weather-temp'>
                            {data?.main&& <p>{Math.floor(data.main.temp)}°</p>}
                        </div>
                    </div>

                    <div className='weather-date'>
                       <p>{date}</p>
                    </div>
                    <div className='weather-data'>
                        <div className='humidity'>
                            <h4>Humidity</h4>
                            <IconDropletHalf2Filled color='#333'/>
                            {data?.main?.humidity && <p>{data.main.humidity} %</p>}
                        </div>
                        <div className='wind'>
                            <h4>Wind</h4>
                            <IconWind/>
                            {data?.wind && <p>{data.wind.speed} km/h</p>}
                        </div>
                    </div>
                </>
                )}
            </div>
        </div>
    )
}

export default WeatherApp;          // exported the function and imported it later in App.jsx file