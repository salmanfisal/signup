require("dotenv").config()
const express = require("express")
const bodyparser = require("body-parser")
const ejs = require("ejs")
const mongoose= require("mongoose")
const encrypt = require("mongoose-encryption")
const app = express()
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.static("public"))
app.set("view engine", 'ejs')
mongoose.connect("mongodb://localhost:27017/register", { useNewUrlParser: true })
data = new mongoose.Schema({
    email: String,
    password: String
})
data.plugin(encrypt,{secret:process.env.SECRET,encryptedFields:["password"]})
const salman = mongoose.model("signups", data)

app.get("/", function (req, res) {
    res.render("home")
});
app.get("/login", function (req, res) {
    res.render("login")
});
app.get("/register", function (req, res) {
    res.render("register")
});
app.post("/register", function (req, res) {
    newuser = new salman({
        email: req.body.username,
        password: req.body.password
    });
    newuser.save(function (err) {
        if (err) {
            console.log(err)
        }
    })
    res.render("secrets")
});
app.post("/login", function (req, res) {
    names = req.body.username,
        text = req.body.password
    salman.findOne({ email: names }, function (err, find) {
        if (err) {
            console.log(err)
        } else {
            if(find){
            if (find.password === text) {
                res.render("secrets")
            } else {
                res.send("incorrect password")
            }
        }
        else{
            res.send("invalid email id")
        }
        }
    })
})
app.listen(3000, function (req, res) {
    console.log("listening on port 3000")
})