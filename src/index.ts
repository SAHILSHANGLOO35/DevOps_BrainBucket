import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const PORT = 3000;
import { UserModel } from "../src/db";

const app = express();

app.post("/api/v1/signup", (req, res) => {
    
})

app.post("/api/v1/signin", (req, res) => {

})

app.post("/api/v1/content", (req, res) => {

})

app.get("/api/v1/content", (req, res) => {

})

app.delete("/api/v1/content", (req, res) => {

})

app.post("/api/v1/brain/share", (req, res) => {

})

app.get("/api/v1/brain/:shareLink", (req, res) => {

})

async function main() {
    await mongoose.connect('mongodb+srv://sahilshangloo35:root@cluster0.ulniw.mongodb.net/SecondBrain')
    app.listen(PORT, () => {
        console.log("SERVER STARTED ON PORT", PORT);  
    })
}

main();