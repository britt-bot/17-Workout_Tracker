const router = require("express").Router();
const Workout = require("../../models/workout.js");

router.get("/", (req, res) => {
  Workout.aggregate([{
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration"
        }
      }
    }])
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      console.error(err);
      res.status(400).json(err);
    });
});

router.post("/", ({
  body
}, res) => {
  Workout.create({
      exercises: body
    })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      console.error(err);
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  Workout.fineOneAndUpdate({
      _id: req.params.id
    }, {
      $push: {
        exercises: req.body
      }
    }, {
      new: true
    })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      console.error(err);
      res.status(400).json(err);
    });
});

router.get("/range", (req, res) => {
  Workout.aggregate([{
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration"
        }
      }
    }])
    .sort({
      date: 'desc'
    })
    .limit(7)
    .then(dbWorkout => {
      res.json(dbWorkout)
    })

    .catch(err => {
      console.error(err);
      res.status(400).json(err);
    });
  })

module.exports = router;