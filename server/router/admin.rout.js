const express = require('express')
const { getAdmin, postAdmin } = require('../controller/admin')


const router = express.Router()

router
    .route('/admin')
    .get(getAdmin)

router
    .route('/postadmin')
    .post(postAdmin)

module.exports = router 