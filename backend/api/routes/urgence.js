const Router = require('express');
const controlleur = require('../controllers/urgence');
const router = Router();

router.get('/', controlleur.getAllUrgence);
router.get('/value/:idUrgence', controlleur.getUrgenceById);

router.post('/ajouter', controlleur.insertUrgence);
router.post('/modifier', controlleur.updateUrgence);

router.delete('/supprimer/:idUrgence', controlleur.deleteUrgence);

module.exports = router;