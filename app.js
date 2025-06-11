import express from 'express';
import cors from 'cors';
import { mopjesRouter } from './routers/mopjes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/mopjes', mopjesRouter);

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Joke API draait',
        data: {
            endpoint: '/api/mopjes'
        }
    });
});

app.use((req, res) => {
    res.status(404).json({
        status: 'fail',
        message: `Endpoint ${req.originalUrl} bestaat niet`,
        code: 404
    });
});

app.use((err, req, res, next) => {
    console.error('Interne fout:', err);
    res.status(500).json({
        status: 'error',
        message: 'Interne serverfout',
        code: 500
    });
});

export { app };
