const pool = require("../database");

//fonction qui envoye des reponse a partir d'un requête
function requeteAvecReponse(sql, res, data) {
  pool.query(sql, data, function (error, result) {
    if (error) throw error;
    res.status(200).json(result.rows);
    res.end();
  });
}

//fonction qui n'envoye aucun reponse a partir d'un requête
function requeteSansReponse(sql, res, data) {
  pool.query(sql, data, function (error) {
    if (error) throw error;
    res.end();
  });
}

//fonction requête avec validation
function requeteAvecValidation(res, validation, toValidate, sql, avecReponse) {
  const { value, error } = validation.validate(toValidate);
  const data = Object.values(value);

  if(!error){
    if (avecReponse) {
      requeteAvecReponse(sql, res, data);
    } else {
      requeteSansReponse(sql, res, data);
    }
  } else{
    console.error("[error] ", error.message);
    res.status(400);
    res.end();
  };
}

module.exports = {
  requeteAvecReponse,
  requeteSansReponse,
  requeteAvecValidation,
};
