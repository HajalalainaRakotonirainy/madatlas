const fonction = require("./fonction");
const query = require("../models/urgence");
const Joi = require("joi");

const getAllUrgence = (req, res) => {
  fonction.requeteAvecReponse(query.getAllUrgence, res);
};

const getUrgenceById = (req, res) => {
  const validation = Joi.object({
    idUrgence : Joi.number().integer().required(),
  });

  fonction.requeteAvecValidation(res, validation, req.params, query.getUrgenceById, true);
};

const insertUrgence = (req, res) => {
  const validation = Joi.object({
    latitude : Joi.number().precision(6).required(),
    longitude : Joi.number().precision(6).required(),
    nom : Joi.string().required(),
    type : Joi.string().valid("PDP", "VDP", "JIR", "PMP", "DIS", "CSB", "CHU", "PDR").required(),
    description : Joi.string().required(),
    contact : Joi.string().required(),
  });

  const { value, error } = validation.validate(req.body);
  const {latitude, longitude, nom, type, description, contact} = value;

  if(!error){
    const geom = "POINT ("+longitude+" "+latitude+")";

    fonction.requeteAvecReponse(query.insertUrgence, res, [geom, latitude, longitude, nom, type, description, contact]);
  } else{
    console.log("[error] "+error.message);
    res.status(400);
    res.end();
  };
};

const updateUrgence = (req, res) => {
  const validation = Joi.object({
    latitude : Joi.number().precision(6).required(),
    longitude : Joi.number().precision(6).required(),
    nom : Joi.string().required(),
    type : Joi.string().valid("PDP", "VDP", "JIR", "PMP", "DIS", "CSB", "CHU", "PDR").required(),
    description : Joi.string().required(),
    contact : Joi.string().required(),
    idUrgence : Joi.number().integer().required(),
  });

  const { value, error } = validation.validate(req.body);
  const {latitude, longitude, nom, type, description, contact, idUrgence} = value;

  if(!error){
    const geom = "POINT ("+longitude+" "+latitude+")";

    fonction.requeteSansReponse(query.updateUrgence, res, [geom, latitude, longitude, nom, type, description, contact, idUrgence]);
  } else{
    console.log("[error] "+error.message);
    res.status(400);
    res.end();
  };
};

const deleteUrgence = (req, res) => {
  const validation = Joi.object({
    idUrgence : Joi.number().integer().required(),
  });

  fonction.requeteAvecValidation(res, validation, req.params, query.deleteUrgence, false);
};

module.exports = {
  getAllUrgence,
  getUrgenceById,
  insertUrgence,
  updateUrgence,
  deleteUrgence,
};

