const express = require('express')
const { shopping } = require('../controller/shoppings')

const router = express.Router()

router
    .route('/shopping/:id')
    .get(shopping)

module.exports = router 