import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import Cards from "./cards.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
mongoose
  .connect("mongodb://localhost:27017/tinder_clone", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected Successfully"))
  .catch((e) => console.log(`Connection error ${e.message}`));

//mongodb+srv://jude1992:jude1992@cluster0.pkdpg.mongodb.net/tinder-backend?retryWrites=true&w=majority

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => res.status(200).send("HELLO JUDE DANIEL"));
app.post("/tinder/card", (req, res) => {
  const dbCard = req.body;
  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(PORT, console.log(`Server running at ${PORT} `));
