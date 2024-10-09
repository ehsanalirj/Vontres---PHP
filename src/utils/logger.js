import winston from 'winston';

// Configure Winston logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

export const errorHandler = (err, req, res, next) => {
  logger.error(`${err.name}: ${err.message}`, { 
    method: req.method,
    url: req.url,
    body: req.body,
    stack: err.stack
  });

  res.status(500).json({ 
    error: 'An unexpected error occurred',
    requestId: req.id // Assuming you're using a middleware to generate request IDs
  });
};

export const logRequest = (req, res, next) => {
  logger.info(`Incoming request`, {
    method: req.method,
    url: req.url,
    body: req.body,
    headers: req.headers,
  });
  next();
};

export { logger };