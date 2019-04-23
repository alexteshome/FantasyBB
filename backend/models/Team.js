const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
  _id: Number,
  name: String
});
const TeamSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userId: { type: Schema.Types.ObjectId, required: true },
  name: {
    type: String,
    required: true,
    trim: true
  },
  players: {
    type: [PlayerSchema]
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Team = mongoose.model("teams", TeamSchema);

module.exports = Team;
