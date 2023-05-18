const express = require('express')
const { getYears, createYears, updateYears, deleteYears, getOne } = require('../controller/years')
const { yearValidate } = require('../middleware/year.mid')

const router = express.Router()

router
    .route('/year')
    .get(getYears)

router.post('/year', yearValidate, createYears)

router
    .route('/year/:id')
    .delete(deleteYears)
    .put(updateYears)


router
    .route('/year/:id')
    .get(getOne)

module.exports = router