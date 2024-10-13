const getAllUtilisateur = "SELECT * FROM utilisateur";

const getUtilisateurById = "SELECT * FROM utilisateur WHERE id = $1"

const insertUtilisateur = "INSERT INTO utilisateur (nom, prenom, email, password) VALUES ($1, $2, $3, MD5($4))";

const updateUtilisateur = "UPDATE utilisateur SET nom = $1, prenom = $2, email = $3, password = MD5($4) WHERE id = $5";

const deleteUtilisateur = "DELETE FROM utilisateur WHERE id = $1";

const login = "select * from utilisateur where email = $1 and password = MD5($2)"

const checkUser = "select * from utilisateur where id = $1 and password = MD5($2)"

module.exports = {
  getAllUtilisateur,
  getUtilisateurById,
  insertUtilisateur,
  updateUtilisateur,
  deleteUtilisateur,
  login,
  checkUser,
};