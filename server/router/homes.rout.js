const express = require('express')
const { getHomes, createHomes, updateHomes, deleteHomes, apiHomes, getOne } = require('../controller/homes')
const { homeValidate } = require('../middleware/home.mid')

const router = express.Router()
router
    .route('/home')
    .get(getHomes)

router.post('/home', homeValidate, createHomes)

router.put('/home/:id', homeValidate, updateHomes)

router
    .route('/home/:id')
    .delete(deleteHomes)

router
    .route('/home/:id')
    .get(getOne)

router
    .route('/api_home/:id')
    .get(apiHomes)

module.exports = router 