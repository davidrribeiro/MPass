require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const dbuser = process.env.DB_USER;
const dbpassword = process.env.DB_PASS;
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Express rodando!" });
});

// rotas da api
const userRoutes = require("./routes/userRoutes");
app.use("/user", userRoutes);

const categoryRoutes = require("./routes/categoryRoutes");
app.use("/category", categoryRoutes);

const itemRoutes = require("./routes/itemRoutes");
app.use("/item", itemRoutes);

mongoose
  .connect(
    `mongodb+srv://${dbuser}:${dbpassword}@apimpass.ubauc7z.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectado ao MongoDB Atlas!");
  })
  .catch((err) => {
    console.log("Erro", err);
  });

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
