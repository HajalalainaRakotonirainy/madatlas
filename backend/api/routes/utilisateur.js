const Router = require('express');
const controlleur = require('../controllers/utilisateur');
const router = Router();

router.get('/', controlleur.getAllUtilisateur);
router.get('/value/:idUtilisateur', controlleur.getUtilisateurById);

router.post('/ajouter', controlleur.insertUtilisateur);
router.post('/modifier', controlleur.updateUtilisateur);

router.delete('/supprimer/:idUtilisateur', controlleur.deleteUtilisateur);

module.exports = router;