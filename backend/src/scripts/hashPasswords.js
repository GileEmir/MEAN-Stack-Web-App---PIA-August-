const bcrypt = require('bcryptjs');
const { MongoClient } = require('mongodb');

async function hashPasswords() {
  const uri = 'mongodb://127.0.0.1/vasaMastaVasaBasta'; // Replace with your MongoDB connection string
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('vasaMastaVasaBasta'); // Replace with your database name
    const users = database.collection('users'); // Replace with your collection name

    const cursor = users.find({});

    while (await cursor.hasNext()) {
      const user = await cursor.next();
      if (user && user.password) {
        const hashedPassword = bcrypt.hashSync(user.password, 10);
        await users.updateOne({ _id: user._id }, { $set: { password: hashedPassword } });
      }
    }
  } finally {
    await client.close();
  }
}

hashPasswords().catch(console.error);