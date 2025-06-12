import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, '../data/mopjes.json');

//GET /api/mopjes
export function getAllMopjes(req, res) {
    try {
        const data = JSON.parse(fs.readFileSync(filePath));

        res.status(200).json({
            status: 'success',
            data
        });
    } catch (err) {
        console.error('Fout bij lezen van mopjes.json:', err);
        res.status(500).json({
            status: 'error',
            message: 'Kon mopjes niet laden',
            code: 500
        });
    }
}

//GET /api/mopjes/:categorie
export function getMopjeByCategorie(req, res) {
    try {
        const data = JSON.parse(fs.readFileSync(filePath));
        const categorie = decodeURIComponent(req.params.categorie).toLowerCase();

        const gevonden = data.find(mop =>
            mop.category.toLowerCase() === categorie
        ) || data.find(mop =>
            mop.category.toLowerCase() === 'default'
        );

        if (!gevonden) {
            return res.status(404).json({
                status: 'fail',
                message: `Geen mopje gevonden voor categorie "${categorie}"`,
                code: 404
            });
        }

        res.status(200).json({
            status: 'success',
            data: { joke: gevonden.joke }
        });
    } catch (err) {
        console.error('Fout bij ophalen van mopje:', err);
        res.status(500).json({
            status: 'error',
            message: 'Kon mopje niet ophalen',
            code: 500
        });
    }
}
