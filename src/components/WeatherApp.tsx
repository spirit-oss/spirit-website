import React, { useState, useEffect } from 'react';
import { StatusBar } from './StatusBar';
import { ArrowLeft, MapPin, Wind, Droplets, Eye, Thermometer, Sun, Cloud, CloudRain, CloudSnow } from 'lucide-react';

interface WeatherAppProps {
  onBack: () => void;
  gpsEnabled?: boolean;
}

export const WeatherApp: React.FC<WeatherAppProps> = ({ onBack, gpsEnabled = true }) => {
  const [currentWeather, setCurrentWeather] = useState({
    location: 'San Francisco, CA',
    temperature: 22,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    feelsLike: 24,
    uvIndex: 6
  });

  // Update weather data based on GPS status
  const displayWeather = {
    location: gpsEnabled ? currentWeather.location : 'Unknown Location',
    temperature: gpsEnabled ? currentWeather.temperature : null,
    condition: gpsEnabled ? currentWeather.condition : 'No Data',
    humidity: gpsEnabled ? currentWeather.humidity : null,
    windSpeed: gpsEnabled ? currentWeather.windSpeed : null,
    visibility: gpsEnabled ? currentWeather.visibility : null,
    feelsLike: gpsEnabled ? currentWeather.feelsLike : null,
    uvIndex: gpsEnabled ? currentWeather.uvIndex : null
  };

  const [forecast, setForecast] = useState([
    { day: 'Today', high: 24, low: 18, condition: 'Partly Cloudy', icon: Cloud },
    { day: 'Tomorrow', high: 26, low: 19, condition: 'Sunny', icon: Sun },
    { day: 'Wednesday', high: 23, low: 17, condition: 'Rainy', icon: CloudRain },
    { day: 'Thursday', high: 21, low: 15, condition: 'Cloudy', icon: Cloud },
    { day: 'Friday', high: 25, low: 18, condition: 'Sunny', icon: Sun },
  ]);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return Sun;
      case 'partly cloudy':
      case 'cloudy':
        return Cloud;
      case 'rainy':
        return CloudRain;
      case 'snowy':
        return CloudSnow;
      default:
        return Sun;
    }
  };

  const WeatherIcon = getWeatherIcon(currentWeather.condition);

  return (
    <div className="h-full bg-gradient-surface text-white flex flex-col">
      <StatusBar />
      
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-medium">Weather</h1>
        <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-smooth hover:bg-white/20">
          <MapPin className="w-5 h-5" />
        </button>
      </div>

      {/* Current Weather */}
      <div className="px-6 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <MapPin className="w-5 h-5 text-accent mr-2" />
            <span className="text-white/80">{displayWeather.location}</span>
          </div>
          
          <div className="mb-6">
            {gpsEnabled ? (
              <>
                <WeatherIcon className="w-24 h-24 text-accent mx-auto mb-4" />
                <div className="text-6xl font-light text-white mb-2">
                  {currentWeather.temperature}°
                </div>
                <div className="text-xl text-white/70">{currentWeather.condition}</div>
                <div className="text-white/50 mt-2">
                  Feels like {currentWeather.feelsLike}°
                </div>
              </>
            ) : (
              <>
                <div className="w-24 h-24 rounded-full bg-gray-500/20 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-12 h-12 text-gray-500" />
                </div>
                <div className="text-4xl font-light text-white/50 mb-2">--°</div>
                <div className="text-xl text-white/50">No weather information</div>
                <div className="text-white/40 mt-2">
                  Location services required
                </div>
              </>
            )}
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center mb-2">
              <Wind className="w-5 h-5 text-accent mr-2" />
              <span className="text-white/70 text-sm">Wind</span>
            </div>
            <div className="text-2xl font-medium text-white">{gpsEnabled ? currentWeather.windSpeed : '--'}</div>
            <div className="text-white/50 text-xs">km/h</div>
          </div>

          <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center mb-2">
              <Droplets className="w-5 h-5 text-accent mr-2" />
              <span className="text-white/70 text-sm">Humidity</span>
            </div>
            <div className="text-2xl font-medium text-white">{gpsEnabled ? currentWeather.humidity : '--'}</div>
            <div className="text-white/50 text-xs">%</div>
          </div>

          <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center mb-2">
              <Eye className="w-5 h-5 text-accent mr-2" />
              <span className="text-white/70 text-sm">Visibility</span>
            </div>
            <div className="text-2xl font-medium text-white">{gpsEnabled ? currentWeather.visibility : '--'}</div>
            <div className="text-white/50 text-xs">km</div>
          </div>

          <div className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center mb-2">
              <Sun className="w-5 h-5 text-accent mr-2" />
              <span className="text-white/70 text-sm">UV Index</span>
            </div>
            <div className="text-2xl font-medium text-white">{gpsEnabled ? currentWeather.uvIndex : '--'}</div>
            <div className="text-white/50 text-xs">{gpsEnabled ? 'High' : 'N/A'}</div>
          </div>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="flex-1 px-6 pb-8">
        <h3 className="text-lg font-medium text-white/90 mb-4">5-Day Forecast</h3>
        {gpsEnabled ? (
          <div className="space-y-3">
            {forecast.map((day, index) => {
              const DayIcon = day.icon;
              return (
                <div key={index} className="bg-black/20 rounded-2xl p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <DayIcon className="w-8 h-8 text-accent mr-4" />
                      <div>
                        <div className="text-white/90 font-medium">{day.day}</div>
                        <div className="text-white/60 text-sm">{day.condition}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white/90">
                        <span className="font-medium">{day.high}°</span>
                        <span className="text-white/60 ml-2">{day.low}°</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-black/20 rounded-2xl p-6 backdrop-blur-sm text-center">
            <div className="w-16 h-16 rounded-full bg-gray-500/20 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-gray-500" />
            </div>
            <p className="text-white/60">No forecast available</p>
            <p className="text-white/40 text-sm mt-2">Enable GPS to view weather forecast</p>
          </div>
        )}
      </div>
    </div>
  );
};