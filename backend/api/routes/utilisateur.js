const Router = require('express');
const controlleur = require('../controllers/utilisateur');
const router = Router();

router.get('/', controlleur.getAllUtilisateur);
router.get('/:idUtilisateur', controlleur.getUtilisateurById);

router.post('/ajouter', controlleur.insertUtilisateur);
router.post('/modifier', controlleur.updateUtilisateur);
router.post('/login', controlleur.login);
router.post('/check', controlleur.checkUser);

router.delete('/:idUtilisateur', controlleur.deleteUtilisateur);

module.exports = router;