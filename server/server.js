const express = require('express')
const dotenv = require('dotenv')
const cors = require("cors")

dotenv.config()
const port = process.env.PORT || 2020

const adminRout = require("./router/admin.rout")
const userRout = require("./router/users.rout")
const companyRout = require('./router/companys.rout')
const complexRout = require('./router/complexs.rout')
const homeRout = require('./router/homes.rout')
const shoppingRout = require('./router/shoppings.rout')
const bankRout = require('./router/banks.rout')
const yearRout = require('./router/years.rout')
const app = express()
app.use(cors())
app.use(express.json())

app.use(adminRout)
app.use(userRout)
app.use(companyRout)
app.use(complexRout)
app.use(homeRout)
app.use(shoppingRout)
app.use(bankRout)
app.use(yearRout)

app.listen(port, () => {
    console.log(`IS RENNING ${port} PORT...`);
})

