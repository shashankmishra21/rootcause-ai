import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => {
  res.json({
    success: true,
    service: 'rootcause-ai-backend',
    timestamp: new Date().toISOString(),
  });
});

app.get('/', (_req, res) => {
  res.json({ message: 'RootCause AI Backend Running 🚀' });
});

app.use(errorHandler);

app.use('*', (_req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`RootCause AI Backend → http://localhost:${PORT}`);
});

export default app;