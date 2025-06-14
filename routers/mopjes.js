import express from 'express';
import { getAllMopjes, getMopjeByCategorie } from '../controllers/mopjes.js';

const mopjesRouter = express.Router();

mopjesRouter.route('/')
    .get(getAllMopjes);

mopjesRouter.route('/:categorie')
    .get(getMopjeByCategorie);

export { mopjesRouter };
