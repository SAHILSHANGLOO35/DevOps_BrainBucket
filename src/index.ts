import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";
import { UserModel } from "./db";

const app = express();
app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
    try {
        const userName = req.body.userName;
        const email = req.body.email;
        const password = req.body.password;

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await UserModel.findOne({ email })

        if(user) {
            res.status(403).send({
                message: "User already exists!"
            })
        } else {
            const user = await UserModel.create({
                userName,
                email,
                password: hashedPassword,
            });
    
            res.status(200).send({
                message: "User created successfully",
                user: user,
            });
        }
        
    } catch (error) {
        res.status(404).send({
            message: "Error creating user"
        });
    }
});

app.post("/api/v1/signin", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await UserModel.findOne({ email });

        if(!user) {
            res.status(404).send({
                message: "User not found"
            });
            return
        }
        
        const matchPassword = await bcrypt.compare(password, user.password as string);

        if(matchPassword) {
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_USER_SECRET as string // Force it to be treated as a string
            );
        
            res.status(200).send({
                token: token,
            });
        }

    } catch (error) {
        res.status(404).send({
            message: "Incorrect credentials"
        })
    }
});

app.post("/api/v1/content", (req, res) => {});

app.get("/api/v1/content", (req, res) => {});

app.delete("/api/v1/content", (req, res) => {});

app.post("/api/v1/brain/share", (req, res) => {});

app.get("/api/v1/brain/:shareLink", (req, res) => {});

async function main() {
    await mongoose.connect(
        process.env.MONGODB_URI as string
    );
    app.listen(process.env.PORT, () => {
        console.log("SERVER STARTED ON PORT", process.env.PORT);
    });
}

main();
