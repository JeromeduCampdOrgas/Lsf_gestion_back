const models = require("../models");
const { json } = require("body-parser");
const express = require("express");
const jwt = require("jsonwebtoken");
const path = require("path");

module.exports = {
  createStatut: async function (req, res) {
    console.log(req.body);
    let statutName = req.body.statut;
    try {
      const statut = await models.Dogstatut.findOne({
        where: { statut: statutName },
      });
      if (statut) {
        return res.status(400).json({ error: "Ce statut existe déjà" });
      } else {
        const newStatut = await models.Dogstatut.create({
          statut: statutName,
        });
        res.status(201).json({
          message: `Le statut est bien créé ${newStatut.statut}!`,
        });
      }
    } catch (error) {
      return res
        .status(401)
        .send({ error: "Impossible de créer le nouveau statut" });
    }
  },
  getStatuts: async function (req, res) {
    try {
      const statuts = await models.Dogstatut.findAll({
        attributes: ["id", "statut"],
      });
      res.status(200).send(statuts);
    } catch (error) {
      return res.status(500).send({ error: "Erreur serveur" });
    }
  },
  deleteStatut: async function (req, res) {
    try {
      const id = req.params.id;
      let statut = await models.Dogstatut.findOne({ where: { id: id } });
      const token = req.headers.authorization.split(" ")[1];

      const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
      console.log(decodedToken);
      const isAdmin = decodedToken.role;
      if (isAdmin === "admin" || id === statut.id) {
        {
          models.Dogstatut.destroy({ where: { id: id } }); // on supprime le compte
          res.status(200).json({ messageRetour: "statut supprimé" });
        }
      }
    } catch (error) {
      return res.status(500).send({ error: "Erreur serveur" });
    }
  },
};
