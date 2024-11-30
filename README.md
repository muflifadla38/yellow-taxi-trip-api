# Yellow Taxi Trip API

A RESTful API service that provides NYC Yellow Taxi trip data analysis and visualization endpoints.

## Features

- Trip data filtering with multiple parameters
- Monthly demand trends analysis
- Monthly income trends

## Tech Stack

- Node.js
- Express.js
- Axios
- NYC Open Data API

## API Endpoints

### Get Trips
    GET /api/trips

#### Query Parameters
- `pickupDatetime`: Filter by pickup date and time (format: YYYY-MM-DD HH:MM:SS)
- `dropoffDatetime`: Filter by dropoff date and time (format: YYYY-MM-DD HH:MM:SS)
- `minFareAmount`: Filter by min fare amount
- `maxFareAmount`: Filter by max fare amount
- `minDistance`: Filter by min trip distance
- `maxDistance`: Filter by max trip distance
- `trip_distance`: Filter by trip distance
- `payment_type`: Filter by pickup type
- `limit`: Limit the number of results

### Get Monthly Demand Trend
Returns monthly trip counts throughout the year.

    GET /api/trips/demand-trend

### Get Monthly Income Trend
Returns monthly income amount throughout the year.

    GET /api/trips/income-trend


## Setup

1. Clone the repository
    ```bash
    git clone https://github.com/muflifadla38/yellow-taxi-trip-api.git

2. Install dependencies
    ```bash
    cd yellow-taxi-trip-api
    npm install

3. Set up environment variables
    ```bash
    cp .env.example .env

4. Start the server
    ```bash
    npm run start
