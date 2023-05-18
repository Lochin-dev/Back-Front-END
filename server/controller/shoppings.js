const pool = require('../db/config')

const shopping = async (req, res) => {
    const { id } = req.params;

    try {
        let shopping = await pool.query(`SELECT (SELECT home_price*0.17 FROM homes WHERE id IN (SELECT h.id FROM years y JOIN homes h ON y.home_id = h.id 
            WHERE y.id = $1)) AS bosh_tolov, (SELECT home_price - (SELECT home_price*0.17 AS bosh_tolov FROM homes WHERE id IN (SELECT h.id FROM years y JOIN homes h ON y.home_id = h.id 
            WHERE y.id = $1))
             FROM homes WHERE id IN (SELECT h.id FROM years y JOIN homes h ON y.home_id = h.id 
            WHERE y.id = $1)) AS qolgani, ( SELECT trunc((SELECT (SELECT home_price - (SELECT home_price*0.17 AS bosh_tolov FROM homes WHERE id IN (SELECT h.id FROM 
            years y JOIN homes h ON y.home_id = h.id WHERE y.id = $1)) FROM homes 
            WHERE id IN (SELECT h.id FROM years y JOIN homes h ON y.home_id = h.id WHERE y.id = $1))
             / (SELECT year_num * 12  FROM years WHERE id = $1))::numeric, 2)) AS oylik_tolov, 
             ( SELECT h.home_price*0.02  FROM years y JOIN homes h ON y.home_id = h.id WHERE y.id=$1) AS bank_haqi;`, [id]);
        res.status(200).json(shopping.rows);
    } catch (error) {
        console.log(error);
    }

}

module.exports = { shopping }