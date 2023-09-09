import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose'; // Import Mongoose
import { graphqlHTTP } from 'express-graphql';
import { schema, root } from './graphql/schema';
import { configureMetrics } from './middleware/metrics';
import { configureLogging } from './middleware/logging';
import { healthCheckRoute } from './routes/healthCheck';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'));

// Configure metrics (e.g., Prometheus)
configureMetrics(app);

// Configure logging (e.g., Winston)
configureLogging(app);

// Connect to MongoDB
mongoose.connect('<your-mongodb-uri>');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({ schema, rootValue: root, graphiql: true }));

// Health Check endpoint
app.use('/health', healthCheckRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
