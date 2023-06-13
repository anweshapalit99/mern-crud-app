import { MongoClient } from "mongodb";

const connectionString =
  process.env.ATLAS_URI ||
  "mongodb+srv://anweshapalit123:JQzrwB6ZFXh2ehfj@clusterap0.currry5.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(connectionString);

let conn = null;
let db = null;
let collection = null;

let getDb = async () => {
  try {
    conn = await client.connect();
    db = conn.db("records");
    collection = db.collection("user");
    return db;
  } catch (e) {
    console.error(e);
  }
};

export default { getDb: getDb };
