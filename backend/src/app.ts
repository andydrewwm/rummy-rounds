import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import gameRoutes from './routes/game';

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable cross-origin requests

app.get('/api/health', function(req, res) {
    res.send('hello world');
});

app.use('/api/games', gameRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
