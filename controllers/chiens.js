const models = require("../models");
const { json } = require("body-parser");
const fs = require("fs");
const express = require("express");
const path = require("path");
//const chemin = process.cwd() + "/images/chienCarousel";

//("c:/users/ducam/onedrive/bureau/lsf/lsf_back/images/chienCarousel");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

module.exports = {
  createChien: function (req, res) {
    let refuge = req.body.refuge;
    let name = req.body.nom;
    let puce = req.body.puce;
    let sexe = req.body.sexe;
    let age = req.body.age;
    let taille = req.body.taille;
    let chat = req.body.chat;
    let statut = req.body.statut;
    let attachmentURL = `${req.protocol}://${req.get(
      "host"
    )}/images/chiens/${name}/${req.file.filename}`;

    models.Chiens.create({
      refuge: refuge,
      nom: name,
      puce: puce,
      sexe: sexe,
      age: age,
      taille: taille,
      chats: chat,
      statut: statut,
      imageUrl: attachmentURL,
    })
      .then((newChien) => {
        res
          .status(201)
          .json({ message: "Chien successfully created", newChien });
      })
      .catch((err) => res.status(500).json(err));
  },
  updateChien: function (req, res) {
    console.log("on est là");
    let chienId = parseInt(req.params.id);
    let refuge = req.body.refuge;
    let nom = req.body.nom;
    let puce = req.body.puce;
    let sexe = req.body.sexe;
    let age = req.body.age;
    let taille = req.body.taille;
    let chat = req.body.chat;
    let statut = req.body.statut;
    let attachmentURL = `${req.protocol}://${req.get(
      "host"
    )}/images/chiens/${nom}/${req.file.filename}`;
    if (!req.file) {
      models.Chiens.update(
        {
          nom: nom,
          puce: puce,
          sexe: sexe,
          age: age,
          taille: taille,
          chat: chat,
          refuge: refuge,
          statut: statut,
        },
        { where: { id: chienId } }
      )
        .then(() => res.status(201).json({ message: "objet modifié" }))
        .catch((err) =>
          res.status(500).json({ err: "impossible de modifier l'objet" })
        );
    } else {
      models.Chiens.update(
        {
          nom: nom,
          puce: puce,
          sexe: sexe,
          age: age,
          taille: taille,
          chat: chat,
          refuge: refuge,
          statut: statut,
          imageUrl: attachmentURL,
        },
        { where: { id: chienId } }
      )
        .then(() => res.status(201).json({ message: "objet modifié" }))
        .catch((err) =>
          res.status(500).json({ err: "impossible de modifier l'objet" })
        );
    }
  },
  getAllChiens: function (req, res) {
    models.Chiens.findAll()
      .then(function (chiens) {
        if (chiens) {
          res.status(200).json(chiens);
        } else {
          res.status(404).json({ error: "no chiens found" });
        }
      })
      .catch(function (err) {
        res.status(500).json({ error: "erreur du putain de serveur" });
      });
  },
  getAllChiensOneRefuge: async function (req, res) {
    //let refugeId = req.params.refugeId;

    try {
      const chiens = await models.Chiens.findAll({
        where: { refugeId: req.params.refugeId },
      });
      res.status(200).send(chiens);
    } catch (error) {
      return res.status(501).send({ error: "Erreur serveur" });
    }
  },
  carousel: function (req, res) {
    let nom = req.body.nom;
    let chienId = req.body.chienId;
    let refuge = req.body.refuge;

    try {
      //let name = req.body.nom;
      for (let i = 0; i < req.files.length; i++) {
        let attachmentURL = `${req.protocol}://${req.get(
          "host"
        )}/images/chiens/chiencarousel/${nom}/${req.files[i].filename}`;

        models.chiencarousel.create({
          nom: nom,
          chienId: chienId,
          refuge: refuge,
          images: attachmentURL,
        });
      }
      return res.status(201).json({ message: "C'est tout bon" });
    } catch (error) {
      return res.status(501).send({ error: "Erreur serveur" });
    }
  },
  chiensCarousel: async function (req, res) {
    let chienId = req.params.chienId;
    console.log(chienId);
    try {
      const carousel = await models.chiencarousel.findAll({
        where: { chienId: chienId },
      });

      return res.status(200).json(carousel);
    } catch (error) {
      return res.status(501).send({ error: "Erreur serveur" });
    }
  },
  chiensCarouselSuppr: function (req, res) {
    let imageId = req.params.id;
    {
      const carousel = models.chiencarousel
        .findOne({
          where: { id: imageId },
        })
        .then((image) => {
          let chaine = image.images;
          let debut = chaine.indexOf("IMG");
          let fin = chaine.lastIndexOf(".JPG") + 4;
          let longueur = fin - debut;
          let newChaine = chaine.substr(debut, longueur);
          let nom = image.nom;
          const dest = `images/chiens/chienCarousel/${nom}`;
          /************************* */
          fs.unlinkSync(`${dest}/${newChaine}`);
          models.chiencarousel
            .destroy({
              where: { id: imageId },
            })
            .then(() => res.status(200).json({ message: "Objet supprimé !" }))
            .catch((error) =>
              res
                .status(400)
                .json({ error: "Impossible de supprimer le message" })
            );
        });
    }
  },
  deleteChien: async function (req, res) {
    let chienId = req.params.id;
    console.log(chienId);
    await models.Chiens.findOne({
      where: {
        id: chienId,
      },
    })
      .then(() => {
        models.Chiens.destroy({
          where: {
            id: chienId,
          },
        })
          .then(() => {
            console.log("c'est fait");
            res.status(201).json({
              message: "chien supprimé",
            });
          })
          .catch(() =>
            res.status(500).json({ message: "une erreur est survenue" })
          );
      })
      .catch(() => res.status(400).json({ message: "Chien non trouvé" }));
  },
};
