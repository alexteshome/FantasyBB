const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const config = require("./db");
const users = require("./routes/user");
const teams = require("./routes/team");
const NBA = require("nba");

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {
    console.log("Database is connected");
  },
  err => {
    console.log("Can not connect to the database" + err);
  }
);

const app = express();
app.use(passport.initialize());
require("./passport")(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/teams", teams);
const playerStats = NBA.stats.playerStats();
app.get("/api/playerStats", function(req, res) {
  playerStats
    .then(data => {
      console.log(data);
      res.json({ success: true, data: data });
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        error: err
      });
    });
});
if (process.env.NODE_ENV === "production") {
  // Exprees will serve up production assets
  app.use(express.static("../frontend/build"));

  // Express serve up index.html file if it doesn't recognize route
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile("index.html");
  });
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
