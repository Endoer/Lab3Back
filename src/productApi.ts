import {pool} from "../db/dbSetup";

const createProduct = (req, res) => {
    const {name, price, categoryId} = req.body;
    pool.query('INSERT INTO Product (name, price, category) VALUES ($1, $2, $3) RETURNING *',
        [name, price, categoryId], (error, results) => {
            if (error) {
                throw error
            }
            res.status(201).send(`User added with ID: ${results.rows[0].id}`)
        })
}

const deleteProduct = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM Product WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`User deleted with ID: ${id}`)
    })
}

const getProducts = (req, res) => {
    pool.query('SELECT * FROM Product ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getProductById = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM Product WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const updateProduct = (req, res) => {
    const id = parseInt(req.params.id)
    const {name, price, categoryId} = req.body

    pool.query(
        'UPDATE product SET name = $1, price = $2, category = $3  WHERE id = $4',
        [name, price, categoryId, id],
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

const searchProduct = (req, res) => {
    const key = req.params.key;
    const value = req.params.value;

    pool.query(
        'Select * from product where $1 like $2%', [key, value],
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).json(results.rows)
        }
    )
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProduct,
}