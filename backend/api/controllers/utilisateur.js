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

  fonction.requeteAvecValidation(res, validation, req.params, query.getUtilisateurById, true, [req.params.idUtilisateur]);
};

const insertUtilisateur = (req, res) => {
  const validation = Joi.object({
    nom : Joi.string().required(),
    prenom : Joi.string().required(),
    email : Joi.string().required(),
    password : Joi.string().required(),
  });

  const {nom, prenom, email, password} = req.body

  fonction.requeteAvecValidation(res, validation, req.body, query.insertUtilisateur, false, [nom, prenom, email, password]);
};

const updateUtilisateur = (req, res) => {
  const validation = Joi.object({
    nom : Joi.string().required(),
    prenom : Joi.string().required(),
    email : Joi.string().required(),
    password : Joi.string().required(),
    idUtilisateur : Joi.number().integer().required(),
  });

  const {nom, prenom, email, password, idUtilisateur} = req.body

  fonction.requeteAvecValidation(res, validation, req.body, query.updateUtilisateur, false, [nom, prenom, email, password, idUtilisateur]);
};

const deleteUtilisateur = (req, res) => {
  const validation = Joi.object({
    idUtilisateur : Joi.number().integer().required(),
  });

  fonction.requeteAvecValidation(res, validation, req.params, query.deleteUtilisateur, false, [req.params.idUtilisateur]);
};

module.exports = {
  getAllUtilisateur,
  getUtilisateurById,
  insertUtilisateur,
  updateUtilisateur,
  deleteUtilisateur,
};

