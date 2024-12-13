import express, { Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";
import { ContentModel, UserModel, TagsModel, LinkModel } from "../src/db";
import { userMiddleware } from "../src/middleware";
import { random } from "./utils";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

interface AuthenticatedRequest extends Request {
    userId?: string;
    body: {
        title: string;
        link: string;
    };
}

//@ts-ignore
app.post("/api/v1/signup", async (req, res) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(403).send({
                message: "User already exists!",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            username,
            email,
            password: hashedPassword,
        });

        res.status(200).send({
            message: "User created successfully",
            user: newUser,
        });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).send({
            message: "Internal server error",
        });
    }
});

app.post("/api/v1/signin", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await UserModel.findOne({ email });

        if (!user) {
            res.status(404).send({
                message: "User not found",
            });
            return;
        }

        const matchPassword = await bcrypt.compare(
            password,
            user.password as string
        );

        if (matchPassword) {
            const token = jwt.sign(
                { id: user._id },
                process.env.JWT_USER_SECRET as string // Force it to be treated as a string
            );

            res.status(200).send({
                token: token,
            });
        } else {
            res.status(403).send({
                message: "Incorrect credentials!",
            });
        }
    } catch (error) {
        res.status(404).send({
            message: "Internal server error",
        });
    }
});

// @ts-ignore
app.post("/api/v1/content", userMiddleware, async (req: AuthenticatedRequest, res) => {
        try {
            const title = req.body.title;
            const link = req.body.link;

            await ContentModel.create({
                title,
                link,
                userId: req.userId,
                tags: [],
            });
            res.status(200).send({
                message: "Content added successfully!",
            });
        } catch (error) {
            res.status(403).send({
                message: "Internal server error",
            });
        }
    }
);

// @ts-ignore
app.get("/api/v1/content", userMiddleware, async (req, res) => {
    try {
        // @ts-ignore
        const userId = req.userId;

        const content = await ContentModel.find({ userId }).populate(
            "userId",
            "username"
        );

        res.send({
            content,
        });
    } catch (error) {
        res.status(403).send({
            messaage: "Internal server error",
        });
    }
});

// @ts-ignore
app.delete("/api/v1/content", userMiddleware, async (req, res) => {
    try {
        const contentId = req.body.contentId;
        // @ts-ignore
        const userId = req.userId;

        const content = await ContentModel.findOne({
            _id: contentId,
        });

        if (!content) {
            return res
                .status(404)
                .send({ message: "No content found to delete" });
        }

        const deleteContent = await ContentModel.deleteMany({
            contentId,
            userId,
        });

        res.status(200).send({
            message: "Content deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(403).send({
            message: "Internal server error",
        });
    }
});

// @ts-ignore
app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
    const share = req.body.share;

    if (share) {
        const existingLink = await LinkModel.findOne({
            // @ts-ignore
            userId: req.userId
        })

        if(existingLink) {
            res.send({
                hash: existingLink.hash
            })
            return;
        }

        const hash = random(10);
        
        await LinkModel.create({
            // @ts-ignore
            userId: req.userId,
            hash: hash,
        });
        res.send({
            hash: hash
        });
    } else {
        await LinkModel.deleteOne({
            // @ts-ignore
            userId: req.userId,
        });
    }
    res.send({
        message: "Removed link",
    });
});

// @ts-ignore
app.get("/api/v1/brain/:shareLink", async (req, res) => {
    try {
        const hash = req.params.shareLink;

        const link = await LinkModel.findOne({
            hash: hash,
        });

        if (!link) {
            res.status(403).send({
                message: "Sorry incorrect input",
            });
            return;
        }
        // early return
        const content = await ContentModel.find({
            userId: link.userId,
        });

        const user = await UserModel.findOne({
            _id: link.userId,
        });

        res.status(200).send({
            username: user?.username,
            content: content,
        });
    } catch (error) {
        res.status(403).send({
            message: "Internal server error",
        });
    }
});

async function main() {
    await mongoose.connect(process.env.MONGODB_URI as string);
    app.listen(process.env.PORT, () => {
        console.log("SERVER STARTED ON PORT", process.env.PORT);
    });
}

main();
