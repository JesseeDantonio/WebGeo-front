import express from 'express';
import path from 'path';

const APP = express();
const PORT = 3000;

const dirname = path.resolve();
const publicPath = path.join(dirname, 'public');
const leafletPath = path.join(dirname, 'node_modules', 'leaflet', 'dist');
const distPath = path.join(dirname, 'dist');

// Servez les fichiers statiques depuis le répertoire node_modules
APP.use(express.static(publicPath));
APP.use('/leaflet', express.static(leafletPath));
APP.use('/dist', express.static(distPath));

APP.get('/', async (req, res) => {
    res.sendFile(publicPath + '/page/index.html');
});

APP.on('close', async (req) => {
    console.log("Le serveur s'est arrêté");
});

APP.listen(PORT, () => {
    console.log(`Le serveur est en cours d'exécution sur le port ${PORT}`);
});