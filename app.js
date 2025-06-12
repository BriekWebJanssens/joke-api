import express from 'express';
import cors from 'cors';
import { mopjesRouter } from './routers/mopjes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/mopjes', mopjesRouter);

// Basisroute
app.get('/', (req, res) => {
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

// Render vereist een dynamische poortbinding
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Joke API draait op poort ${PORT}`);
});
