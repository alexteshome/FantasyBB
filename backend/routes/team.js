const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Team = require("../models/Team");

router.get("/:userId", (req, res) => {
  const id = req.params.userId;
  Team.find({ userId: id })
    .then(teams => {
      if (teams) {
        res.json({
          teams
        });
      } else {
        res.status(404).json({
          message: "No valid entry found for provided user ID"
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
  Team.findOne({ name: req.body.name, userId: req.body.userId })
    .then(team => {
      if (team) {
        return res.status(400).json({
          message: {
            header: "Team could not be saved",
            content: "Team name already exists"
          }
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
            res.json({
              ...registeredTeam,
              message: {
                header: "Team has been saved",
                content: 'Check your new team in the "Teams" tab'
              }
            });
          })
          .catch(err => {
            res.status(500).json({
              message: {
                header: "Team could not be saved",
                content: err
              }
            });
          });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: {
          header: "Team could not be saved",
          content: err
        }
      });
    });
});

router.delete("/:teamId", (req, res) => {
  const id = req.params.teamId;
  Team.findOne({ _id: id })
    .then(team => {
      if (!team) {
        return res.status(400).json({
          message: "Team does not exist"
        });
      } else {
        Team.remove({ _id: id })
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
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/all/:userId", (req, res) => {
  const id = req.params.userId;

  Team.remove({ userId: id })
    .then(() => {
      res.status(200).json({
        message: "All user's teams deleted"
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
