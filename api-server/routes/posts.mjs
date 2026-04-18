import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/search", async (req, res) => {
  const title = req.query.title;
  const page = req.query.page || 1;
  const response = await fetch(`https://openlibrary.org/search.json?title=${title}&limit=10&page=${page}`);
  const data = await response.json();
  res.send(data.docs).status(200);
});

// Get all favourites from MongoDB
router.get("/", async (req, res) => {
  let collection = await db.collection("books");
  let results = await collection.find({})
    .limit(50)
    .toArray();
  res.send(results).status(200);
});

// Add a new favourite to MongoDB
router.post("/", async (req, res) => {
  let collection = await db.collection("books");
  let newDocument = req.body;
  newDocument.date = new Date();
  let result = await collection.insertOne(newDocument);
  res.status(204).send(result);
});

// Delete a favourite by id
router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  const query = { _id: ObjectId(id) };
  const collection = db.collection("books");
  let result = await collection.deleteOne(query);
  res.send(result).status(200);
});

export default router;