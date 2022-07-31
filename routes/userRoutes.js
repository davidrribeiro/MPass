const router = require("express").Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  const user = {
    name,
    email,
    password,
  };

  try {
    await User.create(user);
    res.status(201).json({ message: "Usuário criado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;

  const userObj = {
    name,
    email,
    password,
  };

  try {
    const updatedUser = await User.updateOne({ _id: id }, userObj);

    if (updatedUser.matchedCount === 0) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({ _id: id });

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado!" });
  }

  try {
    const deletedUser = await User.deleteOne({ _id: id });
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
