
const Brand = require("../models/BrandModel")

const createBrand = (newBrand) => {
    return new Promise(async (resolve, reject) => {
        const { name, image } = newBrand
        try {
            const checkProduct = await Brand.findOne({
                name: name
            })
            if (checkProduct !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The name of Brand is already'
                })
            }
            const newBrand = await Brand.create({
                name,
                image


            })
            if (newBrand) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newBrand
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
const getAllBrands = async (limit, page) => {
    try {
        const totalBrands = await Brand.countDocuments();
        const Brands = await Brand.find()
            .limit(limit)
            .skip(page * limit);

        return {
            status: 'OK',
            message: 'Success',
            data: Brands,
            total: totalBrands,
            pageCurrent: Number(page + 1),
            totalPage: Math.ceil(totalBrands / limit)
        };
    } catch (error) {
        throw error;
    }
};

module.exports = {
    createBrand
    , getAllBrands
}