const pool = require('../db/config')

const getComplexs = async (req, res) => {
    try {
        let complexList = await pool.query(`SELECT * FROM complexs;`);
        res.status(200).json(complexList.rows);
    } catch (err) {
        console.log(err);
    }
}

const getOne = async (req, res) => {
    const { id } = req.params;
    let foundedComplex = await pool.query(`SELECT * FROM complexs WHERE id = $1`, [id]);
    if (foundedComplex.rowCount === 0) return res.status(404).json({ msg: 'Banks not found!' });
    res.status(200).json(foundedComplex.rows);
}


const apiComplexs = async (req, res) => {
    const { id } = req.params;
    let foundedComplex = await pool.query(`SELECT h.id , h.home_num FROM complexs cx
    JOIN homes h ON cx.id = h.complex_id WHERE cx.id = $1`, [id]);
    if (foundedComplex.rows == [] || foundedComplex.rows.length === 0) return res.status(404).json({ msg: 'Complex not found!' });
    res.status(200).json(foundedComplex.rows);
}


const createComplexs = async (req, res) => {
    const { complex_title, complex_adres, company_id } = req.body

    let complexList = await pool.query
        (`SELECT * FROM complexs WHERE complex_title = $1`, [complex_title])
    if (complexList.rowCount >= 1) return res.status(400).send(JSON.stringify({
        msg: "Bunday kompaniya bor!!"
    }))

    let complexCreate = await pool.query(`
    INSERT INTO complexs(complex_title, complex_adres, company_id)VALUES ($1, $2, $3);`,
        [complex_title, complex_adres, company_id]);

    res.status(201).json({
        msg: 'Created!'
    })
}


const updateComplexs = async (req, res) => {
    const { id } = req.params;
    let { complex_title, complex_adres, company_id } = req.body
    let foundedComplex = await pool.query(` SELECT * FROM complexs WHERE id = $1`, [id]);
    if (foundedComplex.rowCount === 0) return res.status(404).json({ msg: 'Complex not found!' });
    let {
        complex_title: title,
        complex_adres: adres,
        company_id: c_id
    } = foundedComplex.rows[0];

    complex_title = complex_title ? complex_title : title;
    complex_adres = complex_adres ? complex_adres : adres;
    company_id = company_id ? company_id : c_id;
    let updatedComplex = await pool.query(` 
        UPDATE complexs SET 
        complex_title=$1
        complex_adres=$2
        company_id = $3
        WHERE id = $4;
    `, [complex_title, complex_adres, company_id, id]);

    res.status(200).json({
        msg: 'Complex Updated!'
    });
}

const deleteComplexs = async (req, res) => {
    const { id } = req.params;
    let deleteHome = await pool.query(`DELETE FROM homes WHERE complex_id = $1 AND EXISTS (SELECT 1 FROM complexs WHERE id = $1)
    `, [id])
    let foundedEmail = await pool.query(` 
     DELETE FROM complexs WHERE id = $1`, [id]);
    if (foundedEmail.rowCount === 0) return res.status(404).json({ msg: 'Complexs not found!' });
    res.status(200).json({
        msg: 'Complex deleted!'
    });
}

module.exports = { getComplexs, createComplexs, updateComplexs, deleteComplexs, apiComplexs, getOne }