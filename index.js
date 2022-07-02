const express = require('express')
const app = express()
var cors = require('cors')
const port = 5000;
// middlewareWrapper
app.use(cors());
app.use(express.json())
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const uri = "mongodb+srv://todo:vuH1w4pIaHR7jXde@cluster0.zavli.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function  run(){
    try{
        await client.connect();
        const collection = client.db("todo").collection("todo-lists");

        app.get('/list', async(req, res) =>{
            const query = req.query;
            const cursor =  collection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })


        app.post('/lists', async(req, res) => {
            const data = req.body;
            const result = await collection.insertOne(data);
            res.send(result);
        })

        app.delete('/list/:id', async(req, res)=>{
            const id = req.params.id;
           // console.log(id);
            const query = { _id:ObjectId(id)};
           // console.log(query);
            const result = await collection.deleteOne(query);
            res.send(result);
        })

    }

    finally{}
}
run().catch(console.dir);


//user : todo
// pass : vuH1w4pIaHR7jXde

app.get('/', (req, res) => {
  res.send('Todo Manager Ready!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})