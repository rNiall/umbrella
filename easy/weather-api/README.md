# Weather Data Fetcher

Weather Data Fetcher is a small Node.js application written in TypeScript that retrieves weather data from the Visual Crossing Weather API. The application uses Redis (via ioredis) for caching API responses to improve performance and reduce the number of API calls.

## Features

- Fetches weather data from the Visual Crossing Weather API.
- Caches API responses in Redis to minimize API requests.
- Simple and easy-to-understand code structure.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed on your machine (version 14 or later recommended).
- Redis server up and running.
- An account with [Visual Crossing Weather](https://www.visualcrossing.com/weather) to obtain a free API token.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rNiall/umbrella
   cd umbrella/easy/weather-api
   ```
2. Intsall dependancies:

    ```bash
    npm install
    ```
3. Run the code with tsx
    ```bash 
    tsx ./src/index.ts
    ```

## Usage

GET /?geoQuery=London
GET /?geoQuery=41.355423,-72.102760
GET /?geoQuery=London, Buckingham palace
