const fs = require('fs');
const { MongoClient, ServerApiVersion } = require('mongodb');

const toursJson = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))
console.log(toursJson)

const uri = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
console.log('***', uri)

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment.");

    const database = client.db('t-app');
    // const collections = database.listCollections()
    const tours = database.collection('tours')
    await tours.insertMany(toursJson)

  // console.log('***', tour);
  } finally {
    await client.close()
  }
  
}

module.exports = run;
