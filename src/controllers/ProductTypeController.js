const ProductTypeService = require('../services/ProductTypeService');
const { validateRequiredInput } = require('../utils');
const { CONFIG_MESSAGE_ERRORS } = require("../configs");

const createProductType = async (req, res) => {
    try {
        const requiredFields = validateRequiredInput(req.body, ["name", "image"]);

        if (requiredFields?.length) {
            return res.status(CONFIG_MESSAGE_ERRORS.INVALID.status).json({
                status: "Error",
                typeError: CONFIG_MESSAGE_ERRORS.INVALID.type,
                message: `The field ${requiredFields.join(", ")} is required`,
                data: null,
            });
        }
        const response = await ProductTypeService.createProductType(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getAllCategories = async (req, res) => {
    try {
        const categories = await ProductTypeService.getAllProductTypes();
        return res.status(200).json({
            status: "Success",
            message: "Categories retrieved successfully",
            data: categories,
        });
    } catch (error) {
        return res.status(CONFIG_MESSAGE_ERRORS.NOT_FOUND.status).json({
            status: "Error",
            typeError: CONFIG_MESSAGE_ERRORS.NOT_FOUND.type,
            message: error.message || "An error occurred while fetching categories",
            data: null,
        });
    }
}



module.exports = {
    createProductType,
    getAllCategories
}
