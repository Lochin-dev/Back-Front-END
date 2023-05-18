const express = require('express')
const { getCompanys, createCompanys, updateCompanys, deleteCompanys, apiCompanys, getCompanysOne, apiBank, getOne } = require('../controller/companys')
const { companyValidate } = require('../middleware/company.mid')

const router = express.Router()

router
    .route('/company')
    .get(getCompanys)

router.post('/company', companyValidate, createCompanys)

router.get('/companyOne', getCompanysOne)

router
    .route('/company/:id')
    .delete(deleteCompanys)
    .put(updateCompanys)

router
    .route('/api_company/:id')
    .get(apiCompanys)

router
    .route('/api_bank/:id')
    .get(apiBank)

router
    .route('/company/:id')
    .get(getOne)

module.exports = router 