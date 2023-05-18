const pool = require('../db/config')

const getHomes = async (req, res) => {
    try {
        let homeList = await pool.query(`SELECT * FROM homes;`);
        res.status(200).json(homeList.rows);
    } catch (err) {
        console.log(err);
    }
}

const getOne = async (req, res) => {
    const { id } = req.params;
    let foundedHome = await pool.query(`SELECT * FROM homes WHERE id = $1`, [id]);
    if (foundedHome.rowCount === 0) return res.status(404).json({ msg: 'Home not found!' });
    res.status(200).json(foundedHome.rows);
}

const apiHomes = async (req, res) => {
    const { id } = req.params;
    let foundedHome = await pool.query(`SELECT y.id, y.year_num FROM homes h JOIN years y ON h.id = y.home_id WHERE 
    h.id = $1`, [id]);
    if (foundedHome.rows == [] || foundedHome.rows.length === 0) return res.status(404).json({ msg: 'Complex not found!' });
    res.status(200).json(foundedHome.rows);
}

const createHomes = async (req, res) => {
    const { home_num, home_price, home_kv, complex_id } = req.body
    console.log(home_num);
    let homeCreate = await pool.query(`
    INSERT INTO homes( home_num, home_price, home_kv, complex_id)VALUES ($1, $2, $3, $4)`,
        [home_num, home_price, home_kv, complex_id]);

    res.status(201).json({
        msg: 'Created!'
    })
}

const updateHomes = async (req, res) => {
    const { id } = req.params;
    let { home_num, home_price, home_kv, complex_id } = req.body
    let foundedHome = await pool.query(` SELECT * FROM homes WHERE id = $1`, [id]);
    if (foundedHome.rowCount === 0) return res.status(404).json({ msg: 'Home not found!' });
    let {
        home_num: num,
        home_price: price,
        home_kv: kv,
        complex_id: c_id,
    } = foundedHome.rows[0];

    home_num = home_num ? home_num : num;
    home_price = home_price ? home_price : price;
    home_kv = home_kv ? home_kv : kv;
    complex_id = complex_id ? complex_id : c_id;

    let updatedHome = await pool.query(` 
        UPDATE homes SET 
        home_num=$1,
        home_price=$2,
        home_kv=$3
        WHERE id = $4;
    `, [home_num, home_price, home_kv, id]);

    res.status(200).json({
        msg: 'Home Updated!'
    });
}

const deleteHomes = async (req, res) => {
    const { id } = req.params;
    let foundedEmail = await pool.query(` DELETE FROM homes WHERE id = $1`, [id]);
    if (foundedEmail.rowCount === 0) return res.status(404).json({ msg: 'Homes not found!' });
    res.status(200).json({
        msg: 'Home deleted!'
    });
}

module.exports = { getHomes, createHomes, updateHomes, deleteHomes, apiHomes, getOne }