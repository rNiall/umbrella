import express from 'express';
import { rateLimit } from 'express-rate-limit';
import escape from 'validator/es/lib/escape';
import Redis from 'ioredis';
import validator from 'validator';
import 'dotenv/config';

const app = express();

const redis = new Redis({
    port: process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : 6379,
    host: process.env.REDIS_HOST || '127.0.0.1',
    ...(process.env.REDIS_USER && process.env.REDIS_PASSWORD && {
        username: process.env.REDIS_USER,
        password: process.env.REDIS_PASSWORD,
    })
  });

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes
	limit: 10,
	standardHeaders: 'draft-8',
	legacyHeaders: false, 
})


app.use(limiter)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    try {
    const escapedQuery = {};

    for (let key of Object.keys(req.query)) {
        escapedQuery[key] = validator.escape(req.query[key]).toLowerCase();
    }

    req.query = escapedQuery;

    next();
} catch (e) {
    next(e);
}
})

const cacheMiddleware = async (req, res, next) => {
    try {
        console.log('Checking the cache');

        const cache = await redis.get(req.query.geoQuery);

        if (cache) {
            console.log('Cache found, returning data ...');
            res.json(JSON.parse(cache));
        } else {
            console.log(`No cahce found for the following key: ${req.query.geoQuery}. Proceed to api call...`);
            next();
        }
    } catch (e) {
        next(e);
    }
}

app.get('/', cacheMiddleware, async (req, res) => {
    try {
        const { geoQuery } = req.query;

        if (!geoQuery) {
            throw 'You should specify a valid string with address or longitude+latitude';
        }

        if (typeof geoQuery !== 'string') {
            throw 'geoQuery should be a string';
        }

        const escaped = escape(geoQuery);
    
        const fetchResponse = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${escaped}?unitGroup=metric&key=${process.env.WEATHER_TOKEN}&contentType=json`);
        const weather = await fetchResponse.json();

        await redis.set(geoQuery, JSON.stringify(weather), 'EX', 3600);

        res.json(weather);
    } catch(e) {
        throw e;
    }
});

const closingConnections = async () => {
    await redis.quit();
    process.exit(0);
}

process.on('SIGINT', async () => {
    console.log('Received SIGINT. Closing existed connections');

    await closingConnections();
  });
  
  process.on('SIGTERM', async () => {
    console.log('Received SIGTERM. Closing existed connections.');
    
    await closingConnections();
  });

app.listen(process.env.PORT || 3000, () => {
    console.log('server started');
});