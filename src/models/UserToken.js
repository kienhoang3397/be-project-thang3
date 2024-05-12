const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    },
    {
        token: { type: String, required: true, unique: true },
    },
    {
        createAt: { type: Date, default: Date.now() },
    }
);
const UserToken = mongoose.model(
    "Token",
    TokenSchema
);

module.exports = UserToken;
