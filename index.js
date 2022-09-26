const express = require('express');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.blfheza.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try {
        client.connect();
        const topicCollection = client.db("voleenter").collection("volenteer-activities");
        
        app.get('/volenteerTopics', async (req, res)=>{
            const result = await topicCollection.find({});
            const topics = await result.toArray();
            res.send(topics);
        })
        
    }
    finally {
        // client.close();
    }
}
run().catch(console.dir)
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });


app.get('/', (req, res)=> {
    res.send('hello world')
});

app.listen(port, ()=>console.log('listening to port', port));