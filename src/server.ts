import express from 'express';
import { tracer, dogstatsd } from './config/datadog';

const app = express();

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    dogstatsd.increment('web.request_count');
    dogstatsd.histogram('web.request_duration', duration);
  });
  next();
});

// Rest of your server setup