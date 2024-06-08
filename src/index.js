
const express = require('express')


const app = express()
const path = require('path')
const hbs = require('hbs')
const collection = require('./mongodb')


const templatePath = path.join(__dirname,'../templates')

app.use(express.json())
app.set('view engine','hbs')
app.set('views',templatePath)
app.use(express.urlencoded({extended:false}))


app.get("/signup",(req,res)=>{
    res.render("signup")
})

app.post('/signup', async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.name });
        
        if (check) {
            return res.render("signup", { error: "Username taken" });
        }
        
        const data = {
            name: req.body.name,
            password: req.body.password
        };
        await collection.insertMany([data]);  // Use insertOne for a single document
  
        res.render('login',{ success: "Account created successfully. Please log in." });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).send("Internal Server Error");
    }
});


app.post('/login',async(req,res)=>{
    try{
        const check = await collection.findOne({name:req.body.name})

         if(check.password === req.body.password){
            res.render("home", { name: req.body.name });
        }
    }
        catch{
            return res.render("login", { error: "Wrong details" });
        }
})

app.listen(3000, ()=>{
    console.log("Port connected");
})


const handler = ServerlessHttp(app);

module.exports.handler = async(event, context)=>{
    const result = await handler(event,context);
    return result;
}