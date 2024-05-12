const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const CategoryRouter = require('./ProductTypeRouter')
const BrandRouter = require('./BrandRouter')


const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/product', ProductRouter)
    app.use('/api/categories', CategoryRouter)
    app.use('/api/brand', BrandRouter)
}

module.exports = routes