const router = require("express").Router();
const Item = require("../models/Item");

router.post("/", async (req, res) => {
  const { title, url, description, password } = req.body;
  const item = {
    title,
    url,
    description,
    password,
  };

  try {
    await Item.create(item);
    res.status(201).json({ message: "Item criado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const items = await Item.find();

    if (!items) {
      return res.status(404).json({ message: "Item não encontrado!" });
    }
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const item = await Item.findOne({ _id: id });

    if (!item) {
      return res.status(404).json({ message: "Item não encontrado!" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { title, url, description, password } = req.body;

  const itemObj = {
    title,
    url,
    description,
    password,
  };

  try {
    const updatedItem = await Item.updateOne({ _id: id }, itemObj);

    if (updatedItem.matchedCount === 0) {
      return res.status(404).json({ message: "Item não encontrado!" });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const item = await Item.findOne({ _id: id });

  if (!item) {
    return res.status(404).json({ message: "Item não encontrado!" });
  }
  try {
    const deletedItem = await Item.deleteOne({ _id: id });

    if (deletedItem.deletedCount === 0) {
      return res.status(404).json({ message: "Item não encontrado!" });
    }
    res.status(200).json(deletedItem);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
