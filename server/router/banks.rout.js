const express = require('express')
const { getBanks, createBanks, updateBanks, deleteBanks, getOne } = require('../controller/banks')
const { bankValidate } = require('../middleware/bank.mid')

const router = express.Router()

router
    .route('/bank')
    .get(getBanks)

router.post('/bank', bankValidate, createBanks)

router
    .route('/bank/:id')
    .delete(deleteBanks)
    .put(updateBanks)

// router
//     .route('/api_bank/:id')
//     .get(apiBanks)

router
    .route('/bank/:id')
    .get(getOne)

module.exports = router 