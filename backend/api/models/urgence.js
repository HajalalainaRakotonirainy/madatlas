const getAllUrgence = "SELECT * FROM urgence";

const getUrgenceById = "SELECT * FROM urgence WHERE id = $1"

const insertUrgence = "INSERT INTO urgence (geom, latitude, longitude, nom, type, description, contact) VALUES (ST_GeomFromText($1, 4326), $2, $3, $4, $5, $6, $7) RETURNING id";

const updateUrgence = "UPDATE urgence SET geom = ST_GeomFromText($1, 4326), latitude = $2, longitude = $3, nom = $4, type = $5, description = $6, contact = $7 WHERE id = $8";

const deleteUrgence = "DELETE FROM urgence WHERE id = $1";

module.exports = {
  getAllUrgence,
  getUrgenceById,
  insertUrgence,
  updateUrgence,
  deleteUrgence,
};

