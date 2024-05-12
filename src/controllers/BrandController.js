const BrandService = require('../services/BrandService');
const { validateRequiredInput } = require('../utils');
const { CONFIG_MESSAGE_ERRORS } = require("../configs");

const createBrand = async (req, res) => {
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
        const response = await BrandService.createBrand(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getAllBrand = async (req, res) => {
    try {
        const Brand = await BrandService.getAllBrands();
        return res.status(200).json({
            status: "Success",
            message: "Brand retrieved successfully",
            data: Brand,
        });
    } catch (error) {
        return res.status(CONFIG_MESSAGE_ERRORS.NOT_FOUND.status).json({
            status: "Error",
            typeError: CONFIG_MESSAGE_ERRORS.NOT_FOUND.type,
            message: error.message || "An error occurred while fetching Brand",
            data: null,
        });
    }
}



module.exports = {
    createBrand,
    getAllBrand
}
