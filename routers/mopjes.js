import express from 'express';
import { getAllMopjes, getMopjeByCategorie } from '../controllers/mopjes.js';

const router = express.Router();

router.get('/', getAllMopjes);
router.get('/:categorie', getMopjeByCategorie);

export { router as mopjesRouter };
