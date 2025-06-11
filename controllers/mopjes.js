import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.resolve(__dirname, '../data/mopjes.json');

export function getAllMopjes(req, res) {
    try {
        const data = JSON.parse(fs.readFileSync(filePath));
        res.json(data);
    } catch (err) {
        console.error('Fout bij lezen van mopjes.json:', err);
        res.status(500).json({ error: 'Kon mopjes niet laden' });
    }
}

export function getMopjeByCategorie(req, res) {
    try {
        const data = JSON.parse(fs.readFileSync(filePath));
        const categorie = req.params.categorie.toLowerCase();

        const gevonden = data.find(mop => mop.category.toLowerCase() === categorie)
            || data.find(mop => mop.category === 'default');

        res.json({ joke: gevonden.joke });
    } catch (err) {
        console.error('Fout bij ophalen van mopje:', err);
        res.status(500).json({ error: 'Kon mopje niet ophalen' });
    }
}
