const express = require("express");
const app = express();
const {MongoClient} = require("mongodb");
const cors = require("cors");
app.use(cors());
app.use(express.json());

var idDoc = 15;
const uri = `mongodb+srv://muthuBlacky:sanmugapriya@cluster0.a5i29zs.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);

app.get('/todos',async function(req,res){
    const todos = await client.db("todoslist").collection("todos").find({}).toArray();
    // console.log(todos);
    res.send(JSON.stringify(todos));
});

app.post('/todo',async function(req,res){
    // console.log(req.body.todo.title);
    // console.log(req.body.todo.description);
    res.send("posted" + req.body.todo.title);
    const ins = await client.db("todoslist").collection("todos").insertOne({"_id" : idDoc,"title" : req.body.todo.title , "description" : req.body.todo.description});
    idDoc = ins.insertedId + 1;
    console.log("inserted id " + ins.insertedId);
});

app.put('/todo/:id',async function(req,res){
    const itemId = parseInt(req.params.id);
    // console.log(req.body);
    const updateDetails = await client.db('todoslist').collection('todos').updateOne({"_id" : itemId},{$set :{"title" : req.body.todo.title , "description" : req.body.todo.description}},{upsert:true});
    // console.log(updateDetails.matchedCount);
    // console.log("updated count",updateDetails.matchedCount);
    res.sendStatus(200);
});

app.delete('/removeTodo/:id',async function(req,res){
    const itemId = parseInt(req.params.id);
    const result = await client.db("todoslist").collection("todos").deleteOne({"_id":itemId});
    // console.log(result.deletedCount);
    res.sendStatus(200);
});

app.listen(3000,async function(){
    console.log("Server is running on port 3000");
    try{
        await client.connect();
        console.log("connected");
    }
    catch(err){
      console.log(err);
    }
});