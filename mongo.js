const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${process.env.DBUSER}:${process.env.PASSWORD}@cluster0.xgvbr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connect() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    return client.db("admin-poc").collection('contacts');
  } catch (error) {
    console.log(error);
  }
};

async function disconnect() {
  await client.close();
};

exports.connect = connect;
exports.disconnect = disconnect;