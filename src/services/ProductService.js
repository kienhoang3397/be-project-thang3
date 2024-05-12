const Product = require("../models/ProductModel");
const ProductType = require("../models/ProductTypeModel");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const createProduct = async (newProduct) => {
    try {
        const { name, image, types, countInStock, price, rating, description, discount, sold ,brand} = newProduct;

        const discountStartDate = newProduct.discountStartDate && discount ? newProduct.discountStartDate : null;
        const discountEndDate = newProduct.discountEndDate && discount ? newProduct.discountEndDate : null;

        const checkProduct = await Product.findOne({ name: name });
        if (checkProduct !== null) {
            return {
                status: 'ERR',
                message: 'The name of product is already'
            };
        }

        const createdProduct = await Product.create({
            name,
            image,
            types,
            brand,
            countInStock: Number(countInStock),
            discount,
            price,
            rating,
            description,
            sold,
            discountStartDate,
            discountEndDate
        });

        return {
            status: 'OK',
            message: 'SUCCESS',
            data: createdProduct
        };
    } catch (e) {
        console.log('Error:', e);
        throw e;
    }
};

const updateProduct = async (id, data) => {
    try {
        const checkProduct = await Product.findOne({ _id: id });
        if (checkProduct === null) {
            return {
                status: 'ERR',
                message: 'The product is not defined'
            };
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });
        return {
            status: 'OK',
            message: 'SUCCESS',
            data: updatedProduct
        };
    } catch (e) {
        throw e;
    }
};

const deleteProduct = async (id) => {
    try {
        const checkProduct = await Product.findOne({ _id: id });
        if (checkProduct === null) {
            return {
                status: 'ERR',
                message: 'The product is not defined'
            };
        }

        await Product.findByIdAndDelete(id);
        return {
            status: 'OK',
            message: 'Delete product success',
        };
    } catch (e) {
        throw e;
    }
};

const deleteManyProduct = async (ids) => {
    try {
        await Product.deleteMany({ _id: ids });
        return {
            status: 'OK',
            message: 'Delete product success',
        };
    } catch (e) {
        throw e;
    }
};

const getDetailsProduct = async (id) => {
    try {
        const product = await Product.findOne({ _id: id });
        if (product === null) {
            return {
                status: 'ERR',
                message: 'The product is not defined'
            };
        }

        return {
            status: 'OK',
            message: 'SUCCESS',
            data: product
        };
    } catch (e) {
        throw e;
    }
};



const getAllProduct = async (page, limit, search, sort, types, minPrice, maxPrice, brand) => {
    const pageNumber = parseInt(page) >= 1 ? parseInt(page) - 1 : 0;
    const pageSize = parseInt(limit) || 5;
    const searchTerm = search || "";
    let sortBy = sort || "rating";

    sortBy = sortBy.split(",")[1] ? sortBy.split(",") : [sortBy];
    let sortQuery = {};

    // Check if sorting by price and adjust the sort order
    if (sortBy[0] === "price") {
        sortQuery[sortBy[0]] = sortBy[1] === "asc" ? 1 : -1;
    } else {
        sortQuery[sortBy[0]] = sortBy[1] || "asc";
    }

    const query = {
        name: { $regex: searchTerm, $options: "i" }
    };

    if (types) {
        const typesArray = types.split(","); // Split types string into an array of type IDs
        query.types = { $all: typesArray }; // Use $all operator to match products that belong to all specified types
    }

    // Add brand filter to the query
    if (brand) {
        const brandArray = brand.split(","); // Chia chuỗi brand thành một mảng các ID thương hiệu
        query.brand = { $in: brandArray }; // Sử dụng $in operator để tìm các sản phẩm thuộc ít nhất một trong các thương hiệu được chỉ định
    }




    // Add price range filter to the query
    if (minPrice !== undefined && maxPrice !== undefined) {
        query.price = { $gte: parseFloat(minPrice), $lte: parseFloat(maxPrice) };
    } else if (minPrice !== undefined) {
        query.price = { $gte: parseFloat(minPrice) };
    } else if (maxPrice !== undefined) {
        query.price = { $lte: parseFloat(maxPrice) };
    }

    try {
        // Populate types field with data from ProductType collection
        const products = await Product.find(query)
            .sort(sortQuery)
            .skip(pageNumber * pageSize)
            .limit(pageSize)
            .populate('types');

        const total = await Product.countDocuments(query);

        return {
            error: false,
            total,
            page: pageNumber + 1,
            limit: pageSize,
            products,
        };
    } catch (error) {
        return {
            error: true,
            message: error.message
        };
    }
};














const getAllType = async () => {
    try {
        const allType = await Product.distinct('type');
        return {
            status: 'OK',
            message: 'Success',
            data: allType,
        };
    } catch (e) {
        throw e;
    }
};

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    deleteManyProduct,
    getAllType
};
