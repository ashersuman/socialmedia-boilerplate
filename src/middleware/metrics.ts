import { Express } from 'express';
import promBundle from 'express-prom-bundle';
import { Counter, Histogram } from 'prom-client';

/**
 * Metrics report can be found at
 * http://your-server-hostname:port/metrics
 */

// Initialize the Prometheus metrics bundle
const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  promClient: {
    collectDefaultMetrics: {},
  },
});

// Metrics to track response time for user api
// Usage : apiUsersResponseTime.labels(req.method).observe(responseTimeInSeconds);
const apiUsersResponseTime = new Histogram({
  name: 'api_users_response_time',
  help: 'Response time for /api/users',
  labelNames: ['method'],
  buckets: [0.1, 0.5, 1, 2, 5], // Define custom response time buckets (in seconds)
});

// Metrics to track successful user creation
// Usage : userCreationCounter.inc()
const userCreationCounter = new Counter({
  name: 'user_creation_total',
  help: 'Total number of successful user creations',
}); 


export function configureMetrics(app: Express) {
  // Use the Prometheus middleware
  // In future if we decide to use any other middleware
  // we can replace it here.
  app.use(metricsMiddleware);
}