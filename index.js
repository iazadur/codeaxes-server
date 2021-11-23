const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

// DB_USER=luxurydb
// DB_PASS=sUwNLLDo5MjSYnDo

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ddn3a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });




async function run() {
    try {
        await client.connect();
        const database = client.db('codeaxes');
        const usersCollection = database.collection('users')
       

       


        //   user

        // Insert a user into Database
        app.post('/user', async (req, res) => {
            const user = req.body
            const result = await usersCollection.insertOne(user)
            res.json(result)
        })

        // Read all user into Database
        app.get('/user', async (req, res) => {
            const result = await usersCollection.find({}).toArray()
            res.json(result)
        })


        // Delete user into Ordercollection
        app.delete("/user/:id", async (req, res) => {
            const result = await usersCollection.deleteOne({
                _id: ObjectId(req.params.id),
            });
            res.send(result);
        });







        
      



    } finally {
        // Ensures that the client will close when you finish/error
        //   await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('this is node server')
})

app.listen(port, () => {
    console.log('listening at', port);
})