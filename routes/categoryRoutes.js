const router = require("express").Router();
const Category = require("../models/Category");

router.post("/", async (req, res) => {
  const { name } = req.body;
  const category = {
    name,
  };

  try {
    await Category.create(category);
    res.status(201).json({ message: "Categoria criada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();

    if (!categories) {
      return res.status(404).json({ message: "Categoria não encontrada!" });
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const category = await Category.findOne({ _id: id });

    if (!category) {
      return res.status(404).json({ message: "Categoria não encontrada!" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { name } = req.body;

  const categoryObj = {
    name,
  };

  try {
    const updateCategory = await Category.updateOne({ _id: id }, categoryObj);

    if (updateCategory.matchedCount === 0) {
      return res.status(404).json({ message: "Categoria não encontrada!" });
    }
    res.status(200).json(updateCategory);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const category = await Category.findOne({ _id: id });

  if (!category) {
    return res.status(404).json({ message: "Categoria não encontrada!" });
  }

  try {
    const deleteCategory = await Category.deleteOne({ _id: id });
    res.status(200).json(deleteCategory);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
