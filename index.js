const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const app = express();
const port = process.env.PORT || 5000;
// user: mydbuser1
// pass: ucXfX7zJZCgNl01D
app.use(cors());
app.use(express.json());

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
        // GET api
        app.get('/users', async (req, res) => {
            const cursor = usersCollection.find({});
            const users = await cursor.toArray();
            res.send(users);
        });
        // POST api 
        app.post('/users', async (req, res) => {
            const newUser = req.body;
            const result = await usersCollection.insertOne(newUser);
            console.log('got new user', req.body);
            console.log('added user', result);
            res.json(result);
        });
        //DELETE api
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await usersCollection.deleteOne(query);
            console.log('deleting user with id', result);
            res.json(result);
        })
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('running my crud server');
})

app.listen(port, () => {
    console.log('running server on port', port);
})