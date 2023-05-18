const express = require('express')
const { getComplexs, createComplexs, updateComplexs, deleteComplexs, apiComplexs, getOne } = require('../controller/complexs')
const { complexValidate } = require('../middleware/complex.mid')

const router = express.Router()

router
    .route('/complex')
    .get(getComplexs)

router.post('/complex', complexValidate, createComplexs)


router
    .route('/complex/:id')
    .delete(deleteComplexs)
    .put(updateComplexs)

router
    .route('/api_complex/:id')
    .get(apiComplexs)

router
    .route('/complex/:id')
    .get(getOne)

module.exports = router 