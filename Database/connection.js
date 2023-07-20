import mongoose from "mongoose";
const uri = `mongodb+srv://${process.env.MONGO_USER_NAME}:${process.env.MONGO_USER_PASSWORD}@${process.env.DB_SOURCE}/?retryWrites=true&w=majority`;

main().catch((err) => console.log(err));
// After successful connection
async function main() {
  try {
    await mongoose.connect(uri, {
      dbName: "sample_airbnb",
    });
    let db = mongoose.connection;
    console.log("Connected to the database");
  } catch (error) {
    console.log(error);
    mongoose.connection.close();
  }
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
export default main;
