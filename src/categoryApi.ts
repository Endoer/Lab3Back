import {pool} from "../db/dbSetup";
const getCategories = (req, res) => {
    pool.query('SELECT * FROM Category ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

module.exports={
    getCategories: getCategories,
}