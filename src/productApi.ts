import {pool} from "../db/dbSetup";

const createProduct = (req, res) => {
    const {name, price} = req.body;
    pool.query('INSERT INTO products (name, price ) VALUES ($1, $2) RETURNING *',
        [name, price], (error, results) => {
            if (error) {
                throw error
            }
            res.status(201).send(`Product added with ID: ${results.rows[0].id}`)
        })
}

const deleteProduct = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM products WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).send(`Product deleted with ID: ${id}`)
    })
}

const getProducts = (req, res) => {
    pool.query('SELECT * FROM products ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const getProductById = (req, res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * FROM products WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

const updateProduct = (req, res) => {
    const id = parseInt(req.params.id)
    const {name, price} = req.body

    pool.query(
        'UPDATE products SET name = $1, price = $2, WHERE id = $3',
        [name, price,  id],
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).send(`Product modified with ID: ${id}`)
        }
    )
}

const searchProduct = (req, res) => {
    const key = req.params.key;
    const value = req.params.value;

    pool.query(
        'Select * from products where $1 like $2%', [key, value],
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