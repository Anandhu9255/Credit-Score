import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/auth.routes';
import financialRoutes from './routes/financial.routes';
import scoreRoutes from './routes/score.routes';
import loanRoutes from './routes/loan.routes';
import { errorHandler } from './middleware/error.middleware';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// -----------------------------------------
// ⭐ SWAGGER CONFIGURATION WITH JWT SUPPORT
// -----------------------------------------
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Credit Score + UPI API',
      version: '1.0.0',
      description: 'API documentation for Credit Score + UPI backend',
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production'
          ? 'https://credit-score-xnvu.onrender.com'
          : 'http://localhost:5000',
        description: process.env.NODE_ENV === 'production'
          ? 'Production Server'
          : 'Local Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], // Path to your route files
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// -----------------------------------------

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/financial', financialRoutes);
app.use('/api/score', scoreRoutes);
app.use('/api/loan', loanRoutes);

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Credit Score & UPI Backend is running!' });
});

// Error handling middleware
app.use(errorHandler);

export default app;
