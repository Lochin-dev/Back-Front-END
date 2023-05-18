const pool = require('../db/config')
const bcrypt = require("bcryptjs")
const uuid = require("uuid")
const jwt = require("jsonwebtoken")

const getUsers = async (req, res) => {
    try {
        let userList = await pool.query(`SELECT * FROM users`);
        res.status(200).json(userList.rows);
    } catch (err) {
        console.log(err);
    }
}


const createUsers = async (req, res) => {
    const { user_name, user_email, user_password } = req.body

    let userList = await pool.query
        (`SELECT * FROM users WHERE user_name = $1 AND user_email = $2`, [user_name, user_email])

    if (userList.rowCount >= 1) return res.status(400).send(JSON.stringify({
        msg: "User oldin registratsiyadan o'tgan!!"
    }))

    let hashPas = await bcrypt.hash(user_password, 12)
    let userCreate = await pool.query(`
    INSERT INTO users(user_name, user_email,  user_password)VALUES ($1, $2, $3)`,
        [user_name, user_email, hashPas]);

    let token = await jwt.sign({ user_password }, process.env.SECRET_KEY, {
        expiresIn: "1d"
    })

    res.status(201).send({
        msg: "User registrated", token
    })
}


// const updateUsers = async (req, res) => {
//     const { id } = req.params;
//     let { user_name, user_email, user_password } = req.body

//     let foundedEmail = await pool.query(` SELECT * FROM users WHERE user_id = $1`, [id]);
//     if (foundedEmail.rowCount === 0) return res.status(404).json({ msg: 'User not found!' });
//     let {
//         user_name: name,
//         user_email: email,
//         user_password: password
//     } = foundedEmail.rows[0];

//     user_name = user_name ? user_name : name;
//     user_email = user_email ? user_email : email;
//     user_password = user_password ? user_password : password;

//     let updatedUser = await pool.query(` 
//         UPDATE users SET 
//         user_name = $1,
//         user_email = $2,
//         user_password = $3
//         WHERE id = $4;
//     `, [user_name, user_email, user_password, id]);

//     res.status(200).json({
//         msg: 'User Updated!'
//     });

// }

// const deleteUsers = async (req, res) => {
//     const { id } = req.params;
//     let foundedEmail = await pool.query(` DELETE FROM users WHERE id = $1`, [id]);
//     if (foundedEmail.rowCount === 0) return res.status(404).json({ msg: 'Users not found!' });
//     res.status(200).json({
//         msg: 'User deleted!'
//     });
// }

module.exports = { getUsers, createUsers }