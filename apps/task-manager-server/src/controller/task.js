const express = require("express");
const Task = require("../model/task");
const auth = require("../middleware/auth");

const router = new express.Router();

router.post("/tasks", auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      user: req.user._id,
    });

    await task.save();

    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/tasks", auth, async (req, res) => {
  const query = { user: req.user._id };

  if (req.query.completed) {
    query.completed = req.query.completed.toLowerCase() === "true";
  }

  let limit = 0;
  let skip = 0;
  const sort = {};

  if (req.query.limit) {
    limit = parseInt(req.query.limit);
  }

  if (req.query.skip) {
    skip = parseInt(req.query.skip);
  }

  if (req.query.sortBy) {
    const split = req.query.sortBy.split(":");

    sort[split[0]] = split[1] === "desc" ? -1 : 1;
  }

  try {
    const tasks = await Task.find(query)
      .populate({ path: "user", select: ["name", "email"] })
      .limit(limit)
      .skip(skip)
      .sort(sort);

    if (tasks.length > 0) {
      res.status(200).send(tasks);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  try {
    const id = req.params.id;

    const task = await Task.findOne({ _id: id, user: req.user._id });

    if (task) {
      res.status(200).send(task);
    } else {
      res.status(404).send();
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const allowedUpdates = ["description", "completed"];
  const requestedUpdates = Object.keys(req.body);
  const isRequestValid = requestedUpdates.every((field) =>
    allowedUpdates.includes(field)
  );

  if (!isRequestValid) {
    return res.status(400).send({ error: "Invalid updates..!!" });
  }

  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (task) {
      requestedUpdates.forEach((update) => {
        task[update] = req.body[update];
      });

      await task.save();

      res.status(200).send(task);
    } else {
      res
        .status(404)
        .send({ error: `Task not found with id ${req.params.id}` });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    // console.log("task before deletion:", task);

    if (task) {
      await task.deleteOne();

      // console.log("task after deletion:", task);

      res.status(200).send(task);
    } else {
      res
        .status(404)
        .send({ error: `task not found with id : ${req.params.id}` });
    }
  } catch (err) {
    res.status(400).send({ err });
  }
});

module.exports = router;
