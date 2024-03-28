
const ProductType = require("../models/ProductTypeModel")

const createProductType = (newProductType) => {
    return new Promise(async (resolve, reject) => {
        const { name, } = newProductType
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
module.exports = {
    createProductType
}