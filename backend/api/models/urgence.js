const getAllUrgence = (tableName) => `SELECT * FROM ${tableName}`;

const getUrgenceById = (tableName) => `SELECT * FROM ${tableName} WHERE id = $1`

const insertUrgence = (tableName) => `INSERT INTO ${tableName} (geom, latitude, longitude, nom, adresse, numero, heure, service, lien) VALUES (ST_GeomFromText($1, 4326), $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`;

const updateUrgence = (tableName) => `UPDATE ${tableName} SET geom = ST_GeomFromText($1, 4326), latitude = $2, longitude = $3, nom = $4, adresse = $5, numero = $6, heure = $7, service = $8, lien = $9 WHERE id = $10 RETURNING id`;

const deleteUrgence = (tableName) => `DELETE FROM ${tableName} WHERE id = $1`;

module.exports = {
  getAllUrgence,
  getUrgenceById,
  insertUrgence,
  updateUrgence,
  deleteUrgence,
};

