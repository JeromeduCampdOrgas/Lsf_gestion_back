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
        tel: req.body.tel,
        password: hash,
        role: req.body.role,
        n_rue: req.body.n_rue,
        rue: req.body.rue,
        cp: req.body.cp,
        ville: req.body.ville,
      });

      res.status(201).json({
        message: `Votre compte est bien créé ${newUser.prenom} ${newUser.nom} !`,
      });
    }
  } catch (error) {
    return res.status(401).send({ error: "Impossible de créer le compte" });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: { email: req.body.email },
    }); // on vérifie que l'adresse mail figure bien dans la bdd
    if (user === null) {
      return res.status(403).json({ error: "Connexion échouée" });
    } else {
      const hash = await bcrypt.compare(req.body.password, user.password); // on compare les mots de passes

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
      }
    }
  } catch (error) {
    return res.status(500).json({ error: "Nouvelle Erreur serveur" });
  }
};
exports.getAllUsers = async (req, res) => {
  // on envoie tous les users sauf admin
  try {
    const users = await models.User.findAll({
      attributes: [
        "nom",
        "prenom",
        "id",
        "email",
        "role",
        "n_rue",
        "rue",
        "cp",
        "ville",
        "tel",
      ],
    });
    res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

exports.updateAccount = async (req, res) => {
  // modifier le profil

  const id = req.params.id;

  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.role;

    let user = await models.User.findOne({ where: { id: id } }); // on trouve le user
    if (userId === user.id || isAdmin === "admin") {
      if (req.body.nom) {
        user.nom = req.body.nom;
      }
      if (req.body.prenom) {
        user.prenom = req.body.prenom;
      }
      if (req.body.email) {
        user.email = req.body.email;
      }
      if (req.body.tel) {
        user.tel = req.body.tel;
      }
      if (req.body.n_rue) {
        user.n_rue = req.body.n_rue;
      }
      if (req.body.rue) {
        user.rue = req.body.rue;
      }
      if (req.body.cp) {
        user.cp = req.body.cp;
      }
      if (req.body.ville) {
        user.ville = req.body.ville;
      }
      if (req.body.role) {
        user.role = req.body.role;
      }
      if (req.body.password) {
        const hash = await bcrypt.hash(req.body.password, 10);
        user.password = hash;
      }

      const newUser = await user.save({
        fields: [
          "nom",
          "prenom",
          "email",
          "tel",
          "n_rue",
          "rue",
          "cp",
          "ville",
          "role",
        ],
      });

      // on sauvegarde les changements dans la bdd
      res.status(200).json({
        user: newUser,
        messageRetour: "Votre profil a bien été modifié",
      });
    } else {
      res
        .status(400)
        .json({ messageRetour: "Vous n'avez pas les droits requis" });
    }
  } catch (error) {
    res.status(500).json({ error: "pas d'bol c'est raté" });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    console.log(req.params.id);
    const id = req.params.id;

    const token = req.headers.authorization.split(" ")[1];

    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.role;

    let user = await models.User.findOne({ where: { id: id } }); // on trouve le user

    if (userId === user.id || isAdmin === "admin") {
      {
        models.User.destroy({ where: { id: id } }); // on supprime le compte
        res.status(200).json({ messageRetour: "utilisateur supprimé" });
      }
    }
  } catch (error) {
    return res.status(500).send({ error: "Erreur serveur" });
  }
};

exports.getOneUser = async (req, res) => {
  const userId = req.params.id;

  await models.User.findOne({
    attributes: ["id", "email", "nom", "prenom", "role"],
    where: { id: userId },
  })
    .then(function (user) {
      if (user) {
        res.status(201).json(user);
      } else {
        res.status(404).json({ error: "user not found" });
      }
    })
    .catch(function (err) {
      res.status(500).json({ error: "cannot fetch user" });
    });
};
