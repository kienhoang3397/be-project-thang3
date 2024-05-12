
const ProductType = require("../models/ProductTypeModel")

const createProductType = (newProductType) => {
    return new Promise(async (resolve, reject) => {
        const { name, image } = newProductType
        try {
            const checkProduct = await ProductType.findOne({
                name: name
            })
            if (checkProduct !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The name of productType is already'
                })
            }
            const newProductType = await ProductType.create({
                name,
                image
                
              
            })
            if (newProductType) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newProductType
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
const getAllProductTypes = async (limit, page) => {
    try {
        const totalProductTypes = await ProductType.countDocuments();
        const productTypes = await ProductType.find()
            .limit(limit)
            .skip(page * limit);

        return {
            status: 'OK',
            message: 'Success',
            data: productTypes,
            total: totalProductTypes,
            pageCurrent: Number(page + 1),
            totalPage: Math.ceil(totalProductTypes / limit)
        };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createProductType
    , getAllProductTypes
}