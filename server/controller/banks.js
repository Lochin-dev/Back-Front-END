const pool = require('../db/config')

const getBanks = async (req, res) => {
    try {
        let bankList = await pool.query(`SELECT * FROM banks;`);
        res.status(200).json(bankList.rows);
    } catch (err) {
        console.log(err);
    }
}

const getOne = async (req, res) => {
    const { id } = req.params;
    let foundedBank = await pool.query(`SELECT * FROM banks WHERE id = $1`, [id]);
    if (foundedBank.rowCount === 0) return res.status(404).json({ msg: 'Banks not found!' });
    res.status(200).json(foundedBank.rows);
}

// const apiBanks = async (req, res) => {
//     const { id } = req.params;
//     let foundedBank = await pool.query(`SELECT y.id, y.year_num FROM banks h JOIN years y ON h.id = y.bank_id WHERE 
//     h.id = $1`, [id]);
//     if (foundedBank.rows == [] || foundedBank.rows.length === 0) return res.status(404).json({ msg: 'Complex not found!' });
//     res.status(200).json(foundedBank.rows);
// }

const createBanks = async (req, res) => {
    const { bank_title, bank_price, company_id } = req.body
    let bankCreate = await pool.query(`
    INSERT INTO banks( bank_title, bank_price, company_id)VALUES ($1, $2, $3)`,
        [bank_title, bank_price, company_id]);
    res.status(201).json({
        msg: 'Created!'
    })
}

const updateBanks = async (req, res) => {
    const { id } = req.params;
    let { bank_title, bank_price, company_id } = req.body
    let foundedBank = await pool.query(` SELECT * FROM banks WHERE id = $1`, [id]);
    if (foundedBank.rowCount === 0) return res.status(404).json({ msg: 'Bank not found!' });
    let {
        bank_title: title,
        bank_price: price,
        company_id: c_id,
    } = foundedBank.rows[0];

    bank_title = bank_title ? bank_title : title;
    bank_price = bank_price ? bank_price : price;
    company_id = company_id ? company_id : c_id;

    let updatedBank = await pool.query(` 
        UPDATE banks SET 
        bank_title=$1,
        bank_price=$2
        WHERE id = $3;
    `, [bank_title, bank_price, id]);

    res.status(200).json({
        msg: 'Bank Updated!'
    });
}

const deleteBanks = async (req, res) => {
    const { id } = req.params;
    let foundedEmail = await pool.query(` DELETE FROM banks WHERE id = $1`, [id]);
    if (foundedEmail.rowCount === 0) return res.status(404).json({ msg: 'Banks not found!' });
    res.status(200).json({
        msg: 'Bank deleted!'
    });
}

module.exports = { getBanks, createBanks, updateBanks, deleteBanks, getOne }