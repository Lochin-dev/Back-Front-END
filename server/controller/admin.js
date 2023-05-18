const pool = require('../db/config')
const jwt = require("jsonwebtoken")

const getAdmin = async (req, res) => {
    try {
        let adminList = await pool.query(`SELECT * FROM admin `);
        res.status(200).json(adminList.rows);
    } catch (err) {
        console.log(err);
    }
}

const postAdmin = async (req, res) => {
    let { admin_name, admin_email, admin_password } = req.body;
    let adminList = await pool.query
        (`SELECT * FROM admin WHERE admin_name = $1 AND admin_email = $2 AND admin_password = $3`,
            [admin_name, admin_email, admin_password])
    console.log(adminList.rowCount);
    let token = await jwt.sign({ admin_password }, process.env.SECRET_KEY, {
        expiresIn: "1d"
    })

    if (adminList.rowCount === 1) return res.status(201).send(JSON.stringify({
        msg: "User information is true", token
    }))

    res.status(400).send({
        msg: "User information is false"
    })
}

module.exports = { getAdmin, postAdmin }