const express= require("express");
const mongoose=require("mongoose");

const productRouter= require("./routes/productRoutes");
const cors = require("cors");

const app = express();

app.use(cors(
  {origin:"*"}
))

const mongoDbUrl="mongodb+srv://arnab:dasarnab@cluster0.maltqyb.mongodb.net/shopping_site?retryWrites=true&w=majority";

mongoose.connect(mongoDbUrl, {});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Mongodb connection error: "));
db.once("open", ()=>{
  console.log("Connected to Mongodb!");

});

// app.get("/", (req,res,next)=>{
//   res.send("hi welcome from arnab das");
//   //npm run dev
//   //ctrl+c to stop server
//   //http://localhost:4000/
// });
app.use(express.json()); //as we using json so we write this
app.use(productRouter);  //linking to index.js

app.listen(4000, "0.0.0.0",()=> {
console.log("server started at port 4000");
});