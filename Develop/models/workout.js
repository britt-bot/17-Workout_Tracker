const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  exercises: [
    {
      type: {
      type: String,
      trim: true
      },
    name: {
      type: String,
      trim: true
    },
      duration: Number,
      distance: Number,
      weight: Number,
      reps: Number,
      sets: Number
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
