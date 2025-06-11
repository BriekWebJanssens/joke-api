import express from 'express';
import cors from 'cors';
import { mopjesRouter } from './routers/mopjes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/mopjes', mopjesRouter);

app.get('/', (req, res) => {
    res.send('Joke API draait op /api/mopjes');
});

app.listen(3000, () => {
    console.log('Joke API live op http://localhost:3000');
});
