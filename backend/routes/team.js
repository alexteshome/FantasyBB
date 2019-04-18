const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Team = require("../models/Team");

router.get("/:teamId", (req, res) => {
  const id = req.params.teamId;
  Team.findById(id)
    .then(team => {
      if (team) {
        res.status(200).json({
          team
        });
      } else {
        res.status(404).json({
          message: "No valid entry found for provided ID"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.get("/", (req, res) => {
  Team.find()
    .sort({ date: -1 })
    .then(teams => res.json(teams))
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
router.post("/", (req, res) => {
  Team.findOne({ name: req.body.name })
    .then(team => {
      if (team) {
        return res.status(400).json({
          message: "Team name already exists"
        });
      } else {
        const newTeam = new Team({
          _id: new mongoose.Types.ObjectId(),
          userId: req.body.userId,
          name: req.body.name,
          players: req.body.players
        });
        newTeam
          .save()
          .then(registeredTeam => {
            res.json(registeredTeam);
          })
          .catch(err => {
            res.status(500).json({
              error: err
            });
          });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:teamId", (req, res) => {
  const id = req.params.teamId;
  Team.remove({ _id: id }) // Remove any object that fulfills this criteria
    .then(() => {
      res.status(200).json({
        message: "Team Deleted"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
