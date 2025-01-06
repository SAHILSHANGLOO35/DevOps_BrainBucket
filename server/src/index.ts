import express, { Request, Response } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";
import { ContentModel, UserModel, TagsModel, LinkModel } from "../src/db";
import { userMiddleware } from "../src/middleware";
import { random } from "./utils";
import cors from "cors";
import path from "path";
import multer from "multer";
import { z } from "zod";

const app = express();
app.use(express.json());
app.use(cors());

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Multer configuration for handling PDF uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Directory for uploaded PDFs
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    },
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== ".pdf") {
            return cb(Error("Only PDFs are allowed"))
        }
        cb(null, true);
    },
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit size to 5MB
    },
});

interface AuthenticatedRequest extends Request {
    userId?: string;
    body: {
        title: string;
        link: string;
        type: string;
    };
}

const signupSchema = z.object({
    username: z
      .string()
      .min(4, "Username must be at least 4 characters")
      .max(50, "Username cannot exceed 50 characters"),
    email: z
      .string()
      .email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  });
  
  //@ts-ignore
  app.post("/api/v1/signup", async (req, res) => {
      try {
          const result = signupSchema.safeParse(req.body);
          
          if (!result.success) {
              return res.status(400).json({
                  message: "Validation failed",
                  errors: result.error.errors
              });
          }
  
          const { username, email, password } = result.data;
  
          const existingUser = await UserModel.findOne({ email });
  
          if (existingUser) {
              return res.status(403).json({
                  message: "User already exists!",
              });
          }
  
          const hashedPassword = await bcrypt.hash(password, 10);
  
          const newUser = await UserModel.create({
              username,
              email,
              password: hashedPassword,
          });
  
          res.status(200).json({
              message: "User created successfully",
              user: newUser,
          });
      } catch (error) {
          console.error("Error creating user:", error);
          res.status(500).json({
              message: "Internal server error",
          });
      }
  });

  const signinSchema = z.object({
    email: z
        .string()
        .email("Invalid email format"),
    password: z
        .string()
        .min(1, "Password is required")
});

// @ts-ignore
app.post("/api/v1/signin", async (req, res) => {
    try {
        const result = signinSchema.safeParse(req.body);
        
        if (!result.success) {
            return res.status(400).send({
                message: "Validation failed",
                errors: result.error.errors
            });
        }

        const { email, password } = result.data;

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
                process.env.JWT_USER_SECRET as string
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
            const type = req.body.type;

            await ContentModel.create({
                title,
                link,
                type,
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
app.post("/api/v1/upload-pdf", userMiddleware, upload.single("pdf"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ message: "No file uploaded" });
        }

        const { title } = req.body;
        const { type } = req.body;
        const pdfPath = `/uploads/${req.file.filename}`;

        const newContent = await ContentModel.create({
            title: title || "My PDF",
            pdfPath: pdfPath,
            type: "pdf",
            // @ts-ignore
            userId: req.userId,
        });

        res.status(200).send({
            message: "PDF uploaded successfully",
            content: newContent,
        });
    } catch (error) {
        console.error("Error uploading PDF:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

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
app.delete("/api/v1/content/:contentId", userMiddleware, async (req, res) => {
    try {
        const contentId = req.params.contentId;
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

        const deleteContent = await ContentModel.deleteOne({
            _id: contentId,
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