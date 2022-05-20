const models = require("../models");
const fs = require("fs");
const { json } = require("body-parser");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");

module.exports = {
  createRefuge: function (req, res) {
    let nom = req.body.nom;
    let attachmentURL = `${req.protocol}://${req.get(
      "host"
    )}/images/refuges/${nom}/${req.file.filename}`;

    models.Refuge.findOne({
      attributes: ["nom"],
      where: { nom: nom },
    }).then((refuge) => {
      if (refuge == null) {
        models.Refuge.create({
          nom: nom,
          logo: attachmentURL,
        })
          .then((newRefuge) => {
            res
              .status(201)
              .json({ message: "Refuge successfully created", newRefuge });
          })
          .catch((err) => res.status(500).json(err));
      } else {
        res.status(201).json({ message: "Le refuge existe déjà" });
      }
    });
  },
  getAllRefuge: async function (req, res) {
    try {
      const refuges = await models.Refuge.findAll({
        attributes: ["id", "nom", "logo"],
      });
      res.status(200).send(refuges);
    } catch (error) {
      return res.status(500).send({ error: "Erreur serveur" });
    }
  },
  getOneRefuge: async (req, res) => {
    const refugeNom = req.params.nom;

    await models.Refuge.findOne({
      attributes: ["nom", "logo"],
      where: { nom: refugeNom },
    })
      .then(function (refuge) {
        if (refuge) {
          res.status(201).json(refuge);
        } else {
          res.status(404).json({ error: "refuge not found" });
        }
      })
      .catch(function (err) {
        res.status(500).json({ error: "cannot fetch refuge" });
      });
  },
  updateRefuge: function (req, res) {
    let name = req.body.nom;
    let refugeId = req.params.id;
    console.log(refugeId);

    if (req.file) {
      let attachmentURL = `${req.protocol}://${req.get(
        "host"
      )}/images/refuges/${req.file.filename}`;
      models.Refuge.update(
        {
          nom: name,
          logo: attachmentURL,
        },
        {
          where: {
            id: refugeId,
          },
        }
      )
        .then(() => {
          res.status(201).json({ message: "Refuge successfully updated" });
        })
        .catch((err) => res.status(500).json(err));
    } else {
      models.Refuge.update(
        {
          nom: name,
        },
        {
          where: {
            id: refugeId,
          },
        }
      )
        .then(() => {
          res.status(201).json({ message: "Refuge successfully updated" });
        })
        .catch((err) => res.status(500).json(err));
    }
  },
  deleteRefuge: async function (req, res) {
    let refugeId = req.params.id;
    console.log(refugeId);
    await models.Refuge.findOne({
      where: {
        id: refugeId,
      },
    })
      .then(() => {
        models.Refuge.destroy({
          where: {
            id: refugeId,
          },
        })
          .then(() => {
            res.status(201).json({ message: "refuge supprimé" });
          })
          .catch(() =>
            res.status(500).json({ message: "une erreur est survenue" })
          );
      })
      .catch(() => res.status(400).json({ message: "Refuge non trouvé" }));
  },
};
