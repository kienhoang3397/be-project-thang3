const mongoose = require("mongoose");

const productTypeSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true},
        image: { type: String, unique: true },
    },
    {
        timestamps: true,
    }
);
const ProductType = mongoose.model(
    "ProductType",
    productTypeSchema
);

module.exports = ProductType;
