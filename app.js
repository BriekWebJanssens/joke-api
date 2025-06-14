import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import { mopjesRouter } from './routers/mopjes.js';

const app = express();

//Middleware voor beveiliging
app.use(helmet());

//Middleware voor CORS
app.use(cors());

// Middleware om JSON-requests correct te verwerken
app.use(express.json());

//Debug logging (timestamp + url)
app.use((req, res, next) => {
    const tijdstip = new Date().toISOString();
    console.log(`[${tijdstip}] ${req.method} ${req.originalUrl}`);
    next();
});

//HTTP-logging via morgan ('combined' bevat datum en statuscode)
app.use(morgan('combined'));

//Routes
app.use('/api/mopjes', mopjesRouter);

//Root endpoint met correcte info
app.get('/', (req, res) => {
    console.log('Root endpoint bezocht');
    res.status(200).json({
        status: 'success',
        message: 'Joke API draait',
        data: {
            endpoints: [
                '/api/mopjes',
                '/api/mopjes/:categorie'
            ]
        }
    });
});

//404-handler
app.use((req, res) => {
    console.warn(`Onbekend endpoint: ${req.originalUrl}`);
    res.status(404).json({
        status: 'fail',
        message: `Endpoint ${req.originalUrl} bestaat niet`,
        code: 404
    });
});

//Foutafhandeling
app.use((err, req, res, next) => {
    console.error('Interne fout:', err);
    res.status(500).json({
        status: 'error',
        message: 'Interne serverfout',
        code: 500
    });
});

export { app };
