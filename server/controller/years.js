const pool = require('../db/config')

const getYears = async (req, res) => {
    try {
        let yearList = await pool.query(`SELECT * FROM years;`);
        res.status(200).json(yearList.rows);
    } catch (err) {
        console.log(err);
    }
}

const getOne = async (req, res) => {
    const { id } = req.params;
    let foundedYear = await pool.query(`SELECT * FROM years WHERE id = $1`, [id]);
    if (foundedYear.rowCount === 0) return res.status(404).json({ msg: 'Years not found!' });
    res.status(200).json(foundedYear.rows);
}


const createYears = async (req, res) => {
    const { year_num, home_id } = req.body
    let yearCreate = await pool.query(`
    INSERT INTO years( year_num, home_id)VALUES ($1, $2)`,
        [year_num, home_id]);
    res.status(201).json({
        msg: 'Created!'
    })
}

const updateYears = async (req, res) => {
    const { id } = req.params;
    let { year_num, home_id } = req.body
    let foundedYear = await pool.query(` SELECT * FROM years WHERE id = $1`, [id]);
    if (foundedYear.rowCount === 0) return res.status(404).json({ msg: 'Year not found!' });
    let {
        year_num: num,
        home_id: h_id,
    } = foundedYear.rows[0];

    year_num = year_num ? year_num : num;
    home_id = home_id ? home_id : h_id;

    let updatedYear = await pool.query(` 
        UPDATE years SET 
        year_num=$1
        WHERE id = $2;
    `, [year_num, id]);

    res.status(200).json({
        msg: 'Year Updated!'
    });
}

const deleteYears = async (req, res) => {
    const { id } = req.params;
    let foundedEmail = await pool.query(` DELETE FROM years WHERE id = $1`, [id]);
    if (foundedEmail.rowCount === 0) return res.status(404).json({ msg: 'Years not found!' });
    res.status(200).json({
        msg: 'Year deleted!'
    });
}

module.exports = { getYears, createYears, updateYears, deleteYears, getOne }