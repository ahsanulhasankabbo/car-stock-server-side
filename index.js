const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fsvwn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const serviceCollection = client.db('car-stock').collection('service');

        app.get('/inventory', async(req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const inventories = await cursor.toArray();
            res.send(inventories);
        })

        app.get('/inventory/:id',async(req,res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const inventory = await serviceCollection.findOne(query);
            res.send(inventory);
        })
    }
    finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('car server is running')
})

app.listen(port, () => {
    console.log("listening to port", port)
})