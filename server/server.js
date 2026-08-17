import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import aiRouter from './routes/aiRoutes.js';


const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Rute Publik (Bebas Akses)
app.get('/', (req, res) => res.send('Server is Live!'));

// Rute Terkunci (Hanya untuk user yang sudah login)
app.get('/api/user-data', requireAuth(), (req, res) => {
  res.json({ message: 'this is secret data!' });
});

app.use('/api/ai', requireAuth(), aiRouter)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});