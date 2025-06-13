import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { mopjesRouter } from './routers/mopjes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

//Debugging logs zichtbaar in Render
app.use((req, res, next) => {
    const tijdstip = new Date().toISOString();
    console.log(`[${tijdstip}] ${req.method} ${req.originalUrl}`);
    next();
});

// HTTP logging via morgan
app.use(morgan('dev'));

// Routes
app.use('/api/mopjes', mopjesRouter);

// Basisroute
app.get('/', (req, res) => {
    console.log('Root endpoint bezocht');
    res.status(200).json({
        status: 'success',
        message: 'Joke API draait',
        data: {
            endpoint: '/api/mopjes'
        }
    });
});

// 404-handler
app.use((req, res) => {
    console.warn(`Onbekend endpoint: ${req.originalUrl}`);
    res.status(404).json({
        status: 'fail',
        message: `Endpoint ${req.originalUrl} bestaat niet`,
        code: 404
    });
});

// Foutafhandeling
app.use((err, req, res, next) => {
    console.error('Interne fout:', err);
    res.status(500).json({
        status: 'error',
        message: 'Interne serverfout',
        code: 500
    });
});

export { app };
