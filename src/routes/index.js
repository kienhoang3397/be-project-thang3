const UserRouter = require('./UserRouter')
const ProductRouter = require('./ProductRouter')
const ProductTypeRouter = require('./ProductTypeRouter')


const routes = (app) => {
    app.use('/api/user', UserRouter)
    app.use('/api/product', ProductRouter)
    app.use('/api/product-type', ProductTypeRouter)
}

module.exports = routes