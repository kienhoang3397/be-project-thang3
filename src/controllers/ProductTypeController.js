const ProductTypeService = require('../services/ProductTypeService');
const { validateRequiredInput } = require('../utils');
const { CONFIG_MESSAGE_ERRORS } = require("../configs");

const createProductType = async (req, res) => {
    try {
        const requiredFields = validateRequiredInput(req.body, ["name"]);

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



module.exports = {
    createProductType
}
