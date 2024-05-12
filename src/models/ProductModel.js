const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number },
    discountStartDate: { type: Date },
    discountEndDate: { type: Date },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    types: [{ type: mongoose.Schema.Types.ObjectId, ref: "ProductType", required: true }],
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    totalLikes: { type: Number, default: 0 },
    views: { type: Number, default: 0 },
    description: { type: String },
    sold: { type: Number }
}, {
    collection: 'Product',
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
