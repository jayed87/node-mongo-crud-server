const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
// user: mydbuser1
// pass: ucXfX7zJZCgNl01D

const uri = "mongodb+srv://mydbuser1:ucXfX7zJZCgNl01D@cluster0.y6oxz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// client.connect(err => {
//     const collection = client.db("test").collection("users");
//     // perform actions on the collection object
//     console.log("hitting the database")
//     const user = { name: "sumon", email: "sumon@gmail.com", phone: "01835379087" }
//     collection.insertOne(user)
//         .then(() => {
//             console.log('insert success');
//         })
//     // console.error(err);
//     // client.close();
// });



async function run() {
    try {
        await client.connect();

        const database = client.db("test");
        const usersCollection = database.collection("users");
        // create a document to insert
        const doc = {
            name: "jayed",
            email: "jayedakbar@gmail.com",
        }
        const result = await usersCollection.insertOne(doc);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('running my crud server');
})

app.listen(port, () => {
    console.log('running server on port', port);
})