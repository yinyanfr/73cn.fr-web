import React, { Component } from 'react'
import config from "../config/config.json"
import ReactWeather from "react-open-weather"
import 'react-open-weather/lib/css/ReactWeather.css'

class Weather extends Component {

    render() {
        console.log(config.weather)
        return (
            <ReactWeather
                forecast="today"
                apikey={config.weather}
                type="city"
                city="chambery"
            />
        )
    }
}

export default Weather
