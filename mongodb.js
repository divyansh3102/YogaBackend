import { MongoClient } from "mongodb";

const sourceUri = "mongodb+srv://ankitgdg1:Ankit123@cluster0.fjlhd.mongodb.net";
const destUri = "mongodb+srv://brandnirmaan:brandNirmaan1@cluster0.yaf37md.mongodb.net";

const dbName = "yoga";
const collectionsToCopy = ["doctors", "medicines", "users","services"]; // change as needed

async function copyData() {
  const sourceClient = new MongoClient(sourceUri);
  const destClient = new MongoClient(destUri);

  try {
    await sourceClient.connect();
    await destClient.connect();

    const sourceDB = sourceClient.db(dbName);
    const destDB = destClient.db(dbName);

    for (const collectionName of collectionsToCopy) {
      const data = await sourceDB.collection(collectionName).find().toArray();
      if (data.length > 0) {
        await destDB.collection(collectionName).deleteMany({}); // optional: clean target
        await destDB.collection(collectionName).insertMany(data);
        console.log(`Copied ${data.length} documents to ${collectionName}`);
      } else {
        console.log(`No data found in ${collectionName}`);
      }
    }

    console.log("✅ Data copied successfully!");
  } catch (err) {
    console.error("❌ Error:", err);
  } finally {
    await sourceClient.close();
    await destClient.close();
  }
}

copyData();
