const fonction = require("./fonction");
const query = require("../models/utilisateur");
const Joi = require("joi");

const getAllUtilisateur = (req, res) => {
  fonction.requeteAvecReponse(query.getAllUtilisateur, res);
};

const getUtilisateurById = (req, res) => {
  const validation = Joi.object({
    idUtilisateur : Joi.number().integer().required(),
  });

  fonction.requeteAvecValidation(res, validation, req.params, query.getUtilisateurById, true);
};

const insertUtilisateur = (req, res) => {
  const validation = Joi.object({
    nom : Joi.string().required(),
    prenom : Joi.string().required(),
    email : Joi.string().required(),
    password : Joi.string().required(),
  });

  fonction.requeteAvecValidation(res, validation, req.body, query.insertUtilisateur, false);
};

const updateUtilisateur = (req, res) => {
  const validation = Joi.object({
    nom : Joi.string().required(),
    prenom : Joi.string().required(),
    email : Joi.string().required(),
    password : Joi.string().required(),
    idUtilisateur : Joi.number().integer().required(),
  });

  fonction.requeteAvecValidation(res, validation, req.body, query.updateUtilisateur, false);
};

const deleteUtilisateur = (req, res) => {
  const validation = Joi.object({
    idUtilisateur : Joi.number().integer().required(),
  });

  fonction.requeteAvecValidation(res, validation, req.params, query.deleteUtilisateur, false);
};

module.exports = {
  getAllUtilisateur,
  getUtilisateurById,
  insertUtilisateur,
  updateUtilisateur,
  deleteUtilisateur,
};

