//Imports
const bcrypt = require("bcrypt");
const models = require("../models");
const jwt = require("jsonwebtoken");
const fs = require("fs");
//const jwtVerif = require("../functions/jwt_verif");
require("dotenv").config();
//const token = require("../middleware/token"); // module qui génère le token
const { Op } = require("sequelize");

// Routes

exports.signup = async (req, res) => {
  console.log(req);
  try {
    const user = await models.User.findOne({
      where: { email: req.body.email },
    });

    if (user !== null) {
      if (user.email === req.body.email) {
        return res.status(400).json({ error: "Ce compte existe déjà" });
      }
    } else {
      const hash = await bcrypt.hash(req.body.password, 10);
      const newUser = await models.User.create({
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: hash,
        role: req.body.role,
        n_rue: req.body.n_rue,
        rue: req.body.rue,
        cp: req.body.cp,
        ville: req.body.ville,
      });

      res.status(201).json({
        message: `Votre compte est bien créé ${newUser.nom} !`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error: "Impossible de créer le compte" });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: { email: req.body.email },
    }); // on vérifie que l'adresse mail figure bien dans la bdd
    console.log(user);
    if (user === null) {
      return res.status(403).json({ error: "Connexion échouée" });
    } else {
      const hash = bcrypt.compare(req.body.password, user.password); // on compare les mots de passes
      if (!hash) {
        return res.status(401).json({ error: "Mot de passe incorrect !" });
      } else {
        res.status(200).json({
          // on renvoie le user et le token

          user: user,
          token: jwt.sign(
            {
              userId: user.id,
              lastName: user.nom,
              firstName: user.prenom,
              email: user.email,
              role: user.role,
            },
            "RANDOM_TOKEN_SECRET",
            {
              expiresIn: "24h",
            }
          ),

          message: "Bonjour " + user.prenom + " " + user.nom + " !" + " : ",
        });
        console.log();
      }
    }
  } catch (error) {
    return res.status(500).json({ error: "Erreur serveur" });
  }
};
exports.getAllUsers = async (req, res) => {
  // on envoie tous les users sauf admin
  try {
    const users = await models.User.findAll({
      attributes: ["nom", "id", "email", "role"],
    });
    res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};
