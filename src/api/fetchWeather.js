import axios from 'axios';

const URL = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = '174e4168f3695b76d86e3b7808709a36'

export const fetchWeather = async(query) => {
    const { data } = await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: API_KEY,
        }
    });

    return data;
}

