const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, unique: true },
    },
    {
        timestamps: true,
    }
);
const Brand = mongoose.model(
    "Brand",
    BrandSchema
);

module.exports = Brand;
