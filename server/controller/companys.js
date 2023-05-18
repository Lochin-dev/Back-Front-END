const pool = require('../db/config')

const getCompanys = async (req, res) => {
    try {
        let companyList = await pool.query(`SELECT * FROM companys;`);
        res.status(200).json(companyList.rows);
    } catch (err) {
        console.log(err);
    }
}

const getCompanysOne = async (req, res) => {
    try {
        let { company_title } = req.body
        let companyList = await pool.query(`SELECT id FROM companys WHERE company_title = $1`, [company_title]);
        if (companyList.rows == [] || companyList.rows.length === 0) return res.status(404).json({ msg: 'Companiya tanlang!' });
        res.status(200).json(companyList.rows);
    } catch (err) {
        console.log(err);
    }
}


const apiCompanys = async (req, res) => {
    const { id } = req.params;
    let foundedCompany = await pool.query(` SELECT cx.complex_adres, cx.id,  cx.complex_title FROM complexs cx 
    JOIN companys c ON c.id = cx.company_id WHERE c.id = $1`, [id]);
    if (foundedCompany.rows == [] || foundedCompany.rows.length === 0) return res.status(404).json({ msg: 'Complex not found!' });
    res.status(200).json(foundedCompany.rows);
}

const getOne = async (req, res) => {
    const { id } = req.params;
    let foundedCompany = await pool.query(`SELECT * FROM companys WHERE id = $1`, [id]);
    if (foundedCompany.rowCount === 0) return res.status(404).json({ msg: 'Banks not found!' });
    res.status(200).json(foundedCompany.rows);
}

const apiBank = async (req, res) => {
    const { id } = req.params;
    let foundedCompany = await pool.query(` SELECT b.id, b.bank_title FROM banks b JOIN companys c ON c.id = b.company_id WHERE 
    c.id = $1`, [id]);
    if (foundedCompany.rows == [] || foundedCompany.rows.length === 0) return res.status(404).json({ msg: 'Complex not found!' });
    res.status(200).json(foundedCompany.rows);
}

const createCompanys = async (req, res) => {
    const { company_title, company_img } = req.body
    let companyList = await pool.query
        (`SELECT * FROM companys WHERE company_title = $1`, [company_title])
    if (companyList.rowCount >= 1) return res.status(400).send(JSON.stringify({
        msg: "Bunday kompaniya bor!!"
    }))

    let companyCreate = await pool.query(`
    INSERT INTO companys( company_title, company_img )VALUES ($1, $2);`,
        [company_title, company_img]);

    res.status(201).json({
        msg: 'Created!'
    })
}


const updateCompanys = async (req, res) => {
    const { id } = req.params;
    let { company_title } = req.body
    let foundedCompany = await pool.query(` SELECT * FROM companys WHERE id = $1`, [id]);
    if (foundedCompany.rowCount === 0) return res.status(404).json({ msg: 'Company not found!' });
    let {
        company_title: title,
    } = foundedCompany.rows[0];

    company_title = company_title ? company_title : title;

    let updatedCompany = await pool.query(` 
        UPDATE companys SET 
        company_title=$1
        WHERE id = $2;
    `, [company_title, id]);

    res.status(200).json({
        msg: 'Company Updated!'
    });
}

const deleteCompanys = async (req, res) => {
    const { id } = req.params;
    let deleteHome = await pool.query(`DELETE FROM homes WHERE complex_id IN (SELECT id FROM complexs WHERE company_id = $1) 
    AND complex_id IS NOT NULL`, [id]);
    let deleteComplex = await pool.query(`DELETE FROM complexs WHERE company_id = $1 
    AND EXISTS (SELECT 1 FROM companys WHERE id = $1)`, [id]);
    let deleteCompany = await pool.query(` DELETE FROM companys WHERE id = $1`, [id]);
    if (deleteCompany.rowCount === 0) return res.status(404).json({ msg: 'Companys not found!' });
    res.status(200).json({
        msg: 'Company deleted!'
    });
}

module.exports = { getCompanys, createCompanys, updateCompanys, deleteCompanys, apiCompanys, getCompanysOne, apiBank, getOne }