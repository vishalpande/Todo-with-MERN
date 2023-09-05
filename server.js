const express=require('express')
const {MongoClient}=require('mongodb')
var {ObjectId }= require('mongodb');

const app = express();
const todoRoutes=express.Router();
app.use(express.json())
app.use('/todos',todoRoutes);


//Mongo COnfiguration
const url='mongodb://127.0.0.1:27017/'
const client = new MongoClient(url);
let db;


//routes 

// add routes
todoRoutes.route('/add').post(async(req, res) => {
 await db.collection('todos').insertOne(req.body)
res.send(req.body);

})

//get the data
todoRoutes.route('/').get(async(req,res) => {

  let data=await db.collection('todos').find({}).toArray();

res.send(data);
})

//get the specific data

todoRoutes.route('/:id').get(async(req, res) => {
   
let id=new ObjectId(req.params.id);
let data=await db.collection('todos').find({_id: id}).toArray();
res.send(data);

})





async function connectDb(){
// connecting the mongodb

 await client.connect();
db=client.db('todoApp');
console.log('connect to mongo succeessful')

app.listen(4000,()=>{
console.log('listening on port no 4000')


})

}


connectDb().then(console.log).catch(console.error);