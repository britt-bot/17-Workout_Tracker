const router = require("express").Router();
const db = require("../../models");

router.get("/", (req, res) => {
  db.Workout.aggregate([{
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

router.post("/", (req, res) => {
  db.Workout.create({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      console.error(err);
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  console.log("req.body", req.body)
  console.log("req.params.id", req.params.id)
  db.Workout.findOneAndUpdate(
    { _id: req.params.id}
 , {
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
  db.Workout.aggregate([{
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