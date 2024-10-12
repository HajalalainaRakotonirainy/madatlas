const fonction = require("./fonction");
const query = require("../models/urgence");
const Joi = require("joi");

const getAllUrgence = (req, res) => {
  // fonction.requeteAvecReponse(query.getAllUrgence, res);
  const validation = Joi.object({
    urgenceName : Joi.string().valid("csb", "dispensaire", "gendarmerie", "hopital", "jirama", "pharmacie", "police").required(),
  });

  fonction.requeteAvecValidation(res, validation, req.params, query.getAllUrgence(req.params.urgenceName), true);
};

const getUrgenceById = (req, res) => {
  const validation = Joi.object({
    idUrgence : Joi.number().integer().required(),
    urgenceName : Joi.string().valid("csb", "dispensaire", "gendarmerie", "hopital", "jirama", "pharmacie", "police").required(),
  });

  fonction.requeteAvecValidation(res, validation, req.params, query.getUrgenceById(req.params.urgenceName), true, [req.params.idUrgence]);
};

const insertUrgence = (req, res) => {
  const validation = Joi.object({
    latitude : Joi.number().precision(6).required(),
    longitude : Joi.number().precision(6).required(),
    nom : Joi.string().required(),
    adresse : Joi.string().required(),
    numero : Joi.string().required(),
    heure: Joi.string().required(),
    service : Joi.string().required(),
    lien : Joi.string().required(),
    urgenceName : Joi.string().valid("csb", "dispensaire", "gendarmerie", "hopital", "jirama", "pharmacie", "police").required(),
  });

  const {latitude, longitude, nom, adresse, numero, heure, service, lien, urgenceName} = req.body;
  const geom = "POINT ("+longitude+" "+latitude+")";

  fonction.requeteAvecValidation(res, validation, req.body, query.insertUrgence(urgenceName), true, [geom, latitude, longitude, nom, adresse, numero, heure, service, lien]);
};

const updateUrgence = (req, res) => {
  const validation = Joi.object({
    idUrgence : Joi.number().integer().required(),
    latitude : Joi.number().precision(6).required(),
    longitude : Joi.number().precision(6).required(),
    nom : Joi.string().required(),
    adresse : Joi.string().required(),
    numero : Joi.string().required(),
    heure: Joi.string().required(),
    service : Joi.string().required(),
    lien : Joi.string().required(),
    urgenceName : Joi.string().valid("csb", "dispensaire", "gendarmerie", "hopital", "jirama", "pharmacie", "police").required(),
  });

  const {latitude, longitude, nom, adresse, numero, heure, service, lien, urgenceName, idUrgence} = req.body;
  const geom = "POINT ("+longitude+" "+latitude+")";

  fonction.requeteAvecValidation(res, validation, req.body, query.updateUrgence(urgenceName), true, [geom, latitude, longitude, nom, adresse, numero, heure, service, lien, idUrgence]);
};

const deleteUrgence = (req, res) => {
  const validation = Joi.object({
    idUrgence : Joi.number().integer().required(),
    urgenceName : Joi.string().valid("csb", "dispensaire", "gendarmerie", "hopital", "jirama", "pharmacie", "police").required(),
  });

  fonction.requeteAvecValidation(res, validation, req.params, query.deleteUrgence(req.params.urgenceName), false, [req.params.idUrgence]);
};

const getNearestUrgence = (req, res) => {
  const validation = Joi.object({
    longitude : Joi.number().precision(6).required(),
    latitude : Joi.number().precision(6).required(),
    urgenceName : Joi.string().valid("csb", "dispensaire", "gendarmerie", "hopital", "jirama", "pharmacie", "police").required(),
  });

  const {longitude, latitude, urgenceName} = req.body

  fonction.requeteAvecValidation(res, validation, req.body, query.getNearestUrgence(urgenceName), true, [longitude, latitude]);
};

module.exports = {
  getAllUrgence,
  getUrgenceById,
  insertUrgence,
  updateUrgence,
  deleteUrgence,
  getNearestUrgence,
};

