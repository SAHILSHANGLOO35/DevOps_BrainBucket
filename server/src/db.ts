import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const contentSchema = new mongoose.Schema({
    title: {
        type: String
    },
    link: {
        type: String
    },
    tags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tags'
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const tagsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
})

const linkSchema = new mongoose.Schema({
    hash: String,
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    }
})

export const UserModel = mongoose.model("User", userSchema);
export const ContentModel = mongoose.model("Content", contentSchema);
export const TagsModel = mongoose.model("Tag", tagsSchema);
export const LinkModel = mongoose.model("Link", linkSchema);
