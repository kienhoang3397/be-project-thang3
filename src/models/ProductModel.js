const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        type: { type: String, required: true },
        price: { type: Number, required: true },
        discount: { type: Number },
        discountStartDate: { type: Date },
        discountEndDate: { type: Date },
        countInStock: { type: Number, required: true },
        rating: { type: Number, required: true },
        type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProductType",
            required: true,
        },
        description: { type: String },
        discount: { type: Number },
        sell: { type: Number }
    },
    {
        collection: 'Product',
        timestamps: true,
    }
);
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
