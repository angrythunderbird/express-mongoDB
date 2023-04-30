// const fs = require('fs');
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
console.log('***', uri);

const clientDB = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// async function run() {
//   try {
//     await client.connect();

//     await client.db('admin').command({ ping: 1 });
//     console.log('Pinged your deployment.');

//     const database = client.db('t-app');
//     // const collections = database.listCollections()
//     const tours = database.collection('tours');
//     const res = await tours.deleteMany();

//     console.log(res.deletedCount);
//   } finally {
//     await client.close();
//   }
// }

module.exports = clientDB;
