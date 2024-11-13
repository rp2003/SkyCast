# SkyCast - Weather App 🌤️
SkyCast is a real-time weather application built with React and Vite.js that fetches and displays live weather data for any city. The application dynamically updates the background and icons based on the current weather conditions and provides users with key weather metrics such as temperature, humidity, and wind speed.


# Tech Stack 🛠️
**React:** JavaScript library for building the user interface.

**Vite.js:** Fast development server and build tool for modern web projects.

**Axios:** Handles HTTP requests to fetch real-time weather data from an API.

**DayJS:** Lightweight library to format and manipulate date and time.

**@tabler/icons-react:** Icon library for intuitive and visually appealing icons.


# How It Works 🌐
**Core Functionality**

**Fetching Weather Data:** SkyCast uses axios to send requests to the OpenWeatherMap API. When a user enters a location, the app fetches weather data such as temperature, weather description, humidity, and wind speed.

**Dynamic UI Updates:**
The app displays different weather icons (e.g., sunny, cloudy) based on the main field of the weather response.
Background colors are dynamically set using a gradient that corresponds to the current weather condition (e.g., a sunny gradient for clear weather).


# Installation and Setup 🚀
**Prerequisites**

Ensure you have Node.js installed on your machine.


**Installation**

Clone the repository: **git clone https://github.com/rp2003/skycast-weatherapp.git**

Navigate to the project directory: **cd skycast-weatherapp**

Install dependencies: **npm install**

Add Environment Variables: SkyCast requires an API key for weather data. In the root directory, create a .env file: **VITE_WEATHER_API_KEY=your_api_key_here**. Replace your_api_key_here with your actual API key from OpenWeatherMap.

Running the App Locally

To start the development server, run: **npm run dev**

The app will be accessible at http://localhost:5173.
