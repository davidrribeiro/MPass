require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const DBUSER = process.env.DB_USER;
const DBPASS = process.env.DB_PASS;

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Express rodando!" });
});

// rotas da api
const userRoutes = require("./routes/userRoutes");
app.use("/user", userRoutes);

mongoose
  .connect(
    `mongodb+srv://${DBUSER}:${DBPASS}@apimpass.ubauc7z.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectado ao MongoDB Atlas!");
  })
  .catch((err) => {
    console.log("Erro", err);
  });

app.listen(3000);
