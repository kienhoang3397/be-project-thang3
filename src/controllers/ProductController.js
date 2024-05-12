const ProductService = require('../services/ProductService');
const { validateRequiredInput, validateDiscountDate } = require('../utils');

const createProduct = async (req, res) => {
    try {
        const requiredFields = validateRequiredInput(req.body, ["name", "image", "price", "countInStock", "types","brand" ]);
        const discountValidation = validateDiscountDate(
            req.body.discount,
            new Date(req.body.discountStartDate),
            new Date(req.body.discountEndDate)
        );
        if (requiredFields?.length) {
            return res.status(400).json({
                status: "Error",
                message: `The field ${requiredFields.join(", ")} is required`,
                data: null,
            });
        } else if (!discountValidation.isValid) {
            return res.status(400).json({
                status: "Error",
                message: discountValidation.error,
                data: null,
            })
        }
        const response = await ProductService.createProduct(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(500).json({
            message: "Internal Server Error",
            data: null,
            status: "Error",
        });
    }
}

const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const data = req.body;
        if (!productId) {
            return res.status(400).json({
                status: 'Error',
                message: 'The productId is required',
                data: null
            });
        }
        const response = await ProductService.updateProduct(productId, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: "Internal Server Error",
            data: null,
            status: "Error"
        });
    }
};

const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json({
                status: 'Error',
                message: 'The productId is required',
                data: null
            });
        }
        const response = await ProductService.getDetailsProduct(productId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: "Internal Server Error",
            data: null,
            status: "Error"
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(400).json({
                status: 'Error',
                message: 'The productId is required',
                data: null
            });
        }
        const response = await ProductService.deleteProduct(productId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: "Internal Server Error",
            data: null,
            status: "Error"
        });
    }
};

const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids;
        if (!ids) {
            return res.status(400).json({
                status: 'Error',
                message: 'The ids is required',
                data: null
            });
        }
        const response = await ProductService.deleteManyProduct(ids);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: "Internal Server Error",
            data: null,
            status: "Error"
        });
    }
};

const getAllProduct = async (req, res) => {
    try {
        const { page, limit, search, sort, types, minPrice, maxPrice, brand } = req.query;
        const response = await ProductService.getAllProduct(page, limit, search, sort, types, minPrice, maxPrice, brand);
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
};

const getAllType = async (req, res) => {
    try {
        const response = await ProductService.getAllType();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: "Internal Server Error",
            data: null,
            status: "Error"
        });
    }
};

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    deleteMany,
    getAllType
};
