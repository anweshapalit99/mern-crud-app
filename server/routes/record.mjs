import express from "express";
import mongodb from "mongodb";

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
import dbo from "../db/conn.mjs";

// This help convert the id from string to ObjectId for the _id.
const ObjectId = mongodb.ObjectId;

// This section will help you get a list of all the records.
recordRoutes.route("/").get(async function (req, res) {
  let db_connect = await dbo.getDb();
  let collection = db_connect.collection("record");
  let results = await collection.find({}).limit(50).toArray();

  res.send(results).status(200);
});

// This section will help you create a new record.
recordRoutes.post("/", async (req, res) => {
  let newDocument = {
    firstName: req.body.first,
    lastName: req.body.last,
    avatarUrl: req.body.avatar,
    notes: req.body.notes,
    date: new Date(),
  };
  let db_connect = await dbo.getDb();
  let collection = db_connect.collection("record");
  let result = await collection.insertOne(newDocument);
  /* Adding the count in the response */
  collection.estimatedDocumentCount().then((count) => {
    result.count = count;
    res.status(200).send(result);
  });
});

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("records").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      firstName: req.body.first,
      lastName: req.body.last,
      avatarUrl: req.body.avatar,
      notes: req.body.notes,
      date: new Date(),
    },
  };
  db_connect
    .collection("records")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
});

export default recordRoutes;
