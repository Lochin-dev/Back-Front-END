const express = require('express')
const { getUsers, createUsers } = require('../controller/users')
const { userValidate } = require('../middleware/user.mid')

const router = express.Router()

router
    .route('/user',)
    .get(getUsers)

router.post('/user', userValidate, createUsers)

// router
//     .route('/user/:id')
//     .delete(deleteUsers)
//     .put(updateUsers)

// router
//     .route('/api_company/:id')
//     .get(apiCompanys)

module.exports = router 