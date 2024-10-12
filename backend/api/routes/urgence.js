const Router = require('express');
const controlleur = require('../controllers/urgence');
const router = Router();

router.get('/:urgenceName', controlleur.getAllUrgence);
router.get('/:urgenceName/:idUrgence', controlleur.getUrgenceById);

router.post('/ajouter', controlleur.insertUrgence);
router.post('/modifier', controlleur.updateUrgence);
router.post('/proche', controlleur.getNearestUrgence);

router.delete('/:urgenceName/:idUrgence', controlleur.deleteUrgence);

module.exports = router;